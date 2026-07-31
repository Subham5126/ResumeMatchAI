import json


def format_analysis_context(analysis: dict) -> str:
    """
    Convert analysis JSON into a structured context
    that can be understood easily by the LLM.
    """

    return json.dumps(analysis, indent=2)