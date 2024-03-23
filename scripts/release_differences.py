"""calculate the time difference between the release of each issue
use "0" argument to disable colours in output (e.g., for CMD)
example:
    python scripts/release_differences.py
    python scripts/release_differences.py 0
"""

import sys

# pip install pyyaml
import yaml

LIPU_ALE = "_data/lipu_ale.yaml"


class bcolors:
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKCYAN = "\033[96m"
    OKGREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"


def barchart(total, progress, colour_until=None, chars=40):
    """print an ASCII bar chart, of length progress/total, where chars is the length of it
    It is coloured until colour_until units, if given.
    """
    if colour_until is None:
        colour_until = progress
    s = "["
    for i in range(chars):
        before_progress = progress / total * chars > i
        before_colour_until = colour_until / total * chars > i
        if before_progress and before_colour_until:
            s += "="
        elif before_progress:
            s += "-"
        else:
            s += " "
    s += "]"
    return s


def main():
    """main"""
    with open(LIPU_ALE, "r", encoding="utf-8") as file:
        lipu_ale = yaml.load(file, Loader=yaml.FullLoader)

    lipu_ale = sorted(lipu_ale, key=lambda x: x["id"])
    # remove id 12.5
    lipu_ale = [x for x in lipu_ale if x["id"] != 12.5]

    for i in range(1, len(lipu_ale)):
        last_date = lipu_ale[i - 1]["date"]
        this_date = lipu_ale[i]["date"]
        difference = this_date - last_date
        lipu_ale[i]["difference"] = difference

    print('title\t\ttime since last issue\ttime since last issue ("=" is 30 days)')
    print("----\t\t---------------------\t----------------------------------------")
    print(f"{lipu_ale[0]['title']}")
    for i in range(1, len(lipu_ale)):
        difference = lipu_ale[i]["difference"]
        d_days = difference.days
        d_months = d_days / 30
        biggest_difference = max(x["difference"] for x in lipu_ale[1:])

        if d_days < 30:
            c = bcolors.OKGREEN
        elif d_days < 60:
            c = bcolors.OKCYAN
        elif d_days < 90:
            c = bcolors.WARNING
        else:
            c = bcolors.FAIL
        c_e = bcolors.ENDC

        if len(sys.argv) > 1 and sys.argv[1] == "0":
            c = ""
            c_e = ""

        print(
            f"{lipu_ale[i]['title']}\t{c}{d_days} days ({d_months:.2f} months){c_e}\t"
            f"{barchart(biggest_difference.days, d_days, colour_until=30)}"
        )


if __name__ == "__main__":
    main()
