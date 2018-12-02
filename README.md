# Vector.js

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

*See in-line doc. for parameters and types.*

## Credits

[Leonardo de Souza Leal Figueira](https://github.com/Wikarot "GitHub profile").
