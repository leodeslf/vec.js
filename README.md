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
`fromCylindricalCoords()` | - | ✔ | -
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

### Shortcut

We can refer (getting an array) and define all the components at once with `xy`, `xyz`, and `xyzw` for `Vec2`, `Vec3` and `Vec4` respectively.

Then, i.e.:

```javascript
const vec3D = new Vec3(x, y, z);
const vec4D = new Vec4(...vec3D.xyz, time);

// It's not possible to do straight with `...vec3D`,
// as we are passing { key: value } instead of value.
```

#### Alias

As an alias for shortcuts, for readable reasons, it's also possible to refer and define the components of `Vec3` and `Vec4` as `rgb` and `rgba` respectively (also one by one as `r`, `g`, `b`, `a`).

Then, i.e.:

```javascript
let vec = new Vec4(1, 1, 1, 1);
vec.scale(255);
let color = `rgba(${vec.rgb}, ${vec.a / 255})`;
```

#### Shortcuts & Alias

For both, `get` and `set` methods.

|| `Vec2` | `Vec3` | `Vec4`
--- | :-: | :-: | :-:
`r` | - | ✔ | ✔
`g` | - | ✔ | ✔
`b` | - | ✔ | ✔
`a` | - | - | ✔
`rgb` | - | ✔ | -
`rgba` | - | - | ✔
`xy` | ✔ | - | -
`xyz` | - | ✔ | -
`xyzw` | - | - | ✔

## Author

[Leonardo de S.L.F](https://github.com/leodeslf "GitHub profile").

## License

MIT License.
