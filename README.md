# Vector.js

[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Wikarot/Vector.js.svg)](https://github.com/Wikarot/Vector.js)
[![Inline docs](http://inch-ci.org/github/Wikarot/Vector.js.svg?branch=master&style=shields)](http://inch-ci.org/github/Wikarot/Vector.js)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Wikarot/Vector.js/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Wikarot/Vector.js/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Wikarot/Vector.js/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Wikarot/Vector.js/build-status/master)
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

A library for two, three and four-dimensional vector `class` for `JavaScript`.

## Usage

```JavaScript
// Create a vector:

// By cartesian coordinates e.g
let x = 3;
let y = 6;
let z = 9;
let w = 12;

let vector_a = new vec2(x, y);
let vector_b = new vec3(x, y, z);
let vector_c = new vec4(x, y, z, w);

// Or (only in 2D), by polar coordinates e.g
let radius = 9;
let angle = PI / 3;

let vector_d = vec2.byPolarCoords(radius, angle);
```

## Features

### Static Methods

| Name | Code | Available |
| ---  | ---  | ---       |
| Add | `add()` | 2D, 3D, 4D |
| Create by Polar Coords | `byPolarCoords()` | 2D|
| Distance | `distanceChebyshev()`<br>`distanceEuclidian()`<br>`distanceManhattan()` | 2D, 3D, 4D |
| Divide | `divide()` | 2D, 3D, 4D |
| Multiply | `multiply()` | 2D, 3D, 4D |
| Subtract | `subtract()` | 2D, 3D, 4D |

### Instance Methods

| Name | Code | Available |
| ---  | ---  | ---       |
| Add | `add()` | 2D, 3D, 4D |
| Copy | `copy()` | 2D, 3D, 4D |
| Divide | `divide()` | 2D, 3D, 4D |
| Get Angle | `getAngle()` | 2D |
| Get/Set Magnitude | `getMagnitude()`<br>`setMagnitude()` | 2D, 3D, 4D |
| Limit | `limit()` | 2D, 3D, 4D |
| Multiply | `multiply()` | 2D, 3D, 4D |
| Normalize | `normalize()` | 2D, 3D, 4D |
| Subtract | `subtract()` | 2D, 3D, 4D |

*See in-line docs for more info.*

## License

Copyright &copy; 2018 [Leonardo de Souza Leal Figueira](https://github.com/Wikarot "GitHub profile").

MIT License (feel free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies).