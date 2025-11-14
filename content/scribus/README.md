# how to typeset<br>an edition of *lipu tenpo*

Welcome to the *selo* repository. It contains all the files you need to typeset your own edition of *lipu tenpo*. This file has all the instructions you need to do that.

At least, on the long term. Because, as of now, this document is not yet complete. jan Kasape, the designer, is working on it. Please don’t trip over the ‹TODO›s.

The instructions may also change over time, because the design style of *lipu tenpo* is constantly being worked on. The folder structure also changed over time, because I gradually learn what works best.

## preparations

To make an edition of *lipu tenpo*, you need
1. [Scribus](http://scribus.us) (version 1.5.8)
1. a vector editor like [Inkscape](https://inkscape.org) (it’s best if you use version 1.3+, I think. TODO)
1. `git`

Sometimes, a bitmap-processing tool like [GIMP]() can also be helpful. I needed it once.

### cloning the repository

TODO not the whole repository

## working with Scribus

Scribus is the main tool that you will use. This section contains some tips for your workflow.

Turn off hyphenation.
Enable snapping.

### panes

During the layout process, you will frequently need to use certain panes.
It is useful to have them docked on the side of the window, like so:

TODO image

We suggest the following layout. A top pane about a third the vertical height with the tabs *Properties* and *Align and Distribute*. And a bottom pane about two thirds the vertical height with the tabs *Content Properties* and *Scrapbook*.

TODO is it better to put *Align and Distribute* in another pane? *Properties* and *Content Properties* can best be separated, but so can *Properties* and *Align and Distribute*, I think.

(The tab *Content Properties* changes its name to *Text Properties*, *Image Properties*, etc. depending on the item that’s currently selected.)

You can manage them in the *Windows* menu.

TODO Show margins, boxes, text flow. And enable ‘rulers relative to page’. Toggle these options all on or off using a custom shortcut, like `\`, to preview.

### the scrapbook

A scrapbook is a collection of reusable elements.
While layouting in Scribus, you can click on an element in the scrapbook to immediately put it on the page, with proper positioning.
This saves a lot of time.

The scrapbook for *lipu tenpo* is the `/jo` directory.
You can load it in Scribus as follows:
1. Go to the *Scrapbook* pane.
1. At the top of the pane, click the first, rectangle-shaped icon.
1. Navigate to the `selo` repository on your computer.
1. Select `/jo`.
1. Click *Choose*.

Now, the *jo* scrapbook is loaded in Scribus.
It will remain loaded the next time you TODO.

TODO what’s in the *lipu tenpo* scrapbook?

## working with Inkscape

If you use Inkscape, copy the file `/lipu-tenpo.gpl` to where Inkscape stores its palettes, which is probably `~/.config/inkscape/palettes` if you use Linux. Then, in Inkscape, select it using TODO.
Copy the template file TODO into the folder of the edition.

This table contains the entire palette. TODO

The palette is in the GIMP `.gpl` format. To convert the palette into CSS colours, you can use [this script](https://gist.github.com/alifeee/586b92e21f912dde7f74cd498b7cbb56).

## preparing the files

Clone the *selo* repository onto your device. If you already have the edition, ensure it is up-to-date using `git pull`.

If you make a new edition, TODO.
If you make a different version of an edition, make its folder.
In the root of the directory, make a new folder for the edition. Its name must be the name of the edition. For instance, `/nanpa lipu`. In the folder of the edition, create three folders: `ijo`, `sitelen`, and `toki`.

In addition, you must know the following:

1. the articles in plaintext form
1. the titles of the articles
1. the authors of the articles
1. the name of the category in which each article is
1. the images that the articles use
	1. a greyscale version
	1. a coloured version
		- *If the image uses colour; otherwise, use only a greyscale version.*
		- *The coloured version must have the same dimensions as the greyscale version, and the positioning must be identical.*

TODO use the files that you need for all editions, move them to `/ali`

## an article

### the text

Here is how to import a Markdown file in a text frame:

1. Select the text frame.
2. Import a Markdown file with *Control + `i`*. A file dialog appears.
3. Find the file you want to import, and select it.
    - You can make only Markdown documents visible by setting *Files of type* to *MarkDown Document (\*.md)*.
4. Check these settings (the first time you import a file):
    - Make sure that *Importer* is set to *MarkDown Document*.
    - Make sure that *Import Text Only* is unchecked.
6. Click *OK*.

Now, the contents of the Markdown file are put in the text frame, including the header with metadata:
the article title, the author and the category.
1. From the *jo* scrapbook, add a header block.
2. Copy the article title and paste it in the header.
    - The article title is the text after ‹nimi-suli:›.
3. Copy the author name and paste it after ‹tan› in the author text field.
    - The author’s name is the text after ‹jan-pali:›.
    - Ensure the character style of the author’s name is *jan pali la nimi*.
    - If multiple people have written the article, separate the authors’ names with ‹tan›.
4. If the article has illustrations, write the names of the illustrators after ‹sitelen li tan›.
    - Ensure the character style of the illustrator’s names are *jan sitelen la nimi*.

Now, you can remove the metadata.

### adapting the text

If the article contains headings, give them the style *jan pali*, just like the author line.

Finally, you will have to correct some importing mistakes.
Scribus doesn’t distinguish between line breaks and paragraph breaks.
This means that poems look like collections of single-line paragraphs.
So, you must replace them manually.
Navigate to the original article, or its Markdown file, to see which breaks should be line breaks.
Then, for each incorrect break in the text frame, delete it and insert a line break with *Shift + Enter*.

### layouting the text

Most articles span several text frames.
This means that the article is interrupted by frame breaks.
Try to make these frame breaks as little disturbing as possible.
You can do this by adjusting the height of the frames.
There is often just a little wiggle room, within which you can adjust the frame heights

Try to keep paragraphs together as much as possible.
That is, if you can distribute the article in such a way that no frame break occurs inside a paragraph, do this.

However, a frame break in a paragraph is often unavoidable.
If this happens, try to make clear that the end of the frame is not the end of the paragraph.
So, avoid putting a frame break after a complete sentence;
prefer a mid-sentence break instead.

But not within a compound – that’s disturbing.

TODO rules for good line breaking. also mention Short Words

### images

text wrap
positioning: integers. this is for the greyscale version.
illustrator: in footnote style next to the image

### footnotes

Footnote in the text: regular letter (or superscript? TODO), and apply the style *nanpa lili sewi* TODO.

### title

### background shape

Every article has a title, and every title has a background shape. You must draw this background shape manually. For every article, do this:

1. Open the file `ijo/ko.svg` in Inkscape.
1. In Scribus, a screenshot of the title.
1. Paste the screenshot in `ijo/ko.svg` in Inkscape.
1. With the TODO tool, draw a path around the title.
	1. Draw a shape that fits the article, if this is possible.
		- For an article about a Toki Pona meetup in *nanpa kalama*, I drew three text bubbles, like a conversation.
		- For an article about coffee in *nanpa sewi* TODO I drew a leaf and a drop.
	1. Otherwise, draw a simple bubble or a text bubble.
1. Give the path the light background that corresponds with the colour for the category that the article is in.

Now that you have drawn all the blobs, it is time to export them.

1. Go to the *Layers* menu in Inkscape with *Control + Shift + `l`*.
1. Find the paths that you drew.
1. Rename each path to the title of the article that it is drawn for.
	- A name like `path0053` TODO would be replaced by `jan li toki pona`.
1. Go to the *Export* menu with *Control + Shift + `e`*.
1. TODO the batch tab (Inkscape 1.3+, I think)
1. TODO prefix
1. TODO position

You now have a file for each background shape. Let’s put it in Scribus. For every article, do this:

1. Navigate to the page of an article that doesn’t have a background shape yet.
1. Go to *TODO › Import Vector File…* with your custom shortcut *Control + Shift + `i`*.
1. Select the right shape from the file list.
1. Click near the title that you want to place the shape on.
	- The shape will be big. I don’t know what the regularity is, but it happens.
1. Move the shape to the background using *Control + End*.
1. Resize the shape.
	- For precise rescaling, go to the *Properties* pane (*F4*) TODO. There, you can add an arithmetic expression to the position and scale fields.

## the cover

Change the text in the textbox to the name of the edition.

Make the cover edge in `/nanpa x/ijo/selo.svg`, with the following restrictions:
- Three colours on the front side.
- Three colours on the back.
- Always four colours in total.
- Always some white on both sides.
- The selection of three front colours must not have been used in the two previous editions’ front covers.

The colours are made by blobs (Bézier tool).
Put all four of them on the background.
Then, make four rectangles the size of the page.
Then, for each colour, select a rectangle and *Ctrl + \** to intersect the two shapes.
This way, all four coloured blobs will be cut to the boundaries.

Import the cover edge in Scribus with *Ctrl + Shift + `i`*.

Dimensions:
- height: 216 mm
- width: 303 mm
- Hint: lock the dimensions with the chain icon and only type in one of the dimensions.

Front side:
- x position: −152 mm
- y position: −3 mm

Back side:
- x position: −3 mm
- y position: −3 mm

### the image

The proportions of the front-cover image are preferably 1:1.

The front-cover image is usually in SVG format, because jan Simo usually draws it.
SVGs means no image frame.
Import an SVG file with *Control + Shift + `i`*.

The second page of an edition has four parts.

### the edge

The edge is a vector file. It has a bleed of 3 mm. You must make one yourself for each edition.
Use one blob for each of the four colours.
On either side of the cover, exactly three must be visible.
Make sure that the distribution of these blobs is not the same as in the previous two editions.
TODO

## table of contents

TODO
- Add attributes
    - every line break in the table of contents must be deliberate
    - in the Attributes window, a line break looks like a space
    - copy-paste the article title into the Value field to keep these line breaks
    - these line breaks will appear in the table of contents
    - if the article title also fits in the TOC without a line break, then replace the line break in the Value field with a space, to keep the TOC compact.
    - for display reasons, you might want to line-break a header in weird ways. for instance: ‹weka / li ante / e suli› (lipu tenpo nanpa sin), where ‹/› is a line break. but in the TOC, just put ‹weka li ante e suli›, without line breaks, because it fits on one TOC line.
    - first break the heading in the way that you want to make it appear in the TOC. then copy-paste into Value, hit Enter *and then* save. then break the heading in the way you want. (do this weird process because you can’t enter line breaks in the Value field directly)
- Generate Table of Contents

The tool will spit out the list of all articles with the page numbers they start on.
We separate them with newlines TODO.

Then, we place the category markers before. They are text boxes with a built-in right margin.
We need to calculate the height of each.
Then, we place them after each other.
Per category, do the following:

- Add up all the points for each entry.
	- A 1-line entry gets 3 points.
	- A 2-line entry gets 5 points.
	- A 3-line entry gets 7 points.
- Add 2 points to that.
- In the **Properties** tab, in the **X, Y, Z** category, in the **Height** field, type this number followed by `*2,25`.

EXAMPLE

Snap the text boxes together.

## *jan pali*

The *jan pali* section contains the names of all people who contributed to the edition.

### sorting

For each part, the names are sorted alphabetically, that is: `a e i j k l m n o p s t u w`,
and the pseudo-letter ‹end of word› goes before all of them, as usual.
But we use some extra rules, because, in Toki Pona, the structure of a name is *\[one or more nouns\] \[one or more proper names\]*, where a noun is lowercased and the first letter of a proper name is capitalised.

These are the rules:

- Sort by proper name, not noun.
	- kije Enki < jan Kasape < akesi kon Nalasuni
- If two people have the same proper name, but a different headnoun, break the tie using the noun.
	- jan Temi < mu Temi < mun Temi < jan Temili < mun Temili < pan Temili
- If a name contains multiple proper names, ignore the spaces between them.
	- jan Ke < waso Keli < jan Ke Tami < jan Kewi

- If different people with the same name contributed, include them both.

TODO add no-break spaces in the names and after `<`.

If a name does not follow the structure *\[one or more nouns\] \[one or more proper names\]*, then do what makes most sense.

If someone prefers their proper name to be spelt with a lowercase letter, then treat it as if it were capitalised.
- jan Nalu < soweli nata < palisa jelo Natan

If a name contains only a headnoun, treat it as a proper name.
- jan Lakuse < lipamanka < jan Lokan

But if a name consists of multiple words and no proper name, many orderings may make sense.
You might want to ignore particles like ‹pi›, and put ‹jan pi nimi ala› before TODO, such as in *nanpa TODO*.

jan Nalu ? jan pi nimi ala

TODO simplify this to ‘sorting keys’, like Wikipedia does: ‹jan Kasape› is sorted like ‹Kasape, jan›, and the sorting order is ‘end of string’ < a < A < e < E < … < u < U < w < W < ‘comma’. all the other characters come just before comma? See notes on mobile.

### preparing

Once the names are sorted, do the following:

- Separate the names with a `+`. It resembles the ‹en› of the *sitelen pona* writing system.
- Put a space before the `+`, and a no-break space after the `+`.
- Replace each space in a name with with a no-break space.

A no-break space is the symbol ` `.

- *Compose key + Space + Space*, or *Control + Shift + U, `a0`, Return*.
- *Alt + TODO*
- In Scribus, you can go to *Insert > Spaces & Breaks > Non Breaking Space* or type *Control + Space*.

If you don’t want to type it, break the paragraph manually with soft breaks. These move to the next line without starting a new paragraph. In Scribus, and in many other places too, you can insert a soft break with *Shift + Return*.

- no-break spaces between ‹li alasa e pakala toki.› and so forth.

## introduction text

The intro text is written by jan Sonatan.
It contains a few line breaks.
If you paste the text, Scribus will interpret these as paragraph breaks.
The paragraphs should still be line-broken in a reasonable way.
This is up to you.

First and last line is in the style *toki wawa* and has colour *unu pimeja*.

In the last line, use an en dash (`–`), like this: `– jan Sonatan`.

## checklist before publishing

This checklist will soon be moved to each edition’s `/nanpa x/checklist.md`.

- manual adjustment: arrows, pini

- images: use integers for scaling and panning, because you have to remember them

1. *jan pali*
	1. Are exactly all the authors mentioned before *li toki*?
	1. Are exactly all the illustrators mentioned before *li sitelen*?
	1. Is the front-cover illustrator mentioned before *li sitelen e sitelen sinpin*?
	1. Are you and the other designers mentioned before *li sijelo e lipu*?
1. table of contents
	1. Where there are multiple articles on one page, does the order of articles correspond to the order in the table of contents?
		- If not, you must change the z-indices of titles. You can do this in the following way:
			1. Determine what the most logical reading order is of the articles on the page.
			1. Select the title of the second article according to your order. Then, press the *Home* key to move it to the foreground.
			1. Repeat the previous step for each subsequent article on the page, in the order that you determined.
			1. Regenerate the table of contents using *Extras > Generate Table Of Contents*, and add line breaks with *Shift + Enter* after each category.
1. categories
	1. Does the category name next to the page number correspond with the category name of the article on it?
		- Are all categories contiguous? That is, is there no article that separates articles of the same category?
		- If the category changes in the middle of a page, use that category.
		- If multiple articles of different categories begin on the same page, mention all categories, separating them with a middle dot: ‹8 · sona · pilin›
1. Does each nonpoetry article start with an arrow and end with a ‹pini› symbol?
	1. If an article continues from an odd page to an even page, is there an arrow in the bottom right on the odd page?
	1. Are the first words of each non-poetry article in bold?
	1. Is the TODO
1. Are the colours correct?
	1. For each category, is the background of the title images the same shade?
1. Is the PDF metadata correct?

## exporting

- Go to *File > Export as PDF* TODO.
- PDF version 1.5 TODO.
- bleed TODO.
- only for the printable version:
    - select Use Document Bleeds.
    - check ‘crop marks’, set the offset to 2 mm.

## the greyscale version

- SVG images, such as front cover: in *Properties*, set the right dimensions and position.
- images must have same dimensions and same positioning

- ungroup the front and back cover with *Control + Shift + `g`*.
- you can remove the objects that are not displayed on the page, but it’s not necessary. If you do, then the pre-flight verifier in Scribus will raise some errors like ‹Object is not on a Page TODO› before you export the document. You can ignore them.

Front cover: use your imagination; make front and back look good. Use only the colours ‹kapesi walo› and ‹kapesi ante›.

## printable versions

- Use <https://tools.pdf24.org/de/pdf-seiten-sortieren> to re-sort the pages in the order: `16 - 1 , 2 - 15 , 14 - 3 , 4 - 13, 12 - 5, 6 - 11, 10 - 7, 8 - 9`
- open documents in your preferred pdf viewer, click on print, chose "microsoft to print", click on "two pages per page" or whatever it is in English, create pdf file
- repeat for black & white version

### replacing the colours

## a *sitelen pona* version

Please see <https://github.com/lipu-tenpo/selo/issues/2>

I have never made a *sitelen pona* version yet, so I don’t know what it’s like. Once I have done it, I’ll share my experiences in this document.

## line breaking


