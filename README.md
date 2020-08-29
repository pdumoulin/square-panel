# square-panel

Inspired by: John F. Simon Jr. (b. 1963), Color Panel v1.0, 1999

[See it Live in Action!](https://pdumoulin.github.io/square-panel/)

## Parameters
URL parameters available.

### weight
Determines algorithm used for one square being taken over by it's neighbors.

**Type:** String
**Default:** "none"

| Value | Behavior |
| ---            | :--        |
| [none](https://pdumoulin.github.io/square-panel/?weight=none) | square is taken over if 3 or more neighbors match each other  | |
| [progressive](https://pdumoulin.github.io/square-panel/?weight=progressive) | square has chance to be safe if it's color has lower count on board in total|
| [regressive](https://pdumoulin.github.io/square-panel/?weight=regressive) | square has chance to be safe if it's color has higher count on board in total|
| [random](https://pdumoulin.github.io/square-panel/?weight=random) | square has random chance to be safe|

### squareSize
Dimensions in pixels of each square.

**Type:** Int
**Default:** 5

### refresh
Interval to refresh colors of each square in milliseconds.

**Type:** Int
**Default:** 500
