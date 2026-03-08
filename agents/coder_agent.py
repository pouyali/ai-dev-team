# agents/coder_agent.py

import os
import json
import datetime
from dotenv import load_dotenv
from anthropic import Anthropic
from git import Repo
from github import Github, GithubException

# ===============================
# 1️⃣ Load environment variables
# ===============================
load_dotenv()

# Claude API client
API_KEY = os.getenv("ANTHROPIC_API_KEY")
client = Anthropic(api_key=API_KEY)

# GitHub API client
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = "pouyali/ai-dev-team"
gh = Github(GITHUB_TOKEN)
repo_gh = gh.get_repo(GITHUB_REPO)

# Local repo
PROJECT_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
repo_local = Repo(PROJECT_PATH)

# ===============================
# 2️⃣ Branch handling
# ===============================
def create_feature_branch(task_name: str) -> str:
    sanitized_task = task_name.lower().replace(" ", "-").replace("/", "-")
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    branch_name = f"feature/{sanitized_task}-{timestamp}"
    repo_local.git.checkout("HEAD", b=branch_name)
    print(f"Created and switched to branch: {branch_name}")
    return branch_name

# ===============================
# 3️⃣ Generate single file via Claude
# ===============================
def generate_file(file_path: str, task_description: str) -> str:
    """
    Generate a single file using Claude. Returns the file content as string.
    """
    prompt = f"""
Generate **only the content** for the file "{file_path}" for this task:
"{task_description}".

- Return raw code only, no Markdown or explanations.
- Escape newlines and quotes properly so it's valid JSON if needed.
- The content should be ready to write to disk.
"""
    response = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        system="You are an expert Next.js full-stack developer.",
        max_tokens=2000,
        messages=[{"role": "user", "content": prompt}]
    )

    code = response.content[0].text.strip()
    print(f"Generated code for {file_path} (length {len(code)})")
    return code

# ===============================
# 4️⃣ Apply code to disk
# ===============================
def apply_code(file_path: str, code: str):
    full_path = os.path.join(PROJECT_PATH, file_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w") as f:
        f.write(code)
    print(f"Code written to {full_path}")

# ===============================
# 5️⃣ Commit & push
# ===============================
def commit_and_push(branch_name: str, commit_message: str):
    repo_local.git.add(A=True)
    repo_local.index.commit(commit_message)
    origin = repo_local.remote(name="origin")
    origin.push(branch_name)
    print(f"Branch '{branch_name}' committed and pushed to GitHub")

# ===============================
# 6️⃣ Create PR
# ===============================
def create_pull_request(branch_name: str, title: str, body: str = ""):
    try:
        pr = repo_gh.create_pull(
            title=title,
            body=body,
            head=branch_name,
            base="main"
        )
        print(f"Pull request created: {pr.html_url}")
        return pr
    except GithubException as e:
        print("Failed to create PR:", e)
        return None

# ===============================
# 7️⃣ Full workflow
# ===============================
def run_task(task_description: str, commit_message: str):
    # 1️⃣ Create branch
    branch_name = create_feature_branch(task_description)

    # 2️⃣ List of files to generate
    files_to_generate = [
        "app/layout.tsx",
        "app/providers/theme-provider.tsx",
        "app/globals.css",
        "app/page.tsx",
        "app/components/theme-toggle.tsx",
        "tailwind.config.ts",
        "postcss.config.js",
        "next.config.js",
    ]

    # 3️⃣ Generate and write each file
    for file_path in files_to_generate:
        code = generate_file(file_path, task_description)
        apply_code(file_path, code)

    # 4️⃣ Commit & push
    commit_and_push(branch_name, commit_message)

    # 5️⃣ Create PR
    create_pull_request(branch_name, title=commit_message, body=f"AI-generated code for: {task_description}")

# ===============================
# 8️⃣ Run example
# ===============================
if __name__ == "__main__":
    task = "Create a new Next.js project with Tailwind and dark/light mode toggle"
    commit_msg = f"AI: {task}"
    run_task(task, commit_msg)