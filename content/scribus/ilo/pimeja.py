# makes the black-and-white version

from pathlib import Path

import scribus


def replace_main_colors():
	for color in ['loje', 'laso', 'jelo', 'unu']:
		for shade in ['walo', 'pimeja']:
			scribus.replaceColor(f'{color} {shade}', f'kapesi {shade}')

# TODO The ‘fromSVG’ category blobs that don’t get converted sometimes. Why is
# this? When a svg item is added, a new colour is added as well, even if this
# colour is defined in the document. Maybe this only happens if this colour is
# not used.
# recently (June 2025) only unu walo seems to be the problem: FromSVG#ccffff.

def replace_cover_colors():
	# OUTLINE
	# find the front cover item
		# raise error if not found
	# select two of them (depends on the cover)
		# dialog with four checkboxes: ‘which will be dark?’
	# setFillColor('kapesi ante')
	# find the back cover item
		# raise error if not found
	# select the same two items
	# set fill color
	# + deselect
	raise NotImplementedError

def replace_front_image():
	scribus.gotoPage(1)
	raise NotImplementedError

def replace_images():
	# iterate over all image frames
	for page in range(1, scribus.pageCount() + 1):
		scribus.gotoPage(page)
		for item in scribus.getPageItems():
			if item[1] != 2: continue

			filename = Path(scribus.getImageFile(item[0])) # OR getImageName. docs unclear
			x_scale, y_scale = scribus.getImageScale(item[0])
			x_offset, y_offset = scribus.getImageOffset(item[0])

			# TODO if filename + pimeja exists, do …. else: nothing.
			if False: continue
			scribus.loadImage(str(filename.with_name(filename.name.replace("-kule", "-pimeja"))), item[0]) # FIXME before the extension
			scribus.setImageScale(x_scale, y_scale, item[0])
			scribus.setImageOffset(x_offset, y_offset, item[0])


if __name__ == '__main__':
	# TODO option 1: save the file first, then replace colours and save the Scribus file in a new _bw.sla file.
	choice = scribus.messageBox('Replace colours?', 'Do you want to replace the main colours with their greyscale variants?', scribus.ICON_NONE, scribus.BUTTON_CANCEL|scribus.BUTTON_ESCAPE, scribus.BUTTON_YES|scribus.BUTTON_DEFAULT, scribus.BUTTON_NO)
	# TODO remove the cancel button. but then, the numbers might change.
	if choice == 4194304:
		# cancel
		pass
	elif choice == 16384:
		# yes
		replace_images()
		replace_main_colors()
	elif choice == 65536:
		# no
		pass
