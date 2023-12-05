# lipu tenpo website (PROOF OF CONCEPT)

Rewrite of <https://liputenpo.org> using <https://www.11ty.dev/>

See live on <https://liputenpo.alifeee.co.uk/>

Under construction

## Folder structure

```text
_data
  linluwi.yaml (external links)
  lipu_ale.yaml (all issue information)
_includes
  base html template (for <head>)
  frame html template (for header/footer)
public
  static site stuff (favicons/images/stylesheets)
index.html (main page layout)
lipu.html (layout of issue page(s))
```

## Commands

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
