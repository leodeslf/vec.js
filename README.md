# Vector.js

[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Wikarot/Vector.js.svg)](https://github.com/Wikarot/Vector.js)
[![Inline docs](http://inch-ci.org/github/Wikarot/Vector.js.svg?branch=master&style=shields)](http://inch-ci.org/github/Wikarot/Vector.js)
[![GitHub issues](https://img.shields.io/github/issues/Wikarot/Vector.js.svg)](https://github.com/Wikarot/Vector.js/issues)
[![GitHub license](https://img.shields.io/github/license/Wikarot/Vector.js.svg)](https://github.com/Wikarot/Vector.js/blob/master/LICENSE)

```txt

          .                 .
  <--------\               /-------->
    <-------\.           ./------->
      <------\\         //------>
        <-----\\.     .//----->
          <----\\\   ///---->
            <---\\\ ///--->
              <--\\Y//-->
                <-\|/->
                   V

```

## About

A tool for two, three and four-dimensional vectors.

## Usage

```JavaScript
// Create a vector:

// By cartesian coordinates e.g:
let x = 3;
let y = 6;
let z = 9;
let w = 12;

let vector_a = new Vec2(x, y);
let vector_b = new Vec3(x, y, z);
let vector_c = new Vec4(x, y, z, w);

// Or (only in 2D), by polar coordinates e.g:
let radius = 9;
let angle = PI / 3;

let vector_d = Vec2.byPolarCoords(radius, angle);
```

## Features

### Static Methods

| Desc. | Function | Available |
| --- | --- | --- |
| Add | `add()` | 2D, 3D, 4D |
| Create by Polar Coords | `byPolarCoords()` | 2D |
| Distance | `distanceChebyshev()`, `distanceEuclidian()`, `distanceManhattan()` | 2D, 3D, 4D |
| Divide | `divide()` | 2D, 3D, 4D |
| Multiply | `multiply()` | 2D, 3D, 4D |
| Subtract | `subtract()` | 2D, 3D, 4D |

### Instance Methods

| Desc. | Function | Available |
| --- | --- | --- |
| Add | `add()` | 2D, 3D, 4D |
| Copy | `copy()` | 2D, 3D, 4D |
| Divide | `divide()` | 2D, 3D, 4D |
| Get Angle | `getAngle()` | 2D |
| Get/Set Magnitude | `getMagnitude()`, `setMagnitude()` | 2D, 3D, 4D |
| Limit | `limit()` | 2D, 3D, 4D |
| Multiply | `multiply()` | 2D, 3D, 4D |
| Normalize | `normalize()` | 2D, 3D, 4D |
| Subtract | `subtract()` | 2D, 3D, 4D |

*See in-line docs for more info.*

## License

Copyright &copy; 2018 [Leonardo de S.L.F](https://github.com/Wikarot "GitHub profile").

MIT License.
