"""extract first page from pdf as image
requires poppler: https://stackoverflow.com/a/48583124
Ubuntu should have poppler preinstalled, if not, install it
example:
  sudo apt install poppler-utils
  python3 -m venv envv
  pip install pdf2image
  python3 scripts/extract_images_from_pdf.py pdfs/0025kalama.pdf pdfs/0025kalama_sinpin.png
"""

import sys
from pdf2image import convert_from_path

if len(sys.argv) < 3:
    print("Usage: python extract_images_from_pdf.py <pdf_file> <output_file>")
    sys.exit(1)

pdf_file = sys.argv[1]
output_file = sys.argv[2]

pages = convert_from_path(pdf_file, 500)

pages[0].save(output_file, "PNG")
