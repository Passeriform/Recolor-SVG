# Recolor-SVG

Simple API to recolor an SVG. Made to bypass GitHub markdown limitation on adding stylesheets.

# Usage
Pass the url as path into the API with options as query parameters.

## Basic Structure
	https://recolor-svg.vercel.app/api/<svg-url>?color=<color>

## Example
	https://recolor-svg.vercel.app/api/https:/raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/linkedin.svg?color=blue

![linkedInIcon](https://recolor-svg.vercel.app/api/https:/raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/linkedin.svg?color=blue&size=25x25)

# Supported options
### `color` :

All CSS3 supported value formats are supported for color.

**NOTE:** Special symbols *(like #)* must be escaped using URL encoding.

	https://recolor-svg.vercel.app/api/<svg-url>?color=%237C23AE

would translate to ![#7C23AE](https://via.placeholder.com/16/7C23AE/FFFFFF?text=+) `#7C23AE`

### `size` :

Type: `<number>` \
Example: `25`

Type: `<number>x<number>` \
Example: `25x25`

**NOTE:** In case a single value is provided, it returns a proportionally sized svg, with width equal to supplied value.

	https://recolor-svg.vercel.app/api/<svg-url>?size=50x20

would translate to `50px` wide and `20px` high
