import os
from dotenv import load_dotenv
from anthropic import Anthropic
from github import Github

# Load .env
load_dotenv()

# Test Claude API key
API_KEY = os.getenv("ANTHROPIC_API_KEY")
client = Anthropic(api_key=API_KEY)
print("Claude API key loaded:", bool(API_KEY))

# Test GitHub token
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = "pouyali/ai-dev-team"  # your repo
gh = Github(GITHUB_TOKEN)
repo_gh = gh.get_repo(GITHUB_REPO)
print("GitHub repo loaded:", repo_gh.full_name)