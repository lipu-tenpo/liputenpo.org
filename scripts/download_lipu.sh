#!/bin/bash

# get all media URLs from a WordPress XML export
#  e.g.,
#   ./download_lipu.sh /mnt/c/Users/alifeee/Downloads/liputenpo.WordPress.2024-01-20.xml 0 /mnt/d/liputenpomedia/

export_file=$1
do_wget=$2
save_to=$3
base_url=$4

if [ -z "$export_file" ]; then
  echo "Usage: $0 <export_file> [do_wget] [save_to]"
  exit 1
fi

if [ -z "$do_wget" ]; then
  do_wget=1
fi

if [ -z "$save_to" ]; then
  save_to="."
fi


cat $export_file | awk '/<guid.*?>(.*)<\/guid>/ { match($0, /<guid.*?>(.*)<\/guid>/, arr); print arr[1] }' | while read url ; do
  if [ $do_wget -eq 1 ]; then
    wget -P $save_to $url
  else
    echo $url | awk -v base_url="$base_url" 'BEGIN {baselen = length(base_url)} { printf "- %s\n", substr($0, baselen + 1)}'
  fi
done
