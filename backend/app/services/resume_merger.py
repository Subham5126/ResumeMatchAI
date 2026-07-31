def to_list(value):
    """
    Converts any value into a list.
    """

    if value is None:
        return []

    if isinstance(value, list):
        return value

    return [value]


def merge_resume_data(regex_data, ai_data):
    """
    Smart merge of Regex + AI Resume Parser.
    AI parser overrides structured fields while merging list fields safely.
    """

    merged = regex_data.copy()

    # AI should completely replace these
    structured_fields = [
        "education",
        "experience",
        "projects",
        "certifications"
    ]

    # These should be merged
    merge_lists = [
        "skills",
        "github"
    ]

    for key, value in ai_data.items():

        # Skip empty AI values
        if value in [None, "", [], {}]:
            continue

        # -------------------------
        # AI replaces structured data
        # -------------------------
        if key in structured_fields:
            merged[key] = value
            continue

        # -------------------------
        # Merge list fields safely
        # -------------------------
        if key in merge_lists:

            regex_list = to_list(merged.get(key))
            ai_list = to_list(value)

            merged[key] = sorted(
                list(set(regex_list + ai_list))
            )

            continue

        # -------------------------
        # Fill empty regex fields
        # -------------------------
        regex_value = merged.get(key)

        if regex_value in [None, "", [], {}]:
            merged[key] = value

    return merged