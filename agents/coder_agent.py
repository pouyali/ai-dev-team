import os
import sys
import json
import subprocess
import re
from datetime import datetime
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
GITHUB_REPO = "pouyali/ai-dev-team"  # replace if needed
gh = Github(GITHUB_TOKEN)
repo_gh = gh.get_repo(GITHUB_REPO)

# Local repo
local_repo_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
repo = Repo(local_repo_path)

# ===============================
# 2️⃣ Utilities
# ===============================
def create_branch_name(prompt: str) -> str:
    """Generate a descriptive branch name from prompt"""
    name = prompt.lower()
    name = re.sub(r'[^a-z0-9]+', '-', name)
    name = name.strip('-')
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    return f"feature/{name}-{timestamp}"

def run_git_command(cmd: list):
    subprocess.run(cmd, cwd=local_repo_path, check=True)

# ===============================
# 3️⃣ Determine task
# ===============================
task_prompt = os.environ.get("TASK_PROMPT") or (sys.argv[1] if len(sys.argv) > 1 else "")
reviewer_comments = os.environ.get("REVIEWER_COMMENTS", "")

branch_name = create_branch_name(task_prompt)

print(f"➡ Task: {task_prompt}")
print(f"➡ Branch: {branch_name}")

# ===============================
# 4️⃣ Create new branch
# ===============================
repo.git.checkout("main")
repo.git.pull()
repo.git.checkout("-b", branch_name)
print(f"Created and switched to branch {branch_name}")

# ===============================
# 5️⃣ Ask Claude to generate/update code
# ===============================
def generate_code(prompt, reviewer_feedback=""):
    """Ask Claude to create/update code for this task"""
    system_msg = (
        "You are an expert software engineer and code generator. "
        "Only generate minimal files necessary. "
        "Do not touch unrelated files. "
        "If reviewer comments exist, incorporate them into your changes."
    )

    user_msg = f"""
Task: {prompt}
Reviewer Feedback: {reviewer_feedback}
Instructions:
- If this is a new project, generate all files needed for a Next.js + Tailwind + dark/light mode app.
- If this is a small feature/update, only update relevant files.
- Return a JSON object with file paths as keys and file contents as values, no markdown or ``` code blocks.
"""

    response = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        system=system_msg,
        messages=[{"role": "user", "content": user_msg}],
        max_tokens=4000
    )

    # Clean and parse JSON
    content = response.content[0].text.strip()
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        # fallback: try removing ``` if present
        content_clean = re.sub(r"```[a-z]*\n?|```", "", content)
        return json.loads(content_clean)

# ===============================
# 6️⃣ Generate/update project files
# ===============================
project_files = generate_code(task_prompt, reviewer_comments)

for path, code in project_files.items():
    full_path = os.path.join(local_repo_path, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"✅ Updated: {path}")

# ===============================
# 7️⃣ Commit & push
# ===============================
commit_message = f"{task_prompt}"
repo.git.add(all=True)
repo.index.commit(commit_message)
repo.git.push("--set-upstream", "origin", branch_name)
print(f"🚀 Branch pushed: {branch_name}")

# ===============================
# 8️⃣ Create PR
# ===============================
open_prs = repo_gh.get_pulls(state="open")
existing_pr = None
for pr in open_prs:
    if pr.head.ref == branch_name:
        existing_pr = pr
        break

if existing_pr:
    print(f"PR already exists: {existing_pr.html_url}")
else:
    pr = repo_gh.create_pull(
        title=task_prompt,
        body=f"Automated PR for task: {task_prompt}",
        head=branch_name,
        base="main"
    )
    print(f"PR created: {pr.html_url}")