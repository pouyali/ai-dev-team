import subprocess
import time
import re
from datetime import datetime
from github import Github
from dotenv import load_dotenv
import os

load_dotenv()

# ===============================
# GitHub setup
# ===============================
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = "pouyali/ai-dev-team"
gh = Github(GITHUB_TOKEN)
repo_gh = gh.get_repo(GITHUB_REPO)

# ===============================
# Helper functions
# ===============================

def create_branch_name(prompt: str) -> str:
    """Generate a safe branch name from the prompt."""
    name = prompt.lower()
    name = re.sub(r'[^a-z0-9]+', '-', name)
    name = name.strip('-')
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    return f"feature/{name}-{timestamp}"

def run_coder(task_prompt, reviewer_comments=""):
    """Run coder agent with a task prompt and optional reviewer feedback."""
    env = os.environ.copy()
    env["REVIEWER_COMMENTS"] = reviewer_comments
    print(f"\n➡ Running coder agent with task: {task_prompt}\n")
    subprocess.run(["python", "agents/coder_agent.py", task_prompt], check=True, env=env)

def run_reviewer():
    """Run reviewer agent."""
    print("\n➡ Running reviewer agent...\n")
    subprocess.run(["python", "agents/reviewer_agent.py"], check=True)

def get_latest_pr():
    """Return the most recent open PR."""
    open_prs = repo_gh.get_pulls(state="open", sort="created", direction="desc")
    if open_prs.totalCount == 0:
        return None
    return open_prs[0]

def get_reviewer_comments(pr):
    """Return all comments from reviewer agent."""
    comments = pr.get_issue_comments()
    all_comments = [c.body for c in comments]
    return "\n".join(all_comments)

def pr_approved(pr):
    """Consider PR approved if no comments contain 'changes requested'."""
    comments_text = get_reviewer_comments(pr).lower()
    return "changes requested" not in comments_text

# ===============================
# Main workflow
# ===============================

def main():
    task_prompt = input("Enter feature/task prompt for coder agent:\n> ")
    branch_name = create_branch_name(task_prompt)
    os.environ["BRANCH_NAME"] = branch_name
    print(f"Branch to be created: {branch_name}")

    # Step 1: Run coder agent to create branch & push initial feature code
    run_coder(task_prompt)

    # Step 2: Detect PR
    time.sleep(5)  # wait for PR creation
    pr = get_latest_pr()
    if not pr:
        print("No PR found after running coder agent. Exiting.")
        return
    print(f"Monitoring PR #{pr.number}: {pr.title}")

    # Step 3: Loop: reviewer → coder fixes → repeat until approved
    iteration = 1
    while True:
        print(f"\n=== Iteration {iteration} ===")
        run_reviewer()
        time.sleep(5)  # let GitHub register comments

        # Refresh PR object to get latest comments
        pr = repo_gh.get_pull(pr.number)
        if pr_approved(pr):
            print(f"\n✅ PR #{pr.number} approved! Workflow complete.\n")
            break
        else:
            comments = get_reviewer_comments(pr)
            print(f"\n📝 Reviewer requested changes:\n{comments}\n")
            print("Coder agent will fix the issues now...")
            run_coder(task_prompt, reviewer_comments=comments)
            iteration += 1

    print(f"Workflow finished. PR #{pr.number} is ready to merge!")

if __name__ == "__main__":
    main()