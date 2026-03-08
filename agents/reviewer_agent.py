import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

API_KEY = os.getenv("ANTHROPIC_API_KEY")
client = Anthropic(api_key=API_KEY)

def review_code(code_snippet: str) -> str:
    """
    Sends the generated code to Claude for review and suggestions.
    """
    response = client.messages.create(
        model="claude-sonnet-4-5-20250929",  # Use your working model
        system="You are an expert software developer reviewing code. "
               "Check for correctness, best practices, and any bugs.",
        max_tokens=1000,
        messages=[
            {"role": "user", "content": f"Review the following code and suggest improvements:\n\n{code_snippet}"}
        ]
    )
    return response.content[0].text


if __name__ == "__main__":
    # Example: we’ll get code from the coder agent first
    example_code = """
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
"""
    feedback = review_code(example_code)
    print("Reviewer feedback:\n")
    print(feedback)