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

## Table of contents

* [About](#about)
* [Features](#features)
  * [Static methods](#static-methods)
  * [Instance methods](#instance-methods)
    * [Getters & Setters](#getters-and-setters)
    * [Shortcuts & Aliases](#shortcuts-and-aliases)
      * [Shortcuts](#shortcuts)
      * [Aliases](#aliases)
* [Install](#install)
* [Import](#import)
* [Author](#author)
* [License](#license)

## About

*Vectors and their functionality in JavaScript*.

Inspired by GLSL, vec.js is a library to create and operate on 2, 3, and 4D vectors. We can: add, scale, interpolate, rotate; get data: angle between vectors & axis, distances, and more.

## Features

### Static methods

|| `Vec2` | `Vec3` | `Vec4`
--- | :-: | :-: | :-:
`add()` | ✔ | ✔ | ✔
`angleBetween()` | ✔ | ✔ | ✔
`clone()` | ✔ | ✔ | ✔
`cross()` | - | ✔ | -
`distance()` | ✔ | ✔ | ✔
`distanceChebyshev()` | ✔ | ✔ | ✔
`distanceManhattan()` | ✔ | ✔ | ✔
`distanceMinkowski()` | ✔ | ✔ | ✔
`dot()` | ✔ | ✔ | ✔
`equal()` | ✔ | ✔ | ✔
~~`fromCopy()`~~ (use `clone`) | ✔ | ✔ | ✔
`fromCylindricalCoords()` | - | ✔ | -
`fromPolarCoords()` | ✔ | - | -
`fromSphericalCoords()` | - | ✔ | -
`lerp()` | ✔ | ✔ | ✔
`project()` | ✔ | ✔ | ✔
`random()` | ✔ | ✔ | ✔
`subtract()` | ✔ | ✔ | ✔

### Instance methods

They all return `this` (modified vector).

|| `Vec2` | `Vec3` | `Vec4`
--- | :-: | :-: | :-:
`add()` | ✔ | ✔ | ✔
`clamp()` | ✔ | ✔ | ✔
`copy()` | ✔ | ✔ | ✔
`limitMaxMagnitude()` | ✔ | ✔ | ✔
`limitMinMagnitude()` | ✔ | ✔ | ✔
`normalize()` | ✔ | ✔ | ✔
`rotateAxisX()` | - | ✔ | -
`rotateAxisY()` | - | ✔ | -
`rotateAxisZ()` | ✔ | ✔ | -
`scale()` | ✔ | ✔ | ✔
`subtract()` | ✔ | ✔ | ✔

#### Getters & Setters

|| `Vec2` | `Vec3` | `Vec4`
--- | :-: | :-: | :-:
`get angleX()` | ✔ | ✔ | ✔
`get angleY()` | ✔ | ✔ | ✔
`get angleZ()` | - | ✔ | ✔
`get angleW()` | - | - | ✔
`get/set magnitude()` | ✔ | ✔ | ✔
~~`set limit()`~~ (use `limitMaxMagnitude`) | ✔ | ✔ | ✔

#### Shortcuts & Aliases

|| `Vec2` | `Vec3` | `Vec4`
--- | :-: | :-: | :-:
`get/set r()` | - | ✔ | ✔
`get/set g()` | - | ✔ | ✔
`get/set b()` | - | ✔ | ✔
`get/set a()` | - | - | ✔
`get/set rgb()` | - | ✔ | -
`get/set rgba()` | - | - | ✔
`get/set xy()` | ✔ | - | -
`get/set xyz()` | - | ✔ | -
`get/set xyzw()` | - | - | ✔

##### Shortcuts

We can (with arrays) refer and define all the components at once with `xy`, `xyz`, and `xyzw` for `Vec2`, `Vec3` and `Vec4` respectively.

Then, i.e.:

```javascript
const vectorA = new Vec3(3, 6, 9);
const vectorB = new Vec4(...vectorA.xyz, 0);

// It's not possible to do straight with `...vectorA`,
// as we are passing { key: value } instead of value.
```

##### Aliases

It's also possible to refer and define the components of `Vec3` and `Vec4` as `rgb` and `rgba` respectively (also one by one as `r`, `g`, `b`, `a`).

Then, i.e.:

```javascript
const vector = new Vec3(255, 255, 255);
const color = `rgba(${vector.rgb}, 0.5)`;
```

## Install

```shell
npm i @leodeslf/vec.js
```

## Import

```javascript
import { Vec2, Vec3, Vec4 } from '@leodeslf/vec.js';
```

## Author

[Leonardo de S.L.F](https://github.com/leodeslf "GitHub profile").

## License

MIT License.
