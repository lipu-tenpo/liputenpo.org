# TODO bin/python stuff

# How to use this function:
# All arguments are file globs.
# Replace all Markdown files in the toki/ directory
	# python3 ./ilo/particles.py ./toki/*.md
# Replace all Markdown files in the toki/ directory
# whose names start with ‘ni’ or ‘seme’:
	# python3 ./ilo/particles.py ./toki/ni-*.md ./toki/seme-*.md

import re
import sys
import glob
# import scribus # from within Scribus

# TODO test everything

def improved_text_of(toki):
	# pure function that returns the improved text
	# use several replaces using the re module
	# TODO do not replace file names in {{{sitelen}}} tags
	# and ensure that the regexes don’t replace other markdown things
	# like headings and lists
	# TODO remove double/triple/many spaces IF they are surrounded by text.
	# Not at the end of a line, and not in table headers.
	# Remove trailing single space, or trailing more-than-two spaces.
	# perhaps change this to a line-by-line function
	# and use readlines to replace each individual line.
	# advantage: you can filter out a line immediately at the beginning,
	# like those that start with ‘nimi-suli:’, ‘tags:’ or ‘{{{’.

	ilo     = r'[.,:;!?‽·•–—]'
	ilo_ala = r'[^.,:;!?‽·•–—  ]' # ona o ilo ala o kon ala
	kon = r'[  ]' # space before or after punctuation
	# TODO add thin spaces and 202f
	kon_ken = kon + r'?'

	subs = [0] * 8 # TODO better style

	# before modifier ‹a›
	toki, subs[0] = re.subn(r'(?!' + ilo_ala + r') (a)\b', r' \1', toki)

	# before vocative ‹o›
	toki, subs[1] = re.subn(r'(' + ilo_ala + r') (o\b' + kon_ken + ilo + r')', r'\1 \2', toki)

	# after ‹li›, ‹o› or ‹e›
	toki, subs[2] = re.subn(r'\b(li|o|e) (?=' + ilo_ala + r')', r'\1 ', toki)
	# non-overlapping. i.e. ‹li li li li› becomes ‹li~li li~li›
	# toki, subs[2] = re.subn(r'\b(li|o|e) ', r'\1 ', toki)
	# allows overlapping, but matches if li is followed by any space,
	# including the two spaces at the end of a line, or other Markdown spaces.

	# after sentence-initial ‹a› without following punctuation
	# TODO should we even keep this one?
	toki, subs[3] = re.subn(r'(' + ilo + kon_ken + r'\ba) (' + ilo_ala + r')', r'\1 \2', toki)

	# before punctuation (seme ·)
	toki, subs[4] = re.subn(r' (' + ilo + r')', r' \1', toki)

	# before single-letter names (ijo O)
	toki, subs[5] = re.subn(r'(' + ilo_ala + r') ([AEIOU]\b)', r'\1 \2', toki)

	# before single digits (nanpa 7)
	# TODO this also joins ‹kepeken 3.2%›; not wanted
	toki, subs[6] = re.subn(r'(' + ilo_ala + r') ([0-9]\b)', r'\1 \2', toki)

	# hyphenate ‹kijetesantakalu›
	# TODO do not hyphenate in titles
	toki, subs[7] = re.subn(r'\bkijetesantakalu\b', 'ki­je­te­san­ta­ka­lu', toki)

	# TODO subn to get the number of replacements.
	# print this to the status bar.

	return toki, sum(subs)

def replace_invisibles(toki):
	toki = re.sub(r'­', '\033[32m·\033[39m', toki) # coloured cdot as shy
	return re.sub(r' ', '\033[34m~\033[39m', toki) # coloured tilde as nbsp

def tryout():
	while True:
		toki = input('> ')
		new_text, _ = improved_text_of(toki)
		print('  ' + replace_invisibles(new_text))

# TODO untested Scribus stuff that might not even work
# def improve_one_text_frame(name):
# 	text = scribus.getAllText(name)
# 	scribus.setText(improved_text_of(text), name)
#
# def improve_all_text_frames():
# 	# iterate over all text frames
# 	# TODO does it keep styling?
# 	for page in range(1, scribus.pageCount() + 1):
# 		scribus.goToPage(page)
# 		for item in scribus.getPageItems():
# 			if item[1] != 4: continue
# 			improve_one_text_frame(name)

def improve_contents_of_file(file_name):
	with open(file_name, 'r') as f:
		contents = f.read()
	with open(file_name, 'w') as f:
		new_text, subs = improved_text_of(contents)
		# print(new_text)
		f.write(new_text)
	return subs

if __name__ == '__main__':
	# Replace the text of all files given by the arguments.
	if not sys.argv[1:]: # if no arguments
		tryout()

	total_subs = 0
	for arg in sys.argv[1:]:
		for file_name in glob.glob(arg):
			subs = improve_contents_of_file(file_name)
			total_subs += subs
			print(f'Applied {str(subs).rjust(3)} change{'' if subs == 1 else 's'} in {file_name}.')
	print(f'(That’s {str(total_subs).rjust(3)} change{'' if subs == 1 else 's'} altogether.)')
