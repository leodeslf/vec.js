# Vector

<!--[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Wikarot/Vector.js.svg)](https://github.com/Wikarot/Vector.js)-->
<!--[![Inline docs](http://inch-ci.org/github/Wikarot/Vector.js.svg?branch=master&style=shields)](http://inch-ci.org/github/Wikarot/Vector.js)-->
<!--[![GitHub issues](https://img.shields.io/github/issues/Wikarot/Vector.js.svg)](https://github.com/Wikarot/Vector.js/issues)-->
<!--[![GitHub license](https://img.shields.io/github/license/Wikarot/Vector.js.svg)](https://github.com/Wikarot/Vector.js/blob/master/LICENSE)-->

## About

A tool for two, three and four-dimensional vectors.

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

## Example

Importing:

```JavaScript
import Vec2 from './vec2'
import Vec3 from './vec3'
import Vec4 from './vec4'

// Or
import { Vec2, Vec3, Vec4 } from './vec'
```

Creating by cartessian coords.:

```JavaScript
// Create a vector by cartesian coordinates e.g.:
let x = 3
let y = 6
let z = 9
let w = 12

const vector_a = new Vec2(x, y)
const vector_b = new Vec3(x, y, z)
const vector_c = new Vec4(x, y, z, w)
```

Creating by polar coords.:

```JavaScript
// Create a vector by polar coordinates e.g.: (Available for 2D)
let radius = 9
let angle = PI / 3

const vector_d = Vec2.byPolarCoords(radius, angle)
```

## Features

### `Static` Methods

| Desc. | Method | Available |
| --- | --- | --- |
| Add | `add()` | 2D, 3D, 4D |
| Create by Polar Coords | `byPolarCoords()` | 2D |
| Distance | `distanceChebyshev()`, `distanceEuclidian()`, `distanceManhattan()`, `distanceMinkowski()` | 2D, 3D, 4D |
| Divide | `divide()` | 2D, 3D, 4D |
| Multiply | `multiply()` | 2D, 3D, 4D |
| Subtract | `subtract()` | 2D, 3D, 4D |

### `Instance` Methods

| Desc. | Method | Available |
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

## Author

[Leonardo de S.L.F](https://github.com/Wikarot).

## License

MIT License.
