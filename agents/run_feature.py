import os
import time
from subprocess import run
from dotenv import load_dotenv
from github import Github

# ===============================
# 1️⃣ Get TASK_PROMPT interactively
# ===============================
TASK_PROMPT = input("💬 Enter your task prompt: ").strip()
if not TASK_PROMPT:
    print("❌ Task prompt cannot be empty.")
    exit(1)

print(f"🚀 Starting task: {TASK_PROMPT}")

MAX_REVIEWS = 2
REVIEW_SLEEP = 5  # seconds between coder -> reviewer loops

# ===============================
# 2️⃣ Set environment variables for coder agent
# ===============================
os.environ["TASK_PROMPT"] = TASK_PROMPT
# REVIEWER_COMMENTS will be set during review loops if present

# ===============================
# 3️⃣ Run coder agent first
# ===============================
print("📝 Running coder agent...")
run(["python", "agents/coder_agent.py"], check=True)

# ===============================
# 4️⃣ Review loop
# ===============================
review_count = 0
load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = "pouyali/ai-dev-team"
gh = Github(GITHUB_TOKEN)
repo = gh.get_repo(GITHUB_REPO)

while review_count < MAX_REVIEWS:
    review_count += 1
    print(f"\n🔍 Review iteration {review_count}...")
    run(["python", "agents/reviewer_agent.py"], check=True)

    # Fetch reviewer comments
    open_prs = repo.get_pulls(state="open", sort="created", direction="desc")
    if not open_prs.totalCount:
        print("No open PRs found, exiting review loop.")
        break

    pr = open_prs[0]
    comments = pr.get_issue_comments()
    reviewer_feedback = "\n".join([c.body for c in comments]).strip()

    if not reviewer_feedback:
        print("✅ No reviewer comments, PR approved.")
        break

    print("💡 Reviewer feedback found, passing back to coder...")
    os.environ["REVIEWER_COMMENTS"] = reviewer_feedback
    # Do not create a new branch, coder agent will detect REVIEWER_COMMENTS
    run(["python", "agents/coder_agent.py"], check=True)

    time.sleep(REVIEW_SLEEP)

# ===============================
# 5️⃣ Auto-approve after MAX_REVIEWS
# ===============================
if review_count >= MAX_REVIEWS:
    pr_author = pr.user.login
    current_user = gh.get_user().login

    if pr_author == current_user:
        print(f"⚠️ Cannot approve PR #{pr.number} because the author is the same as the authenticated user. Skipping approval.")
    else:
        print(f"⚡ Max review iterations reached ({MAX_REVIEWS}). Approving PR automatically.")
        pr.create_review(event="APPROVE", body="Auto-approved after 2 review iterations.")
        print(f"✅ PR #{pr.number} approved: {pr.html_url}")

print("\n🎉 Task completed!")