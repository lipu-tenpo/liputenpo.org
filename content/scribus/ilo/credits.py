#!/usr/bin/env python3
import sys
import yaml
import re
from pathlib import Path

ROLES = {
    "writers": "li toki.",
    "proofreaders": "li alasa e pakala toki.",
    "illustrators": "li sitelen.",
    "frontpage": "li sitelen e sitelen sinpin.",
    "layout": "li sijelo e lipu.",
    "lawa": "li lawa e kulupu.",
}


def localise_role(role: str):
    return ROLES[role].replace(" ", "&nbsp;")


# Define sorting key: "jan Ali" -> "Ali, jan"
def sort_key(name: str):
    headnoun, propername = re.split(r" (?=[A-Z])", name, maxsplit=1)
    return f"{propername.lower().replace(" ", "")}, {headnoun.replace(" ", "")}"


def main():
    if len(sys.argv) < 2:
        print("Usage: python ./ilo/credits.py \"./nanpa <name>/credits.yaml\"")
        sys.exit(1)

    yaml_path = Path(sys.argv[1])
    output_path = yaml_path.parent / "toki" / "credits.md"

    # Load YAML file
    with open(yaml_path, "r", encoding="utf-8") as f:
        data: dict[str, list[str]] = yaml.safe_load(f)

    # Sort and concatenate
    output_lines = []
    for key, names in data.items():
        output_lines.append(f"{" +&nbsp;".join([n.replace(" ", "&nbsp;") for n in sorted(names, key=sort_key)])} {localise_role(key)}")

    # Write to file
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n\n".join(output_lines) + "\n")

    print(f"Sorted credits written to {output_path.resolve()}")

if __name__ == "__main__":
    main()
