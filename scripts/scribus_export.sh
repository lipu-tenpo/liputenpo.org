#!/bin/bash
# script for transform /toki/ files for use in Scribus
# this means:
#  removing metadata e.g., "---"
#  removing filters e.g., "{{pu nnnnn}}"
# arguments:
#  1: file to transform
#  2: folder to save transformed file to
# e.g.,
#  ./scribus_export.sh ./toki/nanpa-ma/alasa-nimi-ma-asija.md ./scribus/nanpa-ma/
# to use on an entire directory, use `find`, e.g.,
#  find ./toki/nanpa-ma/ -name "*.md" -exec ./scribus_export.sh {} ./scribus/nanpa-ma/ \;

INPUT_FILE=$1
OUTPUT_FOLDER=$2

# create output folder if it doesn't exist
mkdir -p $OUTPUT_FOLDER

# remove metadata
cat $INPUT_FILE | awk '
    BEGIN {in_meta=false}

    # skip section in between two "---" tags
    /^---$/ {in_meta=!in_meta; next}
    {if (in_meta) next;}

    # print lines, skipping filters
    {gsub(/\{\{.+\}\}/, ""); print}
' | \
# remove triple-empty lines - https://unix.stackexchange.com/a/492643
awk '/./ { e=0 } /^$/ { e += 1 } e <= 1' > $OUTPUT_FOLDER/$(basename $INPUT_FILE)
