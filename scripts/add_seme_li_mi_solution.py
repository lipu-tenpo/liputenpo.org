from pathlib import Path

# Adjust if needed
ROOT = Path("content/md")

# Actual answers keyed by issue slug
SOLUTIONS = {
    "0001-akesi": {"tp": "insa pilin", "en": "heart"},
    "0003-soweli": {"tp": "jan", "en": "person"},
    "0004-kasi": {"tp": "linluwi", "en": "internet"},
    "0005-pan": {"tp": "soweli alasa", "en": "dog"},
    "0006-suno": {"tp": "ma Kanse", "en": "France"},
    "0007-kule": {"tp": "soweli ko", "en": "cat"},
    "0008-toki": {"tp": "ante", "en": "change"},
    "0009-moli": {"tp": "tenpo lete", "en": "winter"},
    "0010-lete": {"tp": "pini (ante anu moli kin li ken)", "en": "the end, change or death"},
    "0011-walo": {"tp": "kala suli", "en": "Whale"},
    "0012-nimi": {"tp": "ma Netelan", "en": "Nethelands"},
    "0013-pipi": {"tp": "akesi poki", "en": "Turtle"},
    "0014-seli": {"tp": "olin", "en": "love"},
    "0015-moku": {"tp": "kala", "en": "fish"},
    "0016-kulupu": {"tp": "telo", "en": "water"},
    "0017-musi": {"tp": "kalama musi", "en": "music"},
    "0018-tu": {"tp": "tu", "en": "two"},
    "0019-mama": {"tp": "mama (meli)", "en": "mother"},
    "0020-nasin": {"tp": "tomo tawa", "en": "car"},
    "0021-ma": {"tp": "waso lete/kala", "en": "penguin"},
    "0022-sin": {"tp": "tomo tawa kon/waso", "en": "airplane"},
    "0023-sewi": {"tp": "soweli suli pi nena linja", "en": "elephant"},
    "0024-tenpo": {"tp": "ilo tenpo", "en": "clock"},
    "0025-kalama": {"tp": "sike mama", "en": "egg"},
    "0026-jaki": {"tp": "tomo sona", "en": "school"},
    "0027-linja": {"tp": "akesi linja", "en": "snake"},
    "0028-lawa": {"tp": "soweli loje walo", "en": "pig"},
    "0029-jan": {"tp": "soko", "en": "mushroom"},
    "0030-loje": {"tp": "sitelen lape, jume", "en": "dream"},
    "0031-kala": {"tp": "kala pi luka luka tu wan", "en": "octopus"},
    "0032-supa": {"tp": "monsi", "en": "ass"},
    "0033-pilin": {"tp": "jan lon lipu, jan powe, jan pi lon ala", "en": "fictional person"},
    "0034-lon": {"tp": "jan lon lipu, jan powe, jan pi lon ala", "en": "fictional person"},
    "0035-len": {"tp": "suwi kapesi", "en": "chocolate"},
}

MARKER_CLASS = "seme-li-mi-solution"

DETAILS_TEMPLATE = """

<details class="seme-li-mi-solution">
  <summary>mi ni</summary>
  <p><strong>{tp}</strong></p>
  <p>{en}</p>
</details>
"""

def looks_like_seme_li_mi(text: str, path: Path) -> bool:
    filename = path.name.lower()

    # modern/old naming variants
    if "seme-li-mi" in filename in filename:
        return True

def already_has_solution_block(text: str) -> bool:
    return MARKER_CLASS in text or "<summary>mi ni</summary>" in text

def issue_slug_from_path(path: Path) -> str | None:
    for part in path.parts:
        p = part.lower()
        if p.startswith("00"):
            return p
    return None

def process_file(md_path: Path) -> bool:
    text = md_path.read_text(encoding="utf-8")

    if not looks_like_seme_li_mi(text, md_path):
        return False

    if already_has_solution_block(text):
        return False

    issue_slug = issue_slug_from_path(md_path)
    if not issue_slug:
        print(f"[skip] no issue slug in path: {md_path}")
        return False

    solution = SOLUTIONS.get(issue_slug)
    if not solution:
        print(f"[skip] no solution for {issue_slug}: {md_path}")
        return False

    block = DETAILS_TEMPLATE.format(tp=solution["tp"], en=solution["en"])
    new_text = text.rstrip() + block + "\n"
    md_path.write_text(new_text, encoding="utf-8")
    print(f"[ok] {md_path} -> {issue_slug}")
    return True

def main():
    if not ROOT.exists():
        raise SystemExit(f"Root folder not found: {ROOT}")

    changed = 0
    for md in ROOT.rglob("*.md"):
        try:
            if process_file(md):
                changed += 1
        except Exception as e:
            print(f"[err] {md}: {e}")

    print(f"\nDone. Updated {changed} file(s).")

if __name__ == "__main__":
    main()