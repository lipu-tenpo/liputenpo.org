#!/bin/bash

# get all URLS from several sitemap files
#  and remove base url (first argument)
# e.g.,
# ./get_all_urls.sh https://liputenpo.org https://liputenpo.org/post-sitemap.xml https://liputenpo.org/page-sitemap.xml https://liputenpo.org/category-sitemap.xml https://liputenpo.org/post_tag-sitemap.xml https://liputenpo.org/author-sitemap.xml

# get all urls from args
base_url=$1
shift 1
urls=$@

for url in $urls
do 
  # get all urls from sitemap
  curl -s $url | grep -oP '(?<=<loc>).*?(?=</loc>)' | awk -v base_url="$base_url" 'BEGIN {baselen = length(base_url)} { printf "- %s\n", substr($0, baselen + 1)}'
done
