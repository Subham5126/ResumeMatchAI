import re
import httpx
from bs4 import BeautifulSoup


# Headers that mimic a real browser so sites don't block us
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/125.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# CSS selectors tried in order for each supported site
SELECTORS = {
    "linkedin.com": [
        "div.description__text",
        "div.show-more-less-html__markup",
        "section.description",
    ],
    "indeed.com": [
        "div#jobDescriptionText",
        "div.jobsearch-jobDescriptionText",
    ],
    "glassdoor.com": [
        "div.jobDescriptionContent",
        "div[class*='JobDescription']",
    ],
    "naukri.com": [
        "div.job-desc",
        "section.job-desc",
        "div[class*='job-description']",
    ],
    "internshala.com": [
        "div.internship_other_details_container",
        "div#about_internship",
    ],
}

# Generic fallback selectors tried for unknown sites
GENERIC_SELECTORS = [
    "article",
    "section",
    "div[class*='job-description']",
    "div[class*='jobDescription']",
    "div[class*='description']",
    "main",
]


def _detect_site(url: str) -> str | None:
    for domain in SELECTORS:
        if domain in url:
            return domain
    return None


def _extract_text(soup: BeautifulSoup, selectors: list[str]) -> str | None:
    for sel in selectors:
        el = soup.select_one(sel)
        if el:
            text = el.get_text(separator="\n", strip=True)
            if len(text) > 100:
                return text
    return None


def _clean(text: str) -> str:
    # Collapse 3+ blank lines to 2
    text = re.sub(r"\n{3,}", "\n\n", text)
    # Remove zero-width chars
    text = re.sub(r"[\u200b\u00ad\ufeff]", "", text)
    return text.strip()


def fetch_job_from_url(url: str) -> dict:
    """
    Fetch and extract job description text from a job posting URL.
    Returns {"text": str, "source": str} or raises ValueError on failure.
    """
    url = url.strip()

    # Try Jina Reader first (works for most sites including paywalled ones)
    jina_text = _try_jina(url)
    if jina_text and len(jina_text) > 200:
        return {"text": _clean(jina_text), "source": "jina"}

    # Fallback: direct HTTP scrape
    try:
        resp = httpx.get(url, headers=HEADERS, timeout=12, follow_redirects=True)
        resp.raise_for_status()
    except httpx.HTTPError as e:
        raise ValueError(f"Could not fetch page: {e}") from e

    soup = BeautifulSoup(resp.text, "html.parser")

    # Remove noise
    for tag in soup(["script", "style", "nav", "header", "footer", "aside", "noscript"]):
        tag.decompose()

    site = _detect_site(url)
    selectors = SELECTORS.get(site, []) + GENERIC_SELECTORS if site else GENERIC_SELECTORS

    text = _extract_text(soup, selectors)
    if not text:
        # Last resort: dump all visible text
        text = soup.get_text(separator="\n", strip=True)

    if not text or len(text) < 80:
        raise ValueError("Could not extract job description from this page. Try pasting the text manually.")

    return {"text": _clean(text[:8000]), "source": "scrape"}


def _try_jina(url: str) -> str | None:
    """Use Jina AI reader to get clean markdown from any URL (free, no key needed)."""
    try:
        jina_url = f"https://r.jina.ai/{url}"
        resp = httpx.get(
            jina_url,
            headers={"Accept": "text/plain", "X-Return-Format": "text"},
            timeout=15,
            follow_redirects=True,
        )
        if resp.status_code == 200:
            return resp.text
    except Exception:
        pass
    return None
