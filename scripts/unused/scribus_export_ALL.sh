#!/bin/bash
# for each folder in ./toki/ (excluding ./toki/images/), run scribus_export.sh on each .md file
# this will create a folder structure in ./scribus/ that mirrors ./toki/
# e.g., ./toki/nanpa-ma/alasa-nimi-ma-asija.md -> ./scribus/nanpa-ma/alasa-nimi-ma-asija.md

# for each folder in ./toki/ (excluding ./toki/images/)
for folder in $(find ./toki/ -type d -not -path "./toki/images/*" -not -path "./toki/")
do
    # folder name without "./toki/"
    issue=${folder#"./toki/"}
    if [ "$issue" == "images" ]; then
        continue
    fi
    # for each .md file in the folder
    for file in $(find $folder -name "*.md")
    do
        # run scribus_export.sh on the file
        ./scripts/scribus_export.sh $file "./scribus/${issue}/"
    done
done
