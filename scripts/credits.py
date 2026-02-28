HELP = """
Generate a Credits string from a YAML file.
Ensure name sorting and linebreaking.
Used for page 2 of the zine.

Example:
  pdm run credits 0035-len
"""

import sys
import yaml
import re
from pathlib import Path

CREDITS_DIRECTORY = Path("../content/scribus/credits/")

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
    parts = re.split(r" (?=[A-Z])", name, maxsplit=1)
    if len(parts) == 1:
        headnoun, propername = "", parts[0]
    else:
        headnoun, propername = parts
    return f"{propername.lower().replace(" ", "")}, {headnoun.replace(" ", "")}"


def main():
    # Replace the text of all files given by the arguments.
    if not sys.argv[1:]:  # if no arguments
        print(HELP)
        sys.exit(1)

    issue = sys.argv[1]
    yaml_path = CREDITS_DIRECTORY / f"{issue}.yaml"
    output_path = CREDITS_DIRECTORY / f"{issue}.md"

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
