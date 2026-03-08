import subprocess
import time
from github import Github
from dotenv import load_dotenv
import os

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = "pouyali/ai-dev-team"
gh = Github(GITHUB_TOKEN)
repo_gh = gh.get_repo(GITHUB_REPO)

def run_coder(task_prompt):
    """Run the coder agent with a specific task prompt."""
    print(f"Running coder agent with task: {task_prompt}")
    subprocess.run(["python", "agents/coder_agent.py", task_prompt], check=True)

def run_reviewer():
    """Run the reviewer agent."""
    print("Running reviewer agent...")
    subprocess.run(["python", "agents/reviewer_agent.py"], check=True)

def pr_approved(pr_number):
    """Check if PR has no 'CHANGES_REQUESTED' reviews."""
    pr = repo_gh.get_pull(pr_number)
    for review in pr.get_reviews():
        if review.state == "CHANGES_REQUESTED":
            return False
    return True

def main():
    task_prompt = input("Enter feature/task prompt for coder agent:\n> ")

    # 1️⃣ Run coder agent with prompt
    run_coder(task_prompt)

    # 2️⃣ Detect the PR created by coder agent
    time.sleep(5)  # small delay to allow PR creation
    open_prs = repo_gh.get_pulls(state="open", sort="created", direction="desc")
    if open_prs.totalCount == 0:
        print("No PR created by coder agent. Exiting.")
        return
    pr = open_prs[0]
    print(f"Monitoring PR #{pr.number}: {pr.title}")

    # 3️⃣ Loop review → fix until PR approved
    while True:
        run_reviewer()
        time.sleep(10)  # allow GitHub to update PR
        if pr_approved(pr.number):
            print("PR approved! Workflow complete.")
            break
        else:
            print("Changes requested, running coder agent to fix...")
            run_coder(task_prompt)
            time.sleep(5)

if __name__ == "__main__":
    main()