# To be run from within Scribus.
try:
	import scribus
except ImportError:
	print('This script can only be run from within Scribus.')
	exit(1)

def general_settings(lipu):
	# Set document unit to millimetres. Just to be sure.
	scribus.setUnit(scribus.UNIT_MILLIMETERS)

	# Save linked text frames as PDF articles?
	lipu.article = True

	# Do not show objects outside the margins in the exported file?
	# No. It crops away too much.
	lipu.doClip = False

	# Embed fonts fully or as subset depending on 'fonts' attribute.
	lipu.fontEmbedding = 0

	# Mandatory string for PDF/X-3 or the PDF will fail PDF/X-3 conformance.
	# We recommend you use the title of the document.
	# lipu.info = 'lipu tenpo nanpa something'

	# Export PDF in grayscale?
	lipu.isGrayscale = False

	# Output destination: screen.
	lipu.outdst = 0

	# Use document bleeds?
	lipu.useDocBleeds = False

	# Show bleed marks?
	lipu.bleedMarks = False

	# Show crop marks?
	lipu.cropMarks = False

	# In the PDF viewer, show the document with facing pages,
	# starting with the first page displayed on the right.
	lipu.pageLayout = 3

	# Generate thumbnails?
	lipu.thumbnails = True

	# PDF version to use: PDF 1.4 (Acrobat 5)
	lipu.version = 14

def pimeja_settings(lipu):
	general_settings(lipu)

	# Export PDF in grayscale?
	lipu.isGrayscale = True

	# Output destination: printer.
	lipu.outdst = 1

def ilo_settings(lipu):
	general_settings(lipu)

	# Returns the name of the current file.
	# Appears to be with extension.
	# Unsure whether the path is also included.
	nimi = scribus.getDocName()

	# Use document bleeds?
	lipu.useDocBleeds = True

	# Show bleed marks?
	lipu.bleedMarks = False

	# Show crop marks?
	lipu.cropMarks = True

	# Indicate the distance offset between mark and page area.
	lipu.markOffset = 3

	# Indicate the length of crop and bleed marks.
	lipu.markLength = 3

def name_and_save(lipu, suffix):
	# Name of file to save into.
	nimi = scribus.getDocName()

	# HACK cut off the last four letters (.sla), and append suffix + .pdf extension
	lipu.file = scribus.valueDialog('Enter file name', 'Enter the name of the pdf file to save to.', nimi[:-4] + suffix + '.pdf')

	# Save selected pages to PDF file.
	lipu.save()

if __name__ == '__main__':
	lipu = scribus.PDFfile()

	choice = scribus.messageBox('Regular export?', 'If you want to export the regular colour version, select Yes. If you want to export a greyscale version or print version, select No.', scribus.ICON_NONE, scribus.BUTTON_CANCEL|scribus.BUTTON_ESCAPE, scribus.BUTTON_YES|scribus.BUTTON_DEFAULT, scribus.BUTTON_NO)
	# scribus.messageBox('Result', 'Choice is: ' + str(choice), scribus.ICON_NONE)
	
	if choice == 4194304:
		pass
	elif choice == 16384:
		# regular version
		general_settings(lipu)
		name_and_save(lipu, '')
	elif choice == 65536:
		choice = scribus.messageBox('Greyscale export?', 'If you want to export the greyscale (black–white) version, select Yes. If you want to export the print version, select No.', scribus.ICON_NONE, scribus.BUTTON_CANCEL|scribus.BUTTON_ESCAPE, scribus.BUTTON_YES|scribus.BUTTON_DEFAULT, scribus.BUTTON_NO)
		# TODO why are the options not 1, 2, 3, like the manual says?
		if choice == 4194304:
			pass
		elif choice == 16384:
			# greyscale version
			pimeja_settings(lipu)
			name_and_save(lipu, '-pimeja')
		elif choice == 65536:
			# print version
			ilo_settings(lipu)
			name_and_save(lipu, '-ilo')

