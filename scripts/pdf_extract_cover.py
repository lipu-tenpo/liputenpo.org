HELP = """
Extract first page from pdf as image.

Example usage:
  pdm run cover 0035len

Requires poppler: https://stackoverflow.com/a/48583124
Ubuntu should have poppler preinstalled; if not, install it:
  sudo apt install poppler-utils
"""

import sys
from pathlib import Path

from pdf2image import convert_from_path

if len(sys.argv) < 2:
    print(HELP)
    sys.exit(1)

PDF_DIRECTORY = "../content/pdf/"

stem = sys.argv[1]
pdf_file = Path(PDF_DIRECTORY) / f"{stem}.pdf"
output_file = Path(PDF_DIRECTORY) / f"{stem}_sinpin.png"

pages = convert_from_path(pdf_file, 500)

pages[0].save(output_file, "PNG")
