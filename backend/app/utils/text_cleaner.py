import re

def clean_resume_text(text):

    # Normalize Windows line endings
    text = text.replace("\r", "")

    # Replace tabs with spaces
    text = text.replace("\t", " ")

    # Remove extra spaces but preserve newlines
    text = re.sub(r"[ ]{2,}", " ", text)

    # Remove excessive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()