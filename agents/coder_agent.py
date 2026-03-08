# agents/coder_agent.py

import os
import re
import json
import datetime
from dotenv import load_dotenv
from anthropic import Anthropic
from github import Github
from git import Repo

# ===============================
# 1️⃣ Load environment variables
# ===============================
load_dotenv()

# Claude API
API_KEY = os.getenv("ANTHROPIC_API_KEY")
client = Anthropic(api_key=API_KEY)

# GitHub API
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = "pouyali/ai-dev-team"
gh = Github(GITHUB_TOKEN)
repo_gh = gh.get_repo(GITHUB_REPO)

# Local git repo
local_repo_path = os.path.dirname(os.path.abspath(__file__)) + "/.."
repo = Repo(local_repo_path)

# ===============================
# 2️⃣ Prompt for task
# ===============================
task_description = input("Enter your task: ").strip()
if not task_description:
    print("No task provided. Exiting.")
    exit()

# ===============================
# 3️⃣ Clean Markdown/extra text
# ===============================
def clean_code(raw_code: str) -> str:
    code = raw_code.strip()
    code = re.sub(r'^```[\w-]*\s*', '', code, flags=re.MULTILINE)
    code = re.sub(r'\s*```$', '', code, flags=re.MULTILINE)
    lines = code.split("\n")
    while lines and lines[0].lower().startswith(("here's", "here is", "the content")):
        lines.pop(0)
    return "\n".join(lines).strip()

# ===============================
# 4️⃣ Generate code from Claude
# ===============================
def generate_code(task: str) -> str:
    prompt = f"""
You are a professional software engineer. 
Create code for this task: {task}
Return the code/files in JSON format: 
{{"path": "<relative_path>", "content": "<file_content>"}}[]
Do not include explanations or extra text.
"""
    response = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        system="You are an expert full stack Next.js and React coder.",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=4000
    )
    return response.content[0].text.strip()

# ===============================
# 5️⃣ Create / reuse branch
# ===============================
branch_name_safe = re.sub(r'[^a-z0-9]+', '-', task_description.lower()).strip('-')
existing_branches = [b.name for b in repo.branches]
if branch_name_safe in existing_branches:
    branch_name = branch_name_safe
    repo.git.checkout(branch_name)
    print(f"Reusing existing branch: {branch_name}")
else:
    branch_name = f"{branch_name_safe}-{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}"
    repo.git.checkout('main')
    repo.git.pull()
    repo.git.checkout('-b', branch_name)
    print(f"Created and switched to new branch: {branch_name}")

# ===============================
# 6️⃣ Run task
# ===============================
def run_task(task):
    raw_code = generate_code(task)
    cleaned_code = clean_code(raw_code)

    try:
        project_files = json.loads(cleaned_code)
    except json.JSONDecodeError as e:
        print("JSON parse error:", e)
        print("Raw code:", raw_code)
        exit()

    for file_obj in project_files:
        path = os.path.join(local_repo_path, file_obj["path"])
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(file_obj["content"])
        print(f"Written file: {file_obj['path']}")

    repo.git.add(all=True)
    commit_msg = f"feat: {task_description}"
    repo.index.commit(commit_msg)
    origin = repo.remote(name='origin')
    origin.push(branch_name)
    print(f"Pushed branch {branch_name}")

    # Create PR if it doesn't exist
    open_prs = repo_gh.get_pulls(state="open", head=f"pouyali:{branch_name}")
    if open_prs.totalCount == 0:
        pr = repo_gh.create_pull(
            title=commit_msg,
            body=f"Auto-generated PR for task: {task_description}",
            head=branch_name,
            base="main"
        )
        print(f"Pull request created: {pr.html_url}")
    else:
        pr = open_prs[0]
        print(f"PR already exists: {pr.html_url}")

run_task(task_description)