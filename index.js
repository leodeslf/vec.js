/**
 * Inspired by GLSL and thought to hit the *highest possible performance* in
 * JavaScript, vec.js makes it possible to **create and operate with vectors**.
 * @summary JavaScript vector library.
 * @version 2.0.3
 * @copyright Copyright (c) Leonardo de S.L.F, 2018-present.
 * @author Leonardo de S.L.F
 * @license MIT
 */

"use strict";

const { PI, sin, cos, acos, atan2, sqrt, random, abs } = Math;

/**
 * A 2-dimensional vector class.
 */
class Vec2 {
  #x;
  #y;

  /**
   * Creates a 2-dimensional vector pointing to `x` and `y`.
   * @param {?(number|string|boolean)} [x=null] Any number-coercible value.
   * @param {?(number|string|boolean)} [y=null] Any number-coercible value.
   */
  constructor(x = null, y = null) {
    this.#x = Number(x);
    this.#y = Number(y);
  }

  /**
   * Returns the addition of `v` plus `w`.
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @returns {Vec2} A new vector.
   */
  static add(v, w) {
    return new Vec2(
      v.#x + w.#x,
      v.#y + w.#y
    );
  }

  /**
   * Returns the angle between `v` and `w`. Interval (-PI, PI].
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @returns {number} Value in radians.
   */
  static angleBetween(v, w) {
    return atan2(
      v.#x * w.#y - v.#y * w.#x,
      v.#x * w.#x + v.#y * w.#y
    );
  }

  /**
   * Computes the distance from `v` to `w` with the
   * {@link https://en.wikipedia.org/wiki/Euclidean_distance Euclidean metric}.
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @returns {number} Euclidean distance.
   */
  static distance(v, w) {
    return sqrt(
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2
    );
  }

