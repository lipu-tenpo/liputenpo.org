import os

# import shutil
import subprocess
import tempfile

# TODO: cli-input of desired pdf
INPUT_PDF = "../content/pdf/0035len_bw.pdf"
OUTPUT_PDF = "../content/pdf/0035len_bwpf.pdf"

# Desired page order
PAGE_ORDER = [16, 1, 2, 15, 14, 3, 4, 13, 12, 5, 6, 11, 10, 7, 8, 9]

def run(cmd):
    subprocess.run(cmd, check=True)

def main():
    with tempfile.TemporaryDirectory() as tmp:
        # 1. Split PDF into single pages
        split_pattern = os.path.join(tmp, "page_%02d.pdf")
        run(["pdfseparate", INPUT_PDF, split_pattern])

        # 2. Reorder pages
        ordered_pages = [
            os.path.join(tmp, f"page_{p:02d}.pdf") for p in PAGE_ORDER
        ]

        # tmp_reordered_pdf = os.path.join(tmp, "reordered.pdf")
        run(["pdfunite", *ordered_pages, OUTPUT_PDF ])

        # TODO: implement correctly
        # 3. Put two pages per page (2-up)
        # run([
        #     "pdfnup",
        #     "--nup", "2x1",
        #     "--landscape",
        #     reordered_pdf,
        #     "--outfile", OUTPUT_PDF
        # ])

    print(f"Done → {OUTPUT_PDF}")

if __name__ == "__main__":
    main()
