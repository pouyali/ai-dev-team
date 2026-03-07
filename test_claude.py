import os
from dotenv import load_dotenv
from anthropic import Anthropic

# Load .env variables
load_dotenv()

api_key = os.getenv("ANTHROPIC_API_KEY")

client = Anthropic(api_key=api_key)

response = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=100,
    messages=[
        {"role": "user", "content": "Say hello in one short sentence"}
    ]
)

print(response.content[0].text)