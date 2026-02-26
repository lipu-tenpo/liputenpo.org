HELP = """
Symlink an issue from /content/ to /src/.
Fill in .11tydata along the way.

Examples:
  pdm run register 0035-len 2026-03-01
"""

import glob
import re
import sys
import os
import json
from pathlib import Path

IN_DIRECTORY = Path("../content/md/")
OUT_DIRECTORY = Path("../src/toki/")

if __name__ == "__main__":
    # Replace the text of all files given by the arguments.
    if len(sys.argv) < 3:
        print(HELP)
        sys.exit(1)

    # e.g. 0035-len
    issue = sys.argv[1]
    # e.g. nanpa-len
    nanpa = f"nanpa-{issue.split("-")[1]}"

    date = sys.argv[2]

    in_path = IN_DIRECTORY / issue
    out_path = OUT_DIRECTORY / nanpa

    if not out_path.exists():
        os.symlink(in_path, out_path)

    with open(in_path / f"{nanpa}.11tydata.json", "w") as f:
        json.dump({
    "tags": [nanpa.replace("-", " ")],
    "date": date
}, f, indent=4)
        f.write("\n")

