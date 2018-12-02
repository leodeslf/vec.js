# Vector.js

[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Wikarot/Vector.js.svg)](https://github.com/Wikarot/Vector.js)
[![Inline docs](http://inch-ci.org/github/Wikarot/Vector.js.svg?branch=master&style=shields)](http://inch-ci.org/github/Wikarot/Vector.js)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Wikarot/Vector.js/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Wikarot/Vector.js/?branch=master)
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

A two-dimensional vector `class` for `JavaScript`.

## Usage

```JavaScript
import Vector from '/modules/Vector.js';

// The normal way, by cartesian coordinates e.g
let x = 3;
let y = 6;
let vector_a = new Vector(x, y);

// An alternative way, by polar coordinates e.g
let radius = 9;
let angle = PI / 3;
let vector_b = Vector.byPolarCoords(radius, angle);
```

## Features

- Static methods:
  - Add `add()`
  - Create vector by polar coordinates. `byPolarCoords()`
  - Distance `distanceChebyshev()`, `distanceEuclidian()`, `distanceManhattan()`
  - Divide `divide()`
  - Multiply `multiply()`
  - Subtract `subtract()`

- Instance methods:
  - Add `add()`
  - Copy `copy()`
  - Divide `divide()`
  - Get angle `getAngle()`
  - Get/Set magnitude `getMagnitude()`, `setMagnitude()`
  - Limit `limit()`
  - Multiply `multiply()`
  - Normalize `normalize()`
  - Subtract `subtract()`

*See in-line docs for more info (100% documented).*

## License

Copyright (c) 2018 [Leonardo de Souza Leal Figueira](https://github.com/Wikarot "GitHub profile").

MIT License (feel free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies).
