
from pathlib import Path


LASO = "#aed"
LOJE = "#fcc"
JELO = "#ffa"
UNU = "#ccf"

P1 = "#333"
P2 = "#555"
P3 = "#aaa"
P4 = "#eee"


def svg_point(p):
    x, y = p

    sx = MARGIN + x * SCALE
    sy = MARGIN + y * SCALE

    return f"{sx},{sy}"

def draw(polygons, colors, name):

    width = SIZE * SCALE + 2 * MARGIN
    height = SIZE * SCALE + 2 * MARGIN

    parts = []

    parts.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'width="{width}" height="{height}" '
        f'viewBox="0 0 {width} {height}">'
    )

    # background
    parts.append(
        f'<rect x="0" y="0" width="{width}" height="{height}" fill="white" style="stroke-linecap:round"/>'
    )

    # optional grid
    # for i in range(SIZE + 1):
    #     x = MARGIN + i * SCALE
    #     y = MARGIN + i * SCALE
    #
    #     parts.append(
    #         f'<line x1="{x}" y1="{MARGIN}" '
    #         f'x2="{x}" y2="{height - MARGIN}" '
    #         f'stroke="#dddddd" stroke-width="1"/>'
    #     )
    #
    #     parts.append(
    #         f'<line x1="{MARGIN}" y1="{y}" '
    #         f'x2="{width - MARGIN}" y2="{y}" '
    #         f'stroke="#dddddd" stroke-width="1"/>'
    #     )

    # draw polygons
    for i, poly in enumerate(polygons):
        pts = ' '.join(svg_point(p) for p in poly)

        parts.append(
            f'<polygon points="{pts}" '
            f'fill="{colors[i % len(colors)]}" '
            f'stroke="black" stroke-width="{1.5}" '
            f'fill-opacity="0.85"/>'
        )

    parts.append('</svg>')

    svg = '\n'.join(parts)

    Path(f'{name}.svg').write_text(svg)

    print(f'Wrote {name}.svg')

SCALE = 13
MARGIN = 0
SIZE = 12

polygons = [
    [(0,0), (6,0), (4,4)],
    [(0,0), (2,2), (0,12)],
    [(0,12), (4,4), (2,2)],
    [(0,12), (2,8), (3,12)],
    [(3,12), (3,6), (2,8)],
    [(3,12), (3,6), (4,4), (6,6), (6,12)],
    [(4,4), (6,6), (6,0)],
    [(6,0), (12,0), (12,4), (9,6)],
    [(6,0), (6,6), (8,8), (9,6)],
    [(6,6), (6,12), (8,8)],
    [(9,6), (12,6), (12,4)],
    [(6,12), (12,12), (8,8)],
    [(8,8), (9,6), (12,12)],
    [(12,12), (12,6), (9,6)],
]

colors = [
    LASO, LOJE, UNU, LASO, JELO, LOJE, JELO,
    UNU, LOJE, JELO, JELO, UNU, LASO, LOJE,
]

draw(polygons, colors, "ostomachion-kule")

colors = [
    P1, P2, P3, P1, P4, P2, P4,
    P3, P2, P4, P4, P3, P1, P2,
]

draw(polygons, colors, "ostomachion-pimeja")

SCALE = 33
MARGIN = 0
SIZE = 4

polygons = [
    [(0,0), (4,0), (2,2)],
    [(0,0), (0,4), (2,2)],
    [(0,4), (1,3), (3,3), (2,4)],
    [(2,2), (3,1), (4,2), (3,3)],
    [(4,0), (3,1), (4,2)],
    [(4,2), (2,4), (4,4)],
    [(2,2), (1,3), (3,3)],
]

colors = [
    JELO, LOJE, JELO, LASO, UNU, LOJE, UNU,
]

draw(polygons, colors, "tangram-kule")

colors = [
    P4, P2, P4, P1, P3, P2, P3,
]

draw(polygons, colors, "tangram-pimeja")
