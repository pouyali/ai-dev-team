# agents/reviewer_agent.py

import os
from dotenv import load_dotenv
from anthropic import Anthropic
from github import Github

# ===============================
# 1️⃣ Load environment variables
# ===============================
load_dotenv()

# Claude API client
API_KEY = os.getenv("ANTHROPIC_API_KEY")
client = Anthropic(api_key=API_KEY)

# GitHub API client
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = "pouyali/ai-dev-team"  # replace if needed
gh = Github(GITHUB_TOKEN)
repo_gh = gh.get_repo(GITHUB_REPO)

# ===============================
# 2️⃣ Fetch latest open PR
# ===============================
open_prs = repo_gh.get_pulls(state="open", sort="created", direction="desc")
if open_prs.totalCount == 0:
    print("No open PRs found.")
    exit()

pr = open_prs[0]  # most recent PR
print(f"Reviewing PR #{pr.number}: {pr.title}")

# ===============================
# 3️⃣ Fetch changed files in PR
# ===============================
pr_files = pr.get_files()
files_to_review = {}

for file in pr_files:
    # Fetch content of the file in the PR branch
    blob = repo_gh.get_contents(file.filename, ref=pr.head.ref)
    files_to_review[file.filename] = blob.decoded_content.decode("utf-8")

print(f"Found {len(files_to_review)} files to review")

# ===============================
# 4️⃣ Function to ask Claude to review a file
# ===============================
def review_file(file_path, code):
    prompt = f"""
You are a code reviewer. Review this {file_path} file.
- Check for errors, missing features, or anything unusual.
- Give feedback in concise bullet points, actionable for the developer.
- Do not rewrite the code, only comment on issues or improvements.

Code:
{code}
"""
    response = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        system="You are an expert software engineer and code reviewer.",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )

    return response.content[0].text.strip()

# ===============================
# 5️⃣ Post feedback to GitHub PR
# ===============================
for file_path, code in files_to_review.items():
    feedback = review_file(file_path, code)
    pr.create_issue_comment(f"**Review for `{file_path}`**:\n{feedback}")
    print(f"Posted review for {file_path}")

print("Reviewer agent finished all reviews.")