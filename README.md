# Vec.js

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

Vectors and their functionality in JavaScript.

## Install

`npm i @leodeslf/vec.js`

## Import

```JavaScript
import { Vec2, Vec3, Vec4 } from '@leodeslf/vec.js';
```

## Features

### Static methods

|| `Vec2` | `Vec3` | `Vec4`
--- | :-: | :-: | :-:
`add()` | ✔ | ✔ | ✔
`angleBetween()` | ✔ | ✔ | ✔
`cross()` | - | ✔ | -
`distance()` | ✔ | ✔ | ✔
`distanceChebyshev()` | ✔ | ✔ | ✔
`distanceManhattan()` | ✔ | ✔ | ✔
`distanceMinkowski()` | ✔ | ✔ | ✔
`dot()` | ✔ | ✔ | ✔
`fromCopy()` | ✔ | ✔ | ✔
`fromPolarCoords()` | ✔ | - | -
`fromSphericalCoords()` | - | ✔ | -
`project()` | ✔ | ✔ | ✔
`subtract()` | ✔ | ✔ | ✔

### Instance methods

|| `Vec2` | `Vec3` | `Vec4`
--- | :-: | :-: | :-:
`get angleX()` | ✔ | ✔ | ✔
`get angleY()` | ✔ | ✔ | ✔
`get angleZ()` | - | ✔ | ✔
`get magnitude()` | ✔ | ✔ | ✔
`set limit()` | ✔ | ✔ | ✔
`set magnitude()` | ✔ | ✔ | ✔
`add()` | ✔ | ✔ | ✔
`clamp()` | ✔ | ✔ | ✔
`copy()` | ✔ | ✔ | ✔
`normalize()` | ✔ | ✔ | ✔
`rotateAxisX()` | - | ✔ | -
`rotateAxisY()` | - | ✔ | -
`rotateAxisZ()` | ✔ | ✔ | -
`scale()` | ✔ | ✔ | ✔
`subtract()` | ✔ | ✔ | ✔

*See in-line docs for more info.*

## Author

[Leonardo de S.L.F](https://github.com/leodeslf "GitHub profile").

## License

MIT License.