  /**
   * Computes the distance from `v` to `w` with the 
   * {@link https://en.wikipedia.org/wiki/Chebyshev_distance Chebyshev metric}.
   * 
   * "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @returns {number} Chebyshev distance.
   */
  static distanceChebyshev(v, w) {
    const absX = abs(v.#x - w.#x);
    const absY = abs(v.#y - w.#y);
    return absX >= absY ?
      absX :
      absY;
  }

  /**
   * Computes the distance from `v` to `w` with the
   * {@link https://en.wikipedia.org/wiki/Taxicab_geometry Manhattan metric}
   * (aka. taxicab metric). Given two points, it is the sum of the absolute
   * differences of their components.
   * 
   * "Inspired by the grid-like organization of Manhattan, this is distance to
   * the nearest points when you can only travel around the boundaries." I.e.:
   * Only horizontal, vertical and diagonal (45 degrees) movements.
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @returns {number} Manhattan distance.
   */
  static distanceManhattan(v, w) {
    return (
      abs(v.#x - w.#x) +
      abs(v.#y - w.#y)
    );
  }

  /**
   * Computes the distance from `v` to `w` with the Minkowski metric.
   * 
   * Said to be a generalization of the Euclidean distance, Manhattan
   * distance, and Chebyshev distance, the
   * {@link https://en.wikipedia.org/wiki/Minkowski_distance Minkowski metric}
   * is a distance of order `p` which can be equivalent to:
   * 
   * - Manhattan distance when `p` = 1.
   * - Euclidean distance when `p` = 2.
   * - Chebyshev distance when `p` = Infinite.
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @param {(number|string|true)} [p=1] Any number-coercible value greater than 0.
   * @returns {number} Minkowski distance.
   */
  static distanceMinkowski(v, w, p = 1) {
    p = Number(p);
    return (
      abs(v.#x - w.#x) ** p +
      abs(v.#y - w.#y) ** p
    ) ** (1 / p);
  }

  /**
   * Computes the squared distance from `v` to `w` with the Euclidean metric.
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @returns {number} Euclidean squared distance.
   */
  static distanceSq(v, w) {
    return (
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2
    );
  }

  /**
   * The {@link https://en.wikipedia.org/wiki/Dot_product dot product} (aka.
   * scalar product or inner product) measures how much `v` and `w` point in the
   * same direction.
   * 
   * - When pointing in the same direction: we get the largest value.
   * - When the angle between is 90 degrees: we get 0.
   * - When pointing in opposite directions: we inverse the largest value.
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @returns {number} The dot product.
   */
  static dot(v, w) {
    return (
      v.#x * w.#x +
      v.#y * w.#y
    );
  }

  /**
   * Returns a new vector created from polar coordinates (denoted by ρ, θ).
   * @param {?(number|string|boolean)} [r=null] Radius, any number-coercible
   * value.
   * @param {?(number|string|boolean)} [theta=null] Polar angle relative to the
   * positive x-axis in radians, any number-coercible value.
   * @returns {Vec2} A new vector.
   */
  static fromPolarCoords(r = null, theta = null) {
    r = Number(r);
    theta = Number(theta);
    return new Vec2(
      r * cos(theta),
      r * sin(theta)
    );
  }

  /**
   * Checks whether or not vector `v` has any +/-`Infinity` component.
   * @param {Vec2} v A vector.
   * @returns {boolean} Boolean result.
   */
  static isInfinite(v) {
    return (
      v.#x === Infinity || v.#x === -Infinity ||
      v.#y === Infinity || v.#y === -Infinity
    );
  }

  /**
   * Checks whether or not vector `v` has any `NaN` component.
   * @param {Vec2} v A vector.
   * @returns {boolean} Boolean result.
   */
  static isNaN(v) {
    return (
      isNaN(v.#x) ||
      isNaN(v.#y)
    );
  }

  /**
   * Checks whether or not vector `v` has all its components at zero.
   * @param {Vec2} v A vector.
   * @returns {boolean} Boolean result.
   */
  static isZero(v) {
    return (
      v.#x === 0 &&
      v.#y === 0
    );
  }

  /**
   * Linearly interpolates between `v` and `w`. Parameter `t` is clamped to the
   * range of [0, 1].
   * 
   * - Returns `v` when `t` = 0.
   * - Returns `w` when `t` = 1.
   * - Returns the point midway between `v` and `w` when `t` = 0.5.
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @param {?(number|string|boolean)} [t=null] The interpolant (aka. alpha),
   * any number-coercible value.
   * @returns {Vec2} A new Vector.
   */
  static lerp(v, w, t = null) {
    t = Number(t);
    if (t > 1) t = 1;
    else if (t < 0) t = 0;
    return new Vec2(
      v.#x + (w.#x - v.#x) * t,
      v.#y + (w.#y - v.#y) * t
    );
  }

  /**
   * Returns the negation (aka. opposite) of vector `v`.
   * @param {Vec2} v A vector.
   * @returns {Vec2} A new vector.
   */
  static negate(v) {
    return new Vec2(
      -v.#x,
      -v.#y
    )
  }

  /**
   * Returns a unit vector (i.e.: `magnitude` = 1) from vector `v`.
   * @param {Vec2} v A vector.
   * @returns {Vec2} A new Vector.
   */
  static normalize(v) {
    const m = v.magnitude;
    return new Vec2(
      v.#x / m,
      v.#y / m
    );
  }

  /**
   * Returns a vector that is the orthogonal projection of `v` onto `w`, i.e.:
   * the component of `v` projected on `w` (in direction of `w`).
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @returns {Vec2} The projection vector.
   */
  static project(v, w) {
    const m2 = w.magnitude;
    const f = v.magnitude * cos(atan2(
      v.#x * w.#y - v.#y * w.#x,
      v.#x * w.#x + v.#y * w.#y
    ));
    return new Vec2(
      w.#x / m2 * f,
      w.#y / m2 * f
    );
  }

  /**
   * Returns a random vector uniformly distributed on the circumference of a
   * unit circle. Method by Marsaglia (1972).
   * @returns {Vec2} A new vector.
   */
  static random() {
    const phi = random() * PI * 2;
    return new Vec2(
      cos(phi),
      sin(phi)
    );
  }

  /**
   * Checks whether or not `v` and `w` satisfy the equality definition.
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @returns {boolean} Boolean result.
   */
  static satisfyEquality(v, w) {
    return (
      v.#x === w.#x &&
      v.#y === w.#y
    );
  }

  /**
   * Checks whether or not `v` and `w` satisfy the opposition definition.
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @returns {boolean} Boolean result.
   */
  static satisfyOpposition(v, w) {
    return (
      v.#x === -w.#x &&
      v.#y === -w.#y
    );
  }

  /**
   * Returns the scalar multiplication of `v` by a given scalar `c`.
   * @param {Vec2}
   * @param {?(number|string|boolean)} [c=null] Any number-coercible value.
   * @returns {Vec2} A new vector, the scalar multiplication of `v` by `c`.
   */
  static scale(v, c = null) {
    c = Number(c);
    return new Vec2(
      v.#x * c,
      v.#y * c
    );
  }

  /**
   * Returns the subtraction of `v` minus `w`.
   * @param {Vec2} v A vector.
   * @param {Vec2} w A vector.
   * @returns {Vec2} A new vector.
   */
  static subtract(v, w) {
    return new Vec2(
      v.#x - w.#x,
      v.#y - w.#y
    );
  }

  /**
   * Angle relative the x-axis towards the positive y-axis (counter-clockwise),
   * interval [0, 2PI).
   * @returns {number} Value in radians.
   */
  get angleX() {
    return atan2(
      this.#y,
      this.#x
    ) + (this.#y < 0 ? 2 * PI : 0);
  }

  /**
   * Angle relative the y-axis towards the negative x-axis (counter-clockwise),
   * interval [0, 2PI).
   * @returns {number} Value in radians.
   */
  get angleY() {
    return -atan2(
      this.#x,
      this.#y
    ) + (this.#x > 0 ? 2 * PI : 0);
  }

  /**
   * @returns {number} The `magnitude` of this vector.
   */
  get magnitude() {
    return sqrt(
      this.#x ** 2 +
      this.#y ** 2
    );
  }

  /**
   * @returns {number} The squared `magnitude` of this vector.
   */
  get magnitudeSq() {
    return (
      this.#x ** 2 +
      this.#y ** 2
    );
  }

  /**
   * @returns {number} The `x` component of this vector.
   */
  get x() {
    return this.#x;
  }

  /**
   * Shortcut to get all the components of this vector as an array.
   * @returns {number[]} An array of numbers.
   */
  get xy() {
    return [
      this.#x,
      this.#y
    ];
  }

  /**
   * @returns {number} The `y` component of this vector.
   */
  get y() {
    return this.#y;
  }

  /**
   * Set the angle relative the x-axis towards the positive y-axis
   * (counter-clockwise) to `phi`.
   * @param {?(number|string|boolean)} [phi=null] Angle in radians, any
   * number-coercible value.
   */
  set angleX(phi = null) {
    phi = Number(phi);
    const m = this.magnitude;
    this.#x = m * cos(phi);
    this.#y = m * sin(phi);
  }

  /**
   * Set the angle relative the y-axis towards the negative x-axis
   *  (counter-clockwise) to `phi`.
   * @param {?(number|string|boolean)} [phi=null] Angle in radians, any
   * number-coercible value.
   */
  set angleY(phi = null) {
    phi = Number(phi);
    const m = this.magnitude;
    this.#x = m * -sin(phi);
    this.#y = m * cos(phi);
  }

  /**
   * Set the `magnitude` of this vector to the given value.
   * @param {?(number|string|boolean|undefined)} [m=null] Any number-coercible
   * value.
   */
  set magnitude(m = null) {
    m = Number(m);
    const M = this.magnitude;
    this.#x = this.#x / M * m;
    this.#y = this.#y / M * m;
  }

  /**
   * Set the `x` component of this vector.
   * @param {?(number|string|boolean|undefined)} [x=null] Any number-coercible
   * value.
   */
  set x(x = null) {
    this.#x = Number(x);
  }

  /**
   * Shortcut to set all the components of this vector from an array.
   * @param {(null|number|string|boolean|undefined)[]} xy An array of any
   * number-coercible values.
   */
  set xy(xy) {
    this.x = xy[0];
    this.y = xy[1];
  }

  /**
   * Set the `y` component of this vector.
   * @param {?(number|string|boolean|undefined)} [y=null] Any number-coercible
   * value.
   */
  set y(y = null) {
    this.#y = Number(y);
  }

  /**
   * Adds vector `v` to this vector.
   * @param {Vec2} v A vector.
   * @returns {this} This vector.
   */
  add(v) {
    this.#x += v.#x;
    this.#y += v.#y;
    return this;
  }

  /**
   * Returns the angle between this vector and vector `v`. Interval (-PI, PI].
   * @param {Vec2} v A vector.
   * @returns {number} Value in radians.
   */
  angleBetween(v) {
    return atan2(
      this.#x * v.#y - this.#y * v.#x,
      this.#x * v.#x + this.#y * v.#y
    );
  }

  /**
   * Keeps the `magnitude` of this vector between the given minimum and maximum
   * values (inclusive).
   * @param {?(number|string|boolean)} [max=null] Any number-coercible value.
   * @param {?(number|string|boolean)} [min=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  clamp(min = null, max = null) {
    min = Number(min);
    max = Number(max);
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
    } else if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
    }
    return this;
  }

  /**
   * Returns a new copy of this vector.
   * @returns {Vec2} A new vector.
   */
  clone() {
    return new Vec2(
      this.#x,
      this.#y
    );
  }

  /**
   * Copy each component from vector `v` to this vector.
   * @param {Vec2} v A vector.
   * @returns {this} This vector.
   */
  copy(v) {
    this.#x = v.#x;
    this.#y = v.#y;
    return this;
  }

  /**
   * Computes the distance from this vector to vector `v` with the
   * {@link https://en.wikipedia.org/wiki/Euclidean_distance Euclidean metric}.
   * @param {Vec2} v A vector.
   * @returns {number} Euclidean distance.
   */
  distance(v) {
    return sqrt(
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2
    );
  }

  /**
   * Computes the squared distance from this vector to vector `v` with the
   * Euclidean metric.
   * @param {Vec2} v A vector.
   * @returns {number} Euclidean distance.
   */
  distanceSq(v) {
    return (
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2
    );
  }

  /**
   * The {@link https://en.wikipedia.org/wiki/Dot_product dot product} (aka.
   * scalar product or inner product) measures how much this vector and vector
   * `v` point in the same direction.
   * 
   * - When pointing in the same direction: we get the largest value.
   * - When the angle between is 90 degrees: we get 0.
   * - When pointing in opposite directions: we inverse the largest value.
   * @param {Vec2} v A vector.
   * @returns {number} The dot product.
   */
  dot(v) {
    return (
      this.#x * v.#x +
      this.#y * v.#y
    );
  }

  /**
   * Checks whether or not this vector has any +/-`Infinity` component.
   * @returns {boolean} Boolean result.
   */
  isInfinite() {
    return (
      this.#x === Infinity || this.#x === -Infinity ||
      this.#y === Infinity || this.#y === -Infinity
    );
  }

  /**
   * Checks whether or not this vector has any `NaN` component.
   * @returns {boolean} Boolean result.
   */
  isNaN() {
    return (
      isNaN(this.#x) ||
      isNaN(this.#y)
    );
  }

  /**
   * Checks whether or not this vector has all its components at zero.
   * @returns {boolean} Boolean result.
   */
  isZero() {
    return (
      this.#x === 0 &&
      this.#y === 0
    );
  }

  /**
   * Limits the maximum `magnitude` of this vector to the given value.
   * @param {?(number|string|boolean)} [max=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  limitMax(max = null) {
    max = Number(max);
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
    }
    return this;
  }

  /**
   * Limits the minimum `magnitude` of this vector to the given value.
   * @param {?(number|string|boolean)} [min=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  limitMin(min = null) {
    min = Number(min)
    const m = this.magnitude;
    if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
    }
    return this;
  }

  /**
   * Points this vector in direction of vector `v`.
   * @param {Vec2} v A vector.
   * @returns {this} This vector.
   */
  lookAt(v) {
    const m = this.magnitude;
    const mV = v.magnitude;
    this.#x = v.#x / mV * m;
    this.#y = v.#y / mV * m;
    return this;
  }

  /**
   * Transforms this vector into its negation (aka. opposite).
   * @returns {this} This vector.
   */
  negate() {
    this.#x *= -1;
    this.#y *= -1;
    return this;
  }

  /**
   * Transforms this vector into a unit vector (i.e.: `magnitude` = 1).
   * @returns {this} This vector.
   */
  normalize() {
    const m = this.magnitude;
    this.#x /= m;
    this.#y /= m;
    return this;
  }

  /**
   * Transforms this vector into the orthogonal projection of itself onto `v`,
   * i.e.: the component of this vector projected on `v` (in direction of `v`).
   * @param {Vec2} v A vector.
   * @returns {this} This vector.
   */
  project(v) {
    const mV = v.magnitude;
    const f = this.magnitude * cos(atan2(
      this.#x * v.#y - this.#y * v.#x,
      this.#x * v.#x + this.#y * v.#y
    ));
    this.#x = v.#x / mV * f;
    this.#y = v.#y / mV * f;
    return this;
  }

  /**
   * Randomizes the direction of this vector keeping its `magnitude`.
   * @returns {this} This vector.
   */
  random() {
    const phi = random() * PI * 2;
    const m = this.magnitude;
    this.#x = m * cos(phi);
    this.#y = m * sin(phi);
    return this;
  }

  /**
   * A rotation about the z-axis moving the positive x-axis towards the
   * positive y-axis by `phi`.
   * @param {?(number|string|boolean)} [phi=null] Angle in radians, any
   * number-coercible value.
   * @returns {this} This vector.
   */
  rotateZ(phi = null) {
    phi = Number(phi);
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const x = this.#x;
    this.#x = this.#x * cosPhi - this.#y * sinPhi;
    this.#y = x * sinPhi + this.#y * cosPhi;
    return this;
  }

  /**
   * Checks whether or not this vector and vector `v` satisfy the equality
   * definition.
   * @param {Vec2} v A vector.
   * @returns {boolean} Boolean result.
   */
  satisfyEquality(v) {
    return (
      this.#x === v.#x &&
      this.#y === v.#y
    );
  }

  /**
   * Checks whether or not this vector and vector `v` satisfy the opposition
   * definition.
   * @param {Vec2} v A vector.
   * @returns {boolean} Boolean result.
   */
  satisfyOpposition(v) {
    return (
      this.#x === -v.#x &&
      this.#y === -v.#y
    );
  }

  /**
   * Transforms this vector into the scalar multiplication of itself by a given
   * scalar `c`.
   * @param {?(number|string|boolean)} [c=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  scale(c = null) {
    c = Number(c);
    this.#x *= c;
    this.#y *= c;
    return this;
  }

  /**
   * Subtracts vector `v` from this vector.
   * @param {Vec2} v A vector.
   * @returns {this} This vector.
   */
  subtract(v) {
    this.#x -= v.#x;
    this.#y -= v.#y;
    return this;
  }

  /**
   * Points this vector to its left, a z-axis rotation of 90 degrees (0.5PI).
   * @returns {this} This vector.
   */
  turnLeft() {
    const x = this.#x;
    this.#x = -this.#y;
    this.#y = x;
    return this;
  }

  /**
   * Points this vector to its right, a z-axis rotation of -90 degrees (-0.5PI).
   * @returns {this} This vector.
   */
  turnRight() {
    const x = this.#x;
    this.#x = this.#y;
    this.#y = -x;
    return this;
  }

  /**
   * Transforms this vector into a zero vector (i.e.: `magnitude` = 0).
   * @returns {this} This vector.
   */
  zero() {
    this.#x = 0;
    this.#y = 0;
    return this;
  }
}

/**
 * A 3-dimensional vector class.
 */
class Vec3 {
  #x;
  #y;
  #z;

  /**
   * Creates a 3-dimensional vector pointing to `x`, `y`, and `z`.
   * @param {?(number|string|boolean)} [x=null] Any number-coercible value.
   * @param {?(number|string|boolean)} [y=null] Any number-coercible value.
   * @param {?(number|string|boolean)} [z=null] Any number-coercible value.
   */
  constructor(x = null, y = null, z = null) {
    this.#x = Number(x);
    this.#y = Number(y);
    this.#z = Number(z);
  }

  /**
   * Returns the addition of `v` plus `w`.
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {Vec3} A new vector.
   */
  static add(v, w) {
    return new Vec3(
      v.#x + w.#x,
      v.#y + w.#y,
      v.#z + w.#z
    );
  }

  /**
   * Returns the angle between `v` and `w`. Interval [0, PI].
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {number} Value in radians.
   */
  static angleBetween(v, w) {
    return acos((
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z
    ) / (v.magnitude * w.magnitude));
  }

  /**
   * The {@link https://en.wikipedia.org/wiki/Cross_product cross product} (aka.
   * vector product) of `v` cross `w`, which is perpendicular to both of them
   * and whose magnitude measures the area they span.
   * 
   * - When pointing in either the same or opposite directions: we get 0.
   * - When the angle between is 90 degrees: we get the largest value.
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {Vec3} The cross product.
   */
  static cross(v, w) {
    return new Vec3(
      v.#y * w.#z - v.#z * w.#y,
      v.#z * w.#x - v.#x * w.#z,
      v.#x * w.#y - v.#y * w.#x
    );
  }

  /**
   * Computes the distance from `v` to `w` with the
   * {@link https://en.wikipedia.org/wiki/Euclidean_distance Euclidean metric}.
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {number} Euclidean distance.
   */
  static distance(v, w) {
    return sqrt(
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2 +
      (v.#z - w.#z) ** 2
    );
  }

  /**
   * Computes the distance from `v` to `w` with the 
   * {@link https://en.wikipedia.org/wiki/Chebyshev_distance Chebyshev metric}.
   * 
   * "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {number} Chebyshev distance.
   */
  static distanceChebyshev(v, w) {
    const absX = abs(v.#x - w.#x);
    const absY = abs(v.#y - w.#y);
    const absZ = abs(v.#z - w.#z);
    return absX >= absY && absX >= absZ ?
      absX :
      absY >= absZ ?
        absY :
        absZ;
  }

  /**
   * Computes the distance from `v` to `w` with the
   * {@link https://en.wikipedia.org/wiki/Taxicab_geometry Manhattan metric}
   * (aka. taxicab metric). Given two points, it is the sum of the absolute
   * differences of their components.
   * 
   * "Inspired by the grid-like organization of Manhattan, this is distance to
   * the nearest points when you can only travel around the boundaries." I.e.:
   * Only horizontal, vertical and diagonal (45 degrees) movements.
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {number} Manhattan distance.
   */
  static distanceManhattan(v, w) {
    return (
      abs(v.#x - w.#x) +
      abs(v.#y - w.#y) +
      abs(v.#z - w.#z)
    );
  }

  /**
   * Computes the distance from `v` to `w` with the Minkowski metric.
   * 
   * Said to be a generalization of the Euclidean distance, Manhattan
   * distance, and Chebyshev distance, the
   * {@link https://en.wikipedia.org/wiki/Minkowski_distance Minkowski metric}
   * is a distance of order `p` which can be equivalent to:
   * 
   * - Manhattan distance when `p` = 1.
   * - Euclidean distance when `p` = 2.
   * - Chebyshev distance when `p` = Infinite.
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @param {(number|string|true)} [p=1] Any number-coercible value greater than 0.
   * @returns {number} Minkowski distance.
   */
  static distanceMinkowski(v, w, p = 1) {
    p = Number(p);
    return (
      abs(v.#x - w.#x) ** p +
      abs(v.#y - w.#y) ** p +
      abs(v.#z - w.#z) ** p
    ) ** (1 / p);
  }

  /**
   * Computes the squared distance from `v` to `w` with the Euclidean metric.
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {number} Euclidean squared distance.
   */
  static distanceSq(v, w) {
    return (
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2 +
      (v.#z - w.#z) ** 2
    );
  }

  /**
   * The {@link https://en.wikipedia.org/wiki/Dot_product dot product} (aka.
   * scalar product or inner product) measures how much `v` and `w` point in the
   * same direction.
   * 
   * - When pointing in the same direction: we get the largest value.
   * - When the angle between is 90 degrees: we get 0.
   * - When pointing in opposite directions: we inverse the largest value.
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {number} The dot product.
   */
  static dot(v, w) {
    return (
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z
    );
  }

  /**
   * Returns a new vector created from cylindrical coordinates (r, φ, z).
   * 
   * - r (radius): The `magnitude`.
   * - φ (phi): The polar angle to be relative to the positive x-axis towards
   * the positive y-axis.
   * @param {?(number|string|boolean)} [r=null] Radius, any number-coercible
   * value.
   * @param {?(number|string|boolean)} [phi=null] Polar angle relative to the
   * positive x-axis (counter-clockwise, towards the positive y) in radians, any number-coercible value.
   * @param {?(number|string|boolean)} [z=null] Depth, any number-coercible
   * value.
   * @returns {Vec3} A new vector.
   */
  static fromCylindricalCoords(r, phi, z) {
    return new Vec3(
      r * cos(phi),
      r * sin(phi),
      z
    );
  }

  /**
   * Returns a new vector created from spherical coordinates (r, θ, φ).
   * 
   * - r (radius): The `magnitude`.
   * - θ (theta): The azimuthal angle to be relative to the positive z-axis
   * towards the xy-plane.
   * - φ (phi): The polar angle to be relative to the positive x-axis towards
   * the positive y-axis.
   * @param {?(number|string|boolean)} [r=null] Radius, any number-coercible
   * value.
   * @param {?(number|string|boolean)} [theta=null] Azimuthal angle in radians,
   * any number-coercible value.
   * @param {?(number|string|boolean)} [phi=null] Polar angle in radians, any
   * number-coercible value.
   * @returns {Vec3} A new vector.
   */
  static fromSphericalCoords(r, theta, phi) {
    return new Vec3(
      r * sin(theta) * cos(phi),
      r * sin(theta) * sin(phi),
      r * cos(theta)
    );
  }

  /**
   * Checks whether or not vector `v` has any +/-`Infinity` component.
   * @param {Vec3} v A vector.
   * @returns {boolean} Boolean result.
   */
  static isInfinite(v) {
    return (
      v.#x === Infinity || v.#x === -Infinity ||
      v.#y === Infinity || v.#y === -Infinity ||
      v.#z === Infinity || v.#z === -Infinity
    );
  }

  /**
   * Checks whether or not vector `v` has any `NaN` component.
   * @param {Vec3} v A vector.
   * @returns {boolean} Boolean result.
   */
  static isNaN(v) {
    return (
      isNaN(v.#x) ||
      isNaN(v.#y) ||
      isNaN(v.#z)
    );
  }

  /**
   * Checks whether or not vector `v` has all its components at zero.
   * @param {Vec3} v A vector.
   * @returns {boolean} Boolean result.
   */
  static isZero(v) {
    return (
      v.#x === 0 &&
      v.#y === 0 &&
      v.#z === 0
    );
  }

  /**
   * Linearly interpolates between `v` and `w`. Parameter `t` is clamped to the
   * range of [0, 1].
   * 
   * - Returns `v` when `t` = 0.
   * - Returns `w` when `t` = 1.
   * - Returns the point midway between `v` and `w` when `t` = 0.5.
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @param {?(number|string|boolean)} [t=null] The interpolant (aka. alpha),
   * any number-coercible value.
   * @returns {Vec3} A new Vector.
   */
  static lerp(v, w, t = null) {
    t = Number(t);
    if (t > 1) t = 1;
    else if (t < 0) t = 0;
    return new Vec3(
      v.#x + (w.#x - v.#x) * t,
      v.#y + (w.#y - v.#y) * t,
      v.#z + (w.#z - v.#z) * t
    );
  }

  /**
   * Returns the negation (aka. opposite) of vector `v`.
   * @param {Vec3} v A vector.
   * @returns {Vec3} A new vector.
   */
  static negate(v) {
    return new Vec3(
      -v.#x,
      -v.#y,
      -v.#z
    )
  }

  /**
   * Returns a unit vector (i.e.: `magnitude` = 1) from vector `v`.
   * @param {Vec3} v A vector.
   * @returns {Vec3} A new Vector.
   */
  static normalize(v) {
    const m = v.magnitude;
    return new Vec3(
      v.#x / m,
      v.#y / m,
      v.#z / m
    );
  }

  /**
   * Returns a vector that is the orthogonal projection of `v` onto `w`, i.e.:
   * the component of `v` projected on `w` (in direction of `w`).
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {Vec3} The projection vector.
   */
  static project(v, w) {
    const m1 = v.magnitude;
    const m2 = w.magnitude;
    const f = m1 * cos(acos((
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z
    ) / (m1 * m2)));
    return new Vec3(
      w.#x / m2 * f,
      w.#y / m2 * f,
      w.#z / m2 * f
    );
  }

  /**
   * Returns a random vector uniformly distributed on the surface of a unit
   * sphere. Method by Marsaglia (1972).
   * @returns {Vec3} A new vector.
   */
  static random() {
    let x1;
    let x2;
    do {
      x1 = random() * 2 - 1;
      x2 = random() * 2 - 1;
    } while (x1 ** 2 + x2 ** 2 >= 1);
    const f = sqrt((1 - x1 ** 2 - x2 ** 2));
    return new Vec3(
      2 * x1 * f,
      2 * x2 * f,
      1 - 2 * (x1 ** 2 + x2 ** 2)
    );
  }

  /**
   * Checks whether or not `v` and `w` satisfy the equality definition.
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {boolean} Boolean result.
   */
  static satisfyEquality(v, w) {
    return (
      v.#x === w.#x &&
      v.#y === w.#y &&
      v.#z === w.#z
    );
  }

  /**
   * Checks whether or not `v` and `w` satisfy the opposition definition.
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {boolean} Boolean result.
   */
  static satisfyOpposition(v, w) {
    return (
      v.#x === -w.#x &&
      v.#y === -w.#y &&
      v.#z === -w.#z
    );
  }

  /**
   * Returns the scalar multiplication of `v` by a given scalar `c`.
   * @param {Vec3}
   * @param {?(number|string|boolean)} [c=null] Any number-coercible value.
   * @returns {Vec3} A new vector, the scalar multiplication of `v` by `c`.
   */
  static scale(v, c = null) {
    c = Number(c);
    return new Vec3(
      v.#x * c,
      v.#y * c,
      v.#z * c
    );
  }

  /**
   * Returns the subtraction of `v` minus `w`.
   * @param {Vec3} v A vector.
   * @param {Vec3} w A vector.
   * @returns {Vec3} A new vector.
   */
  static subtract(v, w) {
    return new Vec3(
      v.#x - w.#x,
      v.#y - w.#y,
      v.#z - w.#z
    );
  }

  /**
   * Angle relative to the positive x-axis towards the point defined by
   * (y, z). Interval [0, PI].
   * @returns {number} Value in radians.
   */
  get angleX() {
    return atan2(
      sqrt(
        this.#y ** 2 +
        this.#z ** 2
      ),
      this.#x
    );
  }

  /**
   * Angle relative to the positive y-axis towards the point defined by
   * (z, x). Interval [0, PI].
   * @returns {number} Value in radians.
   */
  get angleY() {
    return atan2(
      sqrt(
        this.#z ** 2 +
        this.#x ** 2
      ),
      this.#y
    );
  }

  /**
   * Angle relative to the positive z-axis towards the point defined by
   * (x, y). Interval [0, PI].
   * @returns {number} Value in radians.
   */
  get angleZ() {
    return atan2(
      sqrt(
        this.#x ** 2 +
        this.#y ** 2
      ),
      this.#z
    );
  }

  /**
   * Alias for the `z` component of this vector.
   * @returns {number} The `z` component of this vector.
   */
  get b() {
    return this.#z;
  }

  /**
   * Alias for the `y` component of this vector.
   * @returns {number} The `y` component of this vector.
   */
  get g() {
    return this.#y;
  }

  /**
   * @returns {number} The `magnitude` of this vector.
   */
  get magnitude() {
    return sqrt(
      this.#x ** 2 +
      this.#y ** 2 +
      this.#z ** 2
    );
  }

  /**
   * @returns {number} The squared `magnitude` of this vector.
   */
  get magnitudeSq() {
    return (
      this.#x ** 2 +
      this.#y ** 2 +
      this.#z ** 2
    );
  }

  /**
   * Alias for the `x` component of this vector.
   * @returns {number} The `x` component of this vector.
   */
  get r() {
    return this.#x;
  }

  /**
   * Alias to get all the components of this vector as an array.
   * @returns {number[]} An array of numbers.
   */
  get rgb() {
    return [
      this.#x,
      this.#y,
      this.#z
    ];
  }

  /**
   * @returns {number} The `x` component of this vector.
   */
  get x() {
    return this.#x;
  }

  /**
   * Shortcut to get all the components of this vector as an array.
   * @returns {number[]} An array of numbers.
   */
  get xyz() {
    return [
      this.#x,
      this.#y,
      this.#z
    ];
  }

  /**
   * @returns {number} The `y` component of this vector.
   */
  get y() {
    return this.#y;
  }

  /**
   * @returns {number} The `z` component of this vector.
   */
  get z() {
    return this.#z;
  }

  /**
   * Alias to set the `z` component of this vector.
   * @param {?(number|string|boolean|undefined)} [b=null] Any number-coercible
   * value.
   */
  set b(b = null) {
    this.#z = Number(b);
  }

  /**
   * Alias to set the `y` component of this vector.
   * @param {?(number|string|boolean|undefined)} [g=null] Any number-coercible
   * value.
   */
  set g(g = null) {
    this.#y = Number(g);
  }

  /**
   * Set the `magnitude` of this vector to the given value.
   * @param {?(number|string|boolean|undefined)} [m=null] Any number-coercible
   * value.
   */
  set magnitude(m = null) {
    m = Number(m);
    const M = this.magnitude;
    this.#x = this.#x / M * m;
    this.#y = this.#y / M * m;
    this.#z = this.#z / M * m;
  }

  /**
   * Alias to set the `x` component of this vector.
   * @param {?(number|string|boolean|undefined)} [r=null] Any number-coercible
   * value.
   */
  set r(r = null) {
    this.#x = Number(r);
  }

  /**
   * Alias to set all the components of this vector from an array.
   * @param {(null|number|string|boolean|undefined)[]} rgb An array of any
   * number-coercible values.
   */
  set rgb(rgb) {
    this.x = rgb[0];
    this.y = rgb[1];
    this.z = rgb[2];
  }

  /**
   * Set the `x` component of this vector.
   * @param {?(number|string|boolean|undefined)} [x=null] Any number-coercible
   * value.
   */
  set x(x = null) {
    this.#x = Number(x);
  }

  /**
   * Shortcut to set all the components of this vector from an array.
   * @param {(null|number|string|boolean|undefined)[]} xyz An array of any
   * number-coercible values.
   */
  set xyz(xyz) {
    this.x = xyz[0];
    this.y = xyz[1];
    this.z = xyz[2];
  }

  /**
   * Set the `y` component of this vector.
   * @param {?(number|string|boolean|undefined)} [y=null] Any number-coercible
   * value.
   */
  set y(y = null) {
    this.#y = Number(y);
  }

  /**
   * Set the `z` component of this vector.
   * @param {?(number|string|boolean|undefined)} [z=null] Any number-coercible
   * value.
   */
  set z(z = null) {
    this.#z = Number(z);
  }

  /**
   * Adds vector `v` to this vector.
   * @param {Vec3} v A vector.
   * @returns {this} This vector.
   */
  add(v) {
    this.#x += v.#x;
    this.#y += v.#y;
    this.#z += v.#z;
    return this;
  }

  /**
   * Returns the angle between this vector and vector `v`. Interval [0, PI].
   * @param {Vec3} v A vector.
   * @returns {number} Value in radians.
   */
  angleBetween(v) {
    return acos((
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z
    ) / (this.magnitude * v.magnitude));
  }

  /**
   * Keeps the `magnitude` of this vector between the given minimum and maximum
   * values (inclusive).
   * @param {?(number|string|boolean)} [max=null] Any number-coercible value.
   * @param {?(number|string|boolean)} [min=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  clamp(min = null, max = null) {
    min = Number(min);
    max = Number(max);
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
      this.#z = this.#z / m * max;
    } else if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
      this.#z = this.#z / m * min;
    }
    return this;
  }

  /**
   * Returns a new copy of this vector.
   * @returns {Vec3} A new vector.
   */
  clone() {
    return new Vec3(
      this.#x,
      this.#y,
      this.#z
    );
  }

  /**
   * Copy each component from vector `v` to this vector.
   * @param {Vec3} v A vector.
   * @returns {this} This vector.
   */
  copy(v) {
    this.#x = v.#x;
    this.#y = v.#y;
    this.#z = v.#z;
    return this;
  }

  /**
   * Transforms this vector into the
   * {@link https://en.wikipedia.org/wiki/Cross_product cross product} (aka.
   * vector product) of itself cross `v`, which is perpendicular to both of them
   * and whose magnitude measures the area they span.
   * 
   * - When pointing in either the same or opposite directions: we get 0.
   * - When the angle between is 90 degrees: we get the largest value.
   * @param {Vec3} v A vector.
   * @returns {this} This vector.
   */
  cross(v) {
    const x = this.#x;
    const y = this.#y;
    this.#x = this.#y * v.#z - this.#z * v.#y;
    this.#y = this.#z * v.#x - x * v.#z;
    this.#z = x * v.#y - y * v.#x;
    return this;
  }

  /**
   * Computes the distance from this vector to vector `v` with the
   * {@link https://en.wikipedia.org/wiki/Euclidean_distance Euclidean metric}.
   * @param {Vec3} v A vector.
   * @returns {number} Euclidean distance.
   */
  distance(v) {
    return sqrt(
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2 +
      (this.#z - v.#z) ** 2
    );
  }

  /**
   * Computes the squared distance from this vector to vector `v` with the
   * Euclidean metric.
   * @param {Vec3} v A vector.
   * @returns {number} Euclidean distance.
   */
  distanceSq(v) {
    return (
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2 +
      (this.#z - v.#z) ** 2
    );
  }

  /**
   * The {@link https://en.wikipedia.org/wiki/Dot_product dot product} (aka.
   * scalar product or inner product) measures how much this vector and vector
   * `v` point in the same direction.
   * 
   * - When pointing in the same direction: we get the largest value.
   * - When the angle between is 90 degrees: we get 0.
   * - When pointing in opposite directions: we inverse the largest value.
   * @param {Vec3} v A vector.
   * @returns {number} The dot product.
   */
  dot(v) {
    return (
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z
    );
  }

  /**
   * Checks whether or not this vector has any +/-`Infinity` component.
   * @returns {boolean} Boolean result.
   */
  isInfinite() {
    return (
      this.#x === Infinity || this.#x === -Infinity ||
      this.#y === Infinity || this.#y === -Infinity ||
      this.#z === Infinity || this.#z === -Infinity
    );
  }

  /**
   * Checks whether or not this vector has any `NaN` component.
   * @returns {boolean} Boolean result.
   */
  isNaN() {
    return (
      isNaN(this.#x) ||
      isNaN(this.#y) ||
      isNaN(this.#z)
    );
  }

  /**
   * Checks whether or not this vector has all its components at zero.
   * @returns {boolean} Boolean result.
   */
  isZero() {
    return (
      this.#x === 0 &&
      this.#y === 0 &&
      this.#z === 0
    );
  }

  /**
   * Limits the maximum `magnitude` of this vector to the given value.
   * @param {?(number|string|boolean)} [max=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  limitMax(max = null) {
    max = Number(max);
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
      this.#z = this.#z / m * max;
    }
    return this;
  }

  /**
   * Limits the minimum `magnitude` of this vector to the given value.
   * @param {?(number|string|boolean)} [min=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  limitMin(min = null) {
    min = Number(min);
    const m = this.magnitude;
    if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
      this.#z = this.#z / m * min;
    }
    return this;
  }

  /**
   * Points this vector in direction of vector `v`.
   * @param {Vec3} v A vector.
   * @returns {this} This vector.
   */
  lookAt(v) {
    const m = this.magnitude;
    const mV = v.magnitude;
    this.#x = v.#x / mV * m;
    this.#y = v.#y / mV * m;
    this.#z = v.#z / mV * m;
    return this;
  }

  /**
   * Transforms this vector into its negation (aka. opposite).
   * @returns {this} This vector.
   */
  negate() {
    this.#x *= -1;
    this.#y *= -1;
    this.#z *= -1;
    return this;
  }

  /**
   * Transforms this vector into a unit vector (i.e.: `magnitude` = 1).
   * @returns {this} This vector.
   */
  normalize() {
    const m = this.magnitude;
    this.#x /= m;
    this.#y /= m;
    this.#z /= m;
    return this;
  }

  /**
   * Transforms this vector into the orthogonal projection of itself onto `v`,
   * i.e.: the component of this vector projected on `v` (in direction of `v`).
   * @param {Vec3} v A vector.
   * @returns {this} This vector.
   */
  project(v) {
    const m = this.magnitude;
    const mV = v.magnitude;
    const f = m * cos(acos((
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z
    ) / (m * mV)));
    this.#x = v.#x / mV * f;
    this.#y = v.#y / mV * f;
    this.#z = v.#z / mV * f;
    return this;
  }

  /**
   * Randomizes the direction of this vector keeping its `magnitude`.
   * @returns {this} This vector.
   */
  random() {
    let x1;
    let x2;
    do {
      x1 = random() * 2 - 1;
      x2 = random() * 2 - 1;
    } while (x1 ** 2 + x2 ** 2 >= 1);
    const f = sqrt((1 - x1 ** 2 - x2 ** 2));
    const m = this.magnitude;
    this.#x = m * 2 * x1 * f;
    this.#y = m * 2 * x2 * f;
    this.#z = m * (1 - 2 * (x1 ** 2 + x2 ** 2));
    return this;
  }

  /**
   * A rotation about the x-axis moving the positive y-axis towards the
   * positive z-axis by `phi`.
   * @param {?(number|string|boolean)} [phi=null] Angle in radians, any
   * number-coercible value.
   * @returns {this} This vector.
   */
  rotateX(phi = null) {
    phi = Number(phi);
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const y = this.#y;
    this.#y = this.#y * cosPhi - this.#z * sinPhi;
    this.#z = y * sinPhi + this.#z * cosPhi;
    return this;
  }

  /**
   * A rotation about the y-axis moving the positive x-axis towards the
   * positive z-axis by `phi`.
   * @param {?(number|string|boolean)} [phi=null] Angle in radians, any
   * number-coercible value.
   * @returns {this} This vector.
   */
  rotateY(phi = null) {
    phi = Number(phi);
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const x = this.#x;
    this.#x = this.#x * cosPhi + this.#z * sinPhi;
    this.#z = x * sinPhi + this.#z * cosPhi;
    return this;
  }

  /**
   * A rotation about the z-axis moving the positive x-axis towards the
   * positive y-axis by `phi`.
   * @param {?(number|string|boolean)} [phi=null] Angle in radians, any
   * number-coercible value.
   * @returns {this} This vector.
   */
  rotateZ(phi = null) {
    phi = Number(phi);
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const x = this.#x;
    this.#x = this.#x * cosPhi - this.#y * sinPhi;
    this.#y = x * sinPhi + this.#y * cosPhi;
    return this;
  }

  /**
   * Checks whether or not this vector and vector `v` satisfy the equality
   * definition.
   * @param {Vec3} v A vector.
   * @returns {boolean} Boolean result.
   */
  satisfyEquality(v) {
    return (
      this.#x === v.#x &&
      this.#y === v.#y &&
      this.#z === v.#z
    );
  }

  /**
   * Checks whether or not this vector and vector `v` satisfy the opposition
   * definition.
   * @param {Vec3} v A vector.
   * @returns {boolean} Boolean result.
   */
  satisfyOpposition(v) {
    return (
      this.#x === -v.#x &&
      this.#y === -v.#y &&
      this.#z === -v.#z
    );
  }

  /**
   * Transforms this vector into the scalar multiplication of itself by a given
   * scalar `c`.
   * @param {?(number|string|boolean)} [c=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  scale(c = null) {
    c = Number(c);
    this.#x *= c;
    this.#y *= c;
    this.#z *= c;
    return this;
  }

  /**
   * Subtracts vector `v` from this vector.
   * @param {Vec3} v A vector.
   * @returns {this} This vector.
   */
  subtract(v) {
    this.#x -= v.#x;
    this.#y -= v.#y;
    this.#z -= v.#z;
    return this;
  }

  /**
   * Transforms this vector into a zero vector (i.e.: `magnitude` = 0).
   * @returns {this} This vector.
   */
  zero() {
    this.#x = 0;
    this.#y = 0;
    this.#z = 0;
    return this;
  }
}

/**
 * A 4-dimensional vector class.
 */
class Vec4 {
  #x;
  #y;
  #z;
  #w;

  /**
   * Creates a 4-dimensional vector pointing to `x`, `y`, `z`, and `w`.
   * @param {?(number|string|boolean)} [x=null] Any number-coercible value.
   * @param {?(number|string|boolean)} [y=null] Any number-coercible value.
   * @param {?(number|string|boolean)} [z=null] Any number-coercible value.
   * @param {?(number|string|boolean)} [w=null] Any number-coercible value.
   */
  constructor(x = null, y = null, z = null, w = null) {
    this.#x = Number(x);
    this.#y = Number(y);
    this.#z = Number(z);
    this.#w = Number(w);
  }

  /**
   * Returns the addition of `v` plus `w`.
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @returns {Vec4} A new vector.
   */
  static add(v, w) {
    return new Vec4(
      v.#x + w.#x,
      v.#y + w.#y,
      v.#z + w.#z,
      v.#w + w.#w
    );
  }

  /**
   * Returns the angle between `v` and `w`. Interval [0, PI].
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @returns {number} Value in radians.
   */
  static angleBetween(v, w) {
    return acos((
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z +
      v.#w * w.#w
    ) / (v.magnitude * w.magnitude));
  }

  /**
   * Computes the distance from `v` to `w` with the
   * {@link https://en.wikipedia.org/wiki/Euclidean_distance Euclidean metric}.
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @returns {number} Euclidean distance.
   */
  static distance(v, w) {
    return sqrt(
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2 +
      (v.#z - w.#z) ** 2 +
      (v.#w - w.#w) ** 2
    );
  }

  /**
   * Computes the distance from `v` to `w` with the 
   * {@link https://en.wikipedia.org/wiki/Chebyshev_distance Chebyshev metric}.
   * 
   * "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @returns {number} Chebyshev distance.
   */
  static distanceChebyshev(v, w) {
    const absX = abs(v.#x - w.#x);
    const absY = abs(v.#y - w.#y);
    const absZ = abs(v.#z - w.#z);
    const absW = abs(v.#w - w.#w);
    return absX >= absY && absX >= absZ && absX >= absW ?
      absX :
      absY >= absZ && absY >= absW ?
        absY :
        absZ >= absW ?
          absZ :
          absW;
  }

  /**
   * Computes the distance from `v` to `w` with the
   * {@link https://en.wikipedia.org/wiki/Taxicab_geometry Manhattan metric}
   * (aka. taxicab metric). Given two points, it is the sum of the absolute
   * differences of their components.
   * 
   * "Inspired by the grid-like organization of Manhattan, this is distance to
   * the nearest points when you can only travel around the boundaries." I.e.:
   * Only horizontal, vertical and diagonal (45 degrees) movements.
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @returns {number} Manhattan distance.
   */
  static distanceManhattan(v, w) {
    return (
      abs(v.#x - w.#x) +
      abs(v.#y - w.#y) +
      abs(v.#z - w.#z) +
      abs(v.#w - w.#w)
    );
  }

  /**
   * Computes the distance from `v` to `w` with the Minkowski metric.
   * 
   * Said to be a generalization of the Euclidean distance, Manhattan
   * distance, and Chebyshev distance, the
   * {@link https://en.wikipedia.org/wiki/Minkowski_distance Minkowski metric}
   * is a distance of order `p` which can be equivalent to:
   * 
   * - Manhattan distance when `p` = 1.
   * - Euclidean distance when `p` = 2.
   * - Chebyshev distance when `p` = Infinite.
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @param {(number|string|true)} [p=1] Any number-coercible value greater than 0.
   * @returns {number} Minkowski distance.
   */
  static distanceMinkowski(v, w, p = 1) {
    p = Number(p);
    return (
      abs(v.#x - w.#x) ** p +
      abs(v.#y - w.#y) ** p +
      abs(v.#z - w.#z) ** p +
      abs(v.#w - w.#w) ** p
    ) ** (1 / p);
  }

  /**
   * Computes the squared distance from `v` to `w` with the Euclidean metric.
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @returns {number} Euclidean squared distance.
   */
  static distanceSq(v, w) {
    return (
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2 +
      (v.#z - w.#z) ** 2 +
      (v.#w - w.#w) ** 2
    );
  }

  /**
   * The {@link https://en.wikipedia.org/wiki/Dot_product dot product} (aka.
   * scalar product or inner product) measures how much `v` and `w` point in the
   * same direction.
   * 
   * - When pointing in the same direction: we get the largest value.
   * - When the angle between is 90 degrees: we get 0.
   * - When pointing in opposite directions: we inverse the largest value.
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @returns {number} The dot product.
   */
  static dot(v, w) {
    return (
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z +
      v.#w * w.#w
    );
  }

  /**
   * Checks whether or not vector `v` has any +/-`Infinity` component.
   * @param {Vec4} v A vector.
   * @returns {boolean} Boolean result.
   */
  static isInfinite(v) {
    return (
      v.#x === Infinity || v.#x === -Infinity ||
      v.#y === Infinity || v.#y === -Infinity ||
      v.#z === Infinity || v.#z === -Infinity ||
      v.#w === Infinity || v.#w === -Infinity
    );
  }

  /**
   * Checks whether or not vector `v` has any `NaN` component.
   * @param {Vec4} v A vector.
   * @returns {boolean} Boolean result.
   */
  static isNaN(v) {
    return (
      isNaN(v.#x) ||
      isNaN(v.#y) ||
      isNaN(v.#z) ||
      isNaN(v.#w)
    );
  }

  /**
   * Checks whether or not vector `v` has all its components at zero.
   * @param {Vec4} v A vector.
   * @returns {boolean} Boolean result.
   */
  static isZero(v) {
    return (
      v.#x === 0 &&
      v.#y === 0 &&
      v.#z === 0 &&
      v.#w === 0
    );
  }

  /**
   * Linearly interpolates between `v` and `w`. Parameter `t` is clamped to the
   * range of [0, 1].
   * 
   * - Returns `v` when `t` = 0.
   * - Returns `w` when `t` = 1.
   * - Returns the point midway between `v` and `w` when `t` = 0.5.
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @param {?number|string|boolean} [t=null] The interpolant (aka. alpha),
   * any number-coercible value.
   * @returns {Vec4} A new Vector.
   */
  static lerp(v, w, t = null) {
    t = Number(t);
    if (t > 1) t = 1;
    else if (t < 0) t = 0;
    return new Vec4(
      v.#x + (w.#x - v.#x) * t,
      v.#y + (w.#y - v.#y) * t,
      v.#z + (w.#z - v.#z) * t,
      v.#w + (w.#w - v.#w) * t
    );
  }

  /**
   * Returns the negation (aka. opposite) of vector `v`.
   * @param {Vec4} v A vector.
   * @returns {Vec4} A new vector.
   */
  static negate(v) {
    return new Vec4(
      -v.#x,
      -v.#y,
      -v.#z,
      -v.#w
    )
  }

  /**
   * Returns a unit vector (i.e.: `magnitude` = 1) from vector `v`.
   * @param {Vec4} v A vector.
   * @returns {Vec4} A new Vector.
   */
  static normalize(v) {
    const m = v.magnitude;
    return new Vec4(
      v.#x / m,
      v.#y / m,
      v.#z / m,
      v.#w / m
    );
  }

  /**
   * Returns a vector that is the orthogonal projection of `v` onto `w`, i.e.:
   * the component of `v` projected on `w` (in direction of `w`).
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @returns {(Vec4)} The projection vector.
   */
  static project(v, w) {
    const m1 = v.magnitude;
    const m2 = w.magnitude;
    const f = m1 * cos(acos((
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z +
      v.#w * w.#w
    ) / (m1 * m2)));
    return new Vec4(
      w.#x / m2 * f,
      w.#y / m2 * f,
      w.#z / m2 * f,
      w.#w / m2 * f
    );
  }

  /**
   * Returns a random vector uniformly distributed on the surface of a 4-sphere.
   * Method by Marsaglia (1972).
   * @returns {Vec4} A new vector.
   */
  static random() {
    let x1;
    let x2;
    let x3;
    let x4;
    do {
      x1 = random() * 2 - 1;
      x2 = random() * 2 - 1;
      x3 = random() * 2 - 1;
      x4 = random() * 2 - 1;
    } while (x1 ** 2 + x2 ** 2 >= 1 || x3 ** 2 + x4 ** 2 >= 1);
    const f = sqrt((1 - x1 ** 2 - x2 ** 2) / (x3 ** 2 + x4 ** 2));
    return new Vec4(
      x1,
      x2,
      x3 * f,
      x4 * f
    );
  }

  /**
   * Checks whether or not `v` and `w` satisfy the equality definition.
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @returns {boolean} Boolean result.
   */
  static satisfyEquality(v, w) {
    return (
      v.#x === w.#x &&
      v.#y === w.#y &&
      v.#z === w.#z &&
      v.#w === w.#w
    );
  }

  /**
   * Checks whether or not `v` and `w` satisfy the opposition definition.
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @returns {boolean} Boolean result.
   */
  static satisfyOpposition(v, w) {
    return (
      v.#x === -w.#x &&
      v.#y === -w.#y &&
      v.#z === -w.#z &&
      v.#w === -w.#w
    );
  }

  /**
   * Returns the scalar multiplication of `v` by a given scalar `c`.
   * @param {Vec4}
   * @param {?(number|string|boolean)} [c=null] Any number-coercible value.
   * @returns {Vec4} A new vector, the scalar multiplication of `v` by `c`.
   */
  static scale(v, c = null) {
    c = Number(c);
    return new Vec4(
      v.#x * c,
      v.#y * c,
      v.#z * c,
      v.#w * c
    );
  }

  /**
   * Returns the subtraction of `v` minus `w`.
   * @param {Vec4} v A vector.
   * @param {Vec4} w A vector.
   * @returns {Vec4} A new vector.
   */
  static subtract(v, w) {
    return new Vec4(
      v.#x - w.#x,
      v.#y - w.#y,
      v.#z - w.#z,
      v.#w - w.#w
    );
  }

  /**
   * Alias for the `w` component of this vector.
   * @returns {number} The w component of this vector.
   */
  get a() {
    return this.#w;
  }

  /**
   * Angle relative to the positive w-axis towards the point defined by
   * (x, y, z). Interval [0, PI].
   * @returns {number} Value in radians.
   */
  get angleW() {
    return atan2(
      sqrt(
        this.#x ** 2 +
        this.#y ** 2 +
        this.#z ** 2
      ),
      this.#w
    );
  }

  /**
   * Angle relative to the positive x-axis towards the point defined by
   * (y, z, w). Interval [0, PI].
   * @returns {number} Value in radians.
   */
  get angleX() {
    return atan2(
      sqrt(
        this.#y ** 2 +
        this.#z ** 2 +
        this.#w ** 2
      ),
      this.#x
    );
  }

  /**
   * Angle relative to the positive y-axis towards the point defined by
   * (z, w, x). Interval [0, PI].
   * @returns {number} Value in radians.
   */
  get angleY() {
    return atan2(
      sqrt(
        this.#z ** 2 +
        this.#w ** 2 +
        this.#x ** 2
      ),
      this.#y
    );
  }

  /**
   * Angle relative to the positive z-axis towards the point defined by
   * (w, x, y). Interval [0, PI].
   * @returns {number} Value in radians.
   */
  get angleZ() {
    return atan2(
      sqrt(
        this.#w ** 2 +
        this.#x ** 2 +
        this.#y ** 2
      ),
      this.#z
    );
  }

  /**
   * Alias for the `z` component of this vector.
   * @returns {number} The `z` component of this vector.
   */
  get b() {
    return this.#z;
  }

  /**
   * Alias for the `y` component of this vector.
   * @returns {number} The `y` component of this vector.
   */
  get g() {
    return this.#y;
  }

  /**
   * @returns {number} The `magnitude` of this vector.
   */
  get magnitude() {
    return sqrt(
      this.#x ** 2 +
      this.#y ** 2 +
      this.#z ** 2 +
      this.#w ** 2
    );
  }

  /**
   * @returns {number} The squared `magnitude` of this vector.
   */
  get magnitudeSq() {
    return (
      this.#x ** 2 +
      this.#y ** 2 +
      this.#z ** 2 +
      this.#w ** 2
    );
  }

  /**
   * Alias for the `X` component of this vector.
   * @returns {number} The `x` component of this vector.
   */
  get r() {
    return this.#x;
  }

  /**
   * Alias to get all the components of this vector as an array.
   * @returns {number[]} An array of numbers.
   */
  get rgba() {
    return [
      this.#x,
      this.#y,
      this.#z,
      this.#w
    ];
  }

  /**
   * @returns {number} The `w` component of this vector.
   */
  get w() {
    return this.#w;
  }

  /**
   * @returns {number} The `x` component of this vector.
   */
  get x() {
    return this.#x;
  }

  /**
   * Shortcut to get all the components of this vector as an array.
   * @returns {number[]} An array of numbers.
   */
  get xyzw() {
    return [
      this.#x,
      this.#y,
      this.#z,
      this.#w
    ];
  }

  /**
   * @returns {number} The `y` component of this vector.
   */
  get y() {
    return this.#y;
  }

  /**
   * @returns {number} The `z` component of this vector.
   */
  get z() {
    return this.#z;
  }

  /**
   * Alias to set the `w` component of this vector.
   * @param {?(number|string|boolean|undefined)} [a=null] Any number-coercible
   * value.
   */
  set a(a = null) {
    this.#w = Number(a);
  }

  /**
   * Alias to set the `z` component of this vector.
   * @param {?(number|string|boolean|undefined)} [b=null] Any number-coercible
   * value.
   */
  set b(b = null) {
    this.#z = Number(b);
  }

  /**
   * Alias to set the `y` component of this vector.
   * @param {?(number|string|boolean|undefined)} [g=null] Any number-coercible
   * value.
   */
  set g(g = null) {
    this.#y = Number(g);
  }

  /**
   * Set the `magnitude` of this vector to the given value.
   * @param {?(number|string|boolean|undefined)} [m=null] Any number-coercible
   * value.
   */
  set magnitude(m = null) {
    m = Number(m);
    const M = this.magnitude;
    this.#x = this.#x / M * m;
    this.#y = this.#y / M * m;
    this.#z = this.#z / M * m;
    this.#w = this.#w / M * m;
  }

  /**
   * Alias to set the `x` component of this vector.
   * @param {?(number|string|boolean|undefined)} [r=null] Any number-coercible
   * value.
   */
  set r(r = null) {
    this.#x = Number(r);
  }

  /**
   * Alias to set all the components of this vector from an array.
   * @param {(null|number|string|boolean|undefined)[]} rgba An array of any
   * number-coercible value.
   */
  set rgba(rgba) {
    this.x = rgba[0];
    this.y = rgba[1];
    this.z = rgba[2];
    this.w = rgba[3];
  }

  /**
   * Set the `w` component of this vector.
   * @param {?(number|string|boolean|undefined)} [w=null] Any number-coercible
   * value.
   */
  set w(w = null) {
    this.#w = Number(w);
  }

  /**
   * Set the `x` component of this vector.
   * @param {?(number|string|boolean|undefined)} [x=null] Any number-coercible
   * value.
   */
  set x(x = null) {
    this.#x = Number(x);
  }

  /**
   * Shortcut to set all the components of this vector from an array.
   * @param {(null|number|string|boolean|undefined)[]} xyzw An array of any
   * number-coercible value.
   */
  set xyzw(xyzw) {
    this.x = xyzw[0];
    this.y = xyzw[1];
    this.z = xyzw[2];
    this.w = xyzw[3];
  }

  /**
   * Set the `y` component of this vector.
   * @param {?(number|string|boolean|undefined)} [y=null] Any number-coercible
   * value.
   */
  set y(y = null) {
    this.#y = Number(y);
  }

  /**
   * Set the `z` component of this vector.
   * @param {?(number|string|boolean|undefined)} [z=null] Any number-coercible
   * value.
   */
  set z(z = null) {
    this.#z = Number(z);
  }

  /**
   * Adds vector `v` to this vector.
   * @param {Vec4} v A vector.
   * @returns {this} This vector.
   */
  add(v) {
    this.#x += v.#x;
    this.#y += v.#y;
    this.#z += v.#z;
    this.#w += v.#w;
    return this;
  }

  /**
   * Returns the angle between this vector and vector `v`. Interval [0, PI].
   * @param {Vec4} v A vector.
   * @returns {number} Value in radians.
   */
  angleBetween(v) {
    return acos((
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z +
      this.#w * v.#w
    ) / (this.magnitude * v.magnitude));
  }

  /**
   * Keeps the `magnitude` of this vector between the given minimum and maximum
   * values (inclusive).
   * @param {?(number|string|boolean)} [max=null] Any number-coercible value.
   * @param {?(number|string|boolean)} [min=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  clamp(min = null, max = null) {
    min = Number(min);
    max = Number(max);
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
      this.#z = this.#z / m * max;
      this.#w = this.#w / m * max;
    } else if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
      this.#z = this.#z / m * min;
      this.#w = this.#w / m * min;
    }
    return this;
  }

  /**
   * Returns a new copy of this vector.
   * @returns {Vec4} A new vector.
   */
  clone() {
    return new Vec4(
      this.#x,
      this.#y,
      this.#z,
      this.#w
    );
  }

  /**
   * Copy each component from vector `v` to this vector.
   * @param {Vec4} v A vector.
   * @returns {this} This vector.
   */
  copy(v) {
    this.#x = v.#x;
    this.#y = v.#y;
    this.#z = v.#z;
    this.#w = v.#w;
    return this;
  }

  /**
   * Computes the distance from this vector to vector `v` with the
   * {@link https://en.wikipedia.org/wiki/Euclidean_distance Euclidean metric}.
   * @param {Vec4} v A vector.
   * @returns {number} Euclidean distance.
   */
  distance(v) {
    return sqrt(
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2 +
      (this.#z - v.#z) ** 2 +
      (this.#w - v.#w) ** 2
    );
  }

  /**
   * Computes the squared distance from this vector to vector `v` with the
   * Euclidean metric.
   * @param {Vec4} v A vector.
   * @returns {number} Euclidean distance.
   */
  distanceSq(v) {
    return (
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2 +
      (this.#z - v.#z) ** 2 +
      (this.#w - v.#w) ** 2
    );
  }

  /**
   * The {@link https://en.wikipedia.org/wiki/Dot_product dot product} (aka.
   * scalar product or inner product) measures how much this vector and vector
   * `v` point in the same direction.
   * 
   * - When pointing in the same direction: we get the largest value.
   * - When the angle between is 90 degrees: we get 0.
   * - When pointing in opposite directions: we inverse the largest value.
   * @param {Vec4} v A vector.
   * @returns {number} The dot product.
   */
  dot(v) {
    return (
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z +
      this.#w * v.#w
    );
  }

  /**
   * Checks whether or not this vector has any +/-`Infinity` component.
   * @returns {boolean} Boolean result.
   */
  isInfinite() {
    return (
      this.#x === Infinity || this.#x === -Infinity ||
      this.#y === Infinity || this.#y === -Infinity ||
      this.#z === Infinity || this.#z === -Infinity ||
      this.#w === Infinity || this.#w === -Infinity
    );
  }

  /**
   * Checks whether or not this vector has any `NaN` component.
   * @returns {boolean} Boolean result.
   */
  isNaN() {
    return (
      isNaN(this.#x) ||
      isNaN(this.#y) ||
      isNaN(this.#z) ||
      isNaN(this.#w)
    );
  }

  /**
   * Checks whether or not this vector has all its components at zero.
   * @returns {boolean} Boolean result.
   */
  isZero() {
    return (
      this.#x === 0 &&
      this.#y === 0 &&
      this.#z === 0 &&
      this.#w === 0
    );
  }

  /**
   * Limits the maximum `magnitude` of this vector to the given value.
   * @param {?(number|string|boolean)} [max=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  limitMax(max = null) {
    max = Number(max);
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
      this.#z = this.#z / m * max;
      this.#w = this.#w / m * max;
    }
    return this;
  }

  /**
   * Limits the minimum `magnitude` of this vector to the given value.
   * @param {?(number|string|boolean)} [min=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  limitMin(min = null) {
    min = Number(min);
    const m = this.magnitude;
    if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
      this.#z = this.#z / m * min;
      this.#w = this.#w / m * min;
    }
    return this;
  }

  /**
   * Points this vector in direction of vector `v`.
   * @param {Vec4} v A vector.
   * @returns {this} This vector.
   */
  lookAt(v) {
    const m = this.magnitude;
    const mV = v.magnitude;
    this.#x = v.#x / mV * m;
    this.#y = v.#y / mV * m;
    this.#z = v.#z / mV * m;
    this.#w = v.#w / mV * m;
    return this;
  }

  /**
   * Transforms this vector into its negation (aka. opposite).
   * @returns {this} This vector.
   */
  negate() {
    this.#x *= -1;
    this.#y *= -1;
    this.#z *= -1;
    this.#w *= -1;
    return this;
  }

  /**
   * Transforms this vector into a unit vector (i.e.: `magnitude` = 1).
   * @returns {this} This vector.
   */
  normalize() {
    const m = this.magnitude;
    this.#x /= m;
    this.#y /= m;
    this.#z /= m;
    this.#w /= m;
    return this;
  }

  /**
   * Transforms this vector into the orthogonal projection of itself onto `v`,
   * i.e.: the component of this vector projected on `v` (in direction of `v`).
   * @param {Vec4} v A vector.
   * @returns {this} This vector.
   */
  project(v) {
    const m = this.magnitude;
    const mV = v.magnitude;
    const f = m * cos(acos((
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z +
      this.#w * v.#w
    ) / (m * mV)));
    this.#x = v.#x / mV * f;
    this.#y = v.#y / mV * f;
    this.#z = v.#z / mV * f;
    this.#w = v.#w / mV * f;
    return this;
  }

  /**
   * Randomizes the direction of this vector keeping its `magnitude`.
   * @returns {this} This vector.
   */
  random() {
    let x1;
    let x2;
    let x3;
    let x4;
    do {
      x1 = random() * 2 - 1;
      x2 = random() * 2 - 1;
      x3 = random() * 2 - 1;
      x4 = random() * 2 - 1;
    } while (x1 ** 2 + x2 ** 2 >= 1 || x3 ** 2 + x4 ** 2 >= 1);
    const f = sqrt((1 - x1 ** 2 - x2 ** 2) / (x3 ** 2 + x4 ** 2));
    const m = this.magnitude;
    this.#x = m * x1;
    this.#y = m * x2;
    this.#z = m * x3 * f;
    this.#w = m * x4 * f;
    return this;
  }

  /**
   * Checks whether or not this vector and vector `v` satisfy the equality
   * definition.
   * @param {Vec4} v A vector.
   * @returns {boolean} Boolean result.
   */
  satisfyEquality(v) {
    return (
      this.#x === v.#x &&
      this.#y === v.#y &&
      this.#z === v.#z &&
      this.#w === v.#w
    );
  }

  /**
   * Checks whether or not this vector and vector `v` satisfy the opposition
   * definition.
   * @param {Vec4} v A vector.
   * @returns {boolean} Boolean result.
   */
  satisfyOpposition(v) {
    return (
      this.#x === -v.#x &&
      this.#y === -v.#y &&
      this.#z === -v.#z &&
      this.#w === -v.#w
    );
  }

  /**
   * Transforms this vector into the scalar multiplication of itself by a given
   * scalar `c`.
   * @param {?(number|string|boolean)} [c=null] Any number-coercible value.
   * @returns {this} This vector.
   */
  scale(c = null) {
    c = Number(c);
    this.#x *= c;
    this.#y *= c;
    this.#z *= c;
    this.#w *= c;
    return this;
  }

  /**
   * Subtracts vector `v` from this vector.
   * @param {Vec4} v A vector.
   * @returns {this} This vector.
   */
  subtract(v) {
    this.#x -= v.#x;
    this.#y -= v.#y;
    this.#z -= v.#z;
    this.#w -= v.#w;
    return this;
  }

  /**
   * Transforms this vector into a zero vector (i.e.: `magnitude` = 0).
   * @returns {this} This vector.
   */
  zero() {
    this.#x = 0;
    this.#y = 0;
    this.#z = 0;
    this.#w = 0;
    return this;
  }
}

export { Vec2, Vec3, Vec4 };
