Various Python scripts to automate away manual tasks.

## Prerequisites

* Python 3.14
* PDM (`python3 -m pip install pdm`)

## Usage

```
pdm install

# Add special characters:
pdm run particles 0035-len

# Extract pdf cover image:
pdm run cover 0035len

# Generate two-sided printable pdf:
pdm run pf 0035len
pdm run pf 0035len_bw
```
