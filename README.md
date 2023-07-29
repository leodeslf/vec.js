# Vec.js

![version](https://img.shields.io/npm/v/@leodeslf/vec.js?color=3af) ![license](https://img.shields.io/npm/l/@leodeslf/vec.js?color=3af)

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
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [CDNs](#cdns)
  * [API](#api)
    * [Linear Algebra](#linear-algebra)
    * [Copying & Creating](#copying--creating)
    * [Boolean Conditions](#boolean-conditions)
    * [Magnitude Manipulation](#magnitude-manipulation)
    * [Miscellaneous](#miscellaneous)
    * [Getters & Setters](#getters--setters)
      * [Shortcuts](#shortcuts)
* [Data Type Flexibility](#data-type-flexibility)
* [Author](#author)
* [License](#license)

## About

>JavaScript vector library.

Inspired by [GLSL](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) and thought to hit the *highest possible performance* in JavaScript, vec.js makes it possible to **create and operate with vectors**.

## Getting Started

### Installation

```bash
npm i @leodeslf/vec.js
```

```bash
pnpm i @leodeslf/vec.js
```

```bash
yarn add @leodeslf/vec.js
```

### CDNs

```bash
https://unpkg.com/@leodeslf/vec.js@2.0.3
```

```bash
https://cdn.jsdelivr.net/npm/@leodeslf/vec.js@2.0.3
```

### API

Most methods are available as both instance and `static` members.

```javascript
// E.g.:
import { Vec2 } from '@leodeslf/vec.js';

const v = new Vec2(1, 1);
const w = Vec2.random();

v
  .add(w)
  .normalize()
  .negate();
```

#### Linear Algebra

Name|`Vec2`|`Vec3`|`Vec4`
:--|:-:|:-:|:-:
`add`|✓|✓|✓
`angleBetween`|✓|✓|✓
`cross`||✓|
`distance`|✓|✓|✓
`distanceChebyshev`|✓|✓|✓
`distanceManhattan`|✓|✓|✓
`distanceMinkowski`|✓|✓|✓
`distanceSq`|✓|✓|✓
`dot`|✓|✓|✓
`lerp`|✓|✓|✓
`negate`|✓|✓|✓
`normalize`|✓|✓|✓
`project`|✓|✓|✓
`rotateX`||✓|
`rotateY`||✓|
`rotateZ`|✓|✓|
`scale`|✓|✓|✓
`subtract`|✓|✓|✓

#### Copying & Creating

Name|`Vec2`|`Vec3`|`Vec4`
:--|:-:|:-:|:-:
`clone`|✓|✓|✓
`copy`|✓|✓|✓
`fromCylindricalCoords`||✓|
`fromPolarCoords`|✓||
`fromSphericalCoords`||✓|
`random`|✓|✓|✓

#### Boolean Conditions

Name|`Vec2`|`Vec3`|`Vec4`
:--|:-:|:-:|:-:
`satisfyEquality`|✓|✓|✓
`satisfyOpposition`|✓|✓|✓
`isInfinite`|✓|✓|✓
`isNaN`|✓|✓|✓
`isZero`|✓|✓|✓

#### Magnitude Manipulation

Name|`Vec2`|`Vec3`|`Vec4`
:--|:-:|:-:|:-:
`limitMax`|✓|✓|✓
`limitMin`|✓|✓|✓
`clamp`|✓|✓|✓
`zero`|✓|✓|✓

#### Miscellaneous

Name|`Vec2`|`Vec3`|`Vec4`
:--|:-:|:-:|:-:
`lookAt`|✓|✓|✓
`turnLeft`|✓||
`turnRight`|✓||

#### Getters & Setters

Name|`Vec2`|`Vec3`|`Vec4`
:--|:-:|:-:|:-:
`angleW`|||✓*
`angleX`|✓|✓\*|✓*
`angleY`|✓|✓\*|✓*
`angleZ`||✓\*|✓*
`magnitude`|✓|✓|✓
`magnitudeSq`|✓\*|✓\*|✓*
`w`|||✓
`x`|✓|✓|✓
`y`|✓|✓|✓
`z`||✓|✓

*No `set` member.

##### Shortcuts

Use them to `get` and `set` components as arrays.

Name|`Vec2`|`Vec3`|`Vec4`
:--|:-:|:-:|:-:
`xy`|✓||
`xyz`||✓|
`xyzw`|||✓

## Data Type Flexibility

**Vec.js** uses [`Number()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) to *coerce* valid data types into [numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#numbers).

```javascript
// E.g.:
const v = new Vec4(
  '0b1000', // = 8 (binary)
  '0x8',    // = 8 (hexadecimal)
  true,     // = 1
  null      // = 0 (default)
);

console.debug(...v.xyzw); // 8 8 1 0
```

## Author

Copyright (c) [Leonardo de S.L.F](https://github.com/leodeslf "GitHub profile"), 2018-present.

## License

MIT License.
