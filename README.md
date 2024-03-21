# lipu tenpo website

<https://liputenpo.org> using <https://www.11ty.dev/>

## How-to

The following should be done on a **branch** of the [main repository](https://github.com/lipu-tenpo/liputenpo.org). When ready, it can be merged into the [staging repository](https://github.com/lipu-tenpo/liputenpo.org.test), to see what it looks like online, and test links and images.

Only **THEN** should it be pushed to `main` of the [main repository](https://github.com/lipu-tenpo/liputenpo.org).

### Add a new *lipu*

1. Add the new PDFs to the [./pdfs](./pdfs/) folder.
1. Edit [`_data/lipu_ale.yaml`](./_data/lipu_ale.yaml) and add the new article. For example,

     ```yaml
     - id: 23
       title: nanpa sewi
       date: 2023-12-25
       pdf: 0023sewi.pdf
       pdf_pf: 0023sewi_pf.pdf
       pdf_bwpf: 0023sewi_bwpf.pdf
       cover_image: 0023sewi_sinpin.png
     ```

1. Wait for site to build - see status on the [actions tab](https://github.com/lipu-tenpo/liputenpo.org/actions)
1. Merge into main branch of staging site
1. Check links and images
1. Merge into main branch of main site
1. create an empty nanpa-\<nimi\> directory with an 11tydata file inside `./toki/` (copy from an existing folder and change as necessary)

## Add a new *toki*

1. Create a new markdown file in the sub-folder of the issue the toki is from in [`./toki`](./toki/)
1. Create the frontmatter for the file with the `TITLE`, `AUTHOR(S)`, `DATE`, and `TAGS` (article type), for example

      ```yaml
      ---
      nimi-suli: nasin tawa Intawe
      jan-pali: jan Alipi
      tags:
        - sona
      ---
      ```

1. Upload any images to [`./toki/images/`](./toki/images/) prepended by the issue number and name
1. Paste the content into the article
    - Lines must end with double-space `"  "`or there should be a two-linebreak gap between paragraphs (as standard in markdown)
    - Use the image shortcode for images, e.g., `{{{sitelen "0023sewi_nasin-tawa-intawe.png" "nasin tawa Intawe" "jan Alonola"}}}`
        {{{"sitelen" - filename - alt text - author}}}
    - Use the non-pu shortcode for non-pu words, e.g., `{{{pu "kipisi"}}}`

      (Shortcodes are defined in [`./.eleventy.js`](./.eleventy.js))
2. Wait for site to build - see status on the [actions tab](https://github.com/lipu-tenpo/liputenpo.org/actions)
3. Merge into main branch of staging site
4. Check links and images
5. Merge into main branch of main site

## Edit jan pali

Edit [`./_data/jan_pali.yaml`](./_data/jan_pali.yaml)

## Edit other data on the site

It's probably in a file in [`./_data`](./_data/).

## Export articles as plaintext

You can either check out the repository and run the [export scripts](./scripts/) yourself, or:

- Go to the [Actions tab > `toki plaintext`](https://github.com/lipu-tenpo/liputenpo.org/actions/workflows/scribus_plaintext.yml)
- Click `Run workflow` and target the branch you want to target

    ![Run workflow button](images/run%20workflow.png)
- Wait, and refresh the page. Click the new in-progress workflow
- When workflow completes, a `.zip` containing all the plaintext should be in the summary section

    ![screenshot of workflow artifact](images/artifacts.png)
- Download this, and unzip it. These are the plaintext of the files in [`./toki/`](./toki/)

## Development Commands

### Install

```bash
npm install
```

### Develop

```bash
npm run develop
```

### Build

```bash
npm run build
```
