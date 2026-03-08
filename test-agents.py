from agents.coder_agent import generate_code
from agents.reviewer_agent import review_code

task = "Add a dark/light mode toggle in a Next.js project"
code = generate_code(task)
feedback = review_code(code)

print("Generated code:\n", code)
print("\nReviewer feedback:\n", feedback)