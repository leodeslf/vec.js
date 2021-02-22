/**
 * Vectors and their functionality in JavaScript.
 * 
 * MIT License.
 * Copyright (c) 2018 Leonardo de S.L.F.
 * http://leodeslf.com/
 */

/**
 * An n-dimensional vector class.
 */
class Vec {
  constructor(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    if (z !== undefined) this.z = z;
    if (w !== undefined) this.w = w;
  }
}

/**
 * A two-dimensional vector class.
 */
export class Vec2 extends Vec {
  /**
   * Creates a two-dimensional vector pointing to X and Y.
   * @param {number} x A numeric expression.
   * @param {number} y A numeric expression.
   */
  constructor(x, y) {
    super(x, y);
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} A new vector equals to A plus B.
   */
  static add(a, b) {
    return new Vec2(
      a.x + b.x,
      a.y + b.y
    );
  }

  /**
   * Returns the angle between A and B.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} The angle between A and B (in radians).
   */
  static angleBetween(a, b) {
    const MA = a.magnitude;
    const MB = b.magnitude;
    if (MA === 0 || MB === 0) {
      console.error("Cannot divide by zero.");
      return NaN;
    }
    return Math.acos(Vec2.dot(a, b) / (MA * MB));
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a, b) {
    return Math.sqrt(
      (a.x - b.x) ** 2 +
      (a.y - b.y) ** 2
    );
  }

  /**
   * "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} Chebyshev distance from A to B.
   */
  static distanceChebyshev(a, b) {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y)
    );
  }

  /**
   * "Inspired by the grid-like organization of Manhattan, this
   * is distance to the nearest points when you can only travel
   * around the boundaries."
   * 
   * In other words: 
   * Only horizontal, vertical and diagonal (45 deg.) movements.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} Manhattan distance from A to B.
   */
  static distanceManhattan(a, b) {
    return Math.sqrt(
      Math.abs(a.x - b.x) +
      Math.abs(a.y - b.y)
    );
  }

  /**
   * It takes an exponent parameter (e), and the results can be similar
   * or even equivalent to Chebyshev, Euclidian and Manhattan metrics.
   * 
   * - If { p = 1 }: It'll be equivalent to Manhattan distance.
   * 
   * - If { p = 2 }: It'll be equivalent to Euclidian distance.
   * 
   * - If { p = infinite }: It'll be equivalent to Chebyshev distance.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @param {number} e A numeric expression.
   * @returns {number} Minkowski distance from A to B.
   */
  static distanceMinkowski(a, b, e) {
    if (e === 0) {
      console.error("Cannot divide by zero.");
      return NaN;
    }
    return (
      Math.abs(a.x - b.x) ** e +
      Math.abs(a.y - b.y) ** e
    ) ** (1 / e);
  }

  /**
   * The sum of the product of each component.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} The dot product of these two vectors.
   */
  static dot(a, b) {
    return (
      a.x * b.x +
      a.y * b.y
    );
  }

  /**
   * @param {Vec2} a A vector.
   * @returns {Vec2} A new vector identical to A.
   */
  static fromCopy(a) {
    return new Vec2(
      { ...a }.x,
      { ...a }.y
    );
  }

  /**
   * @param {number} radius A numeric expression.
   * @param {number} phi A numeric expression (angle from positive x-axis in radians).
   * @returns {Vec2} A new vector created from Polar Coordinates.
   */
  static fromPolarCoords(radius, phi) {
    return new Vec2(
      radius * Math.cos(phi),
      radius * Math.sin(phi)
    );
  }

  /**
   * Orthogonal projection of A onto B.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} The component of A projected on B (in direction of B).
   */
  static project(a, b) {
    const PM = a.magnitude * Math.cos(Vec2.angleBetween(a, b));
    const P = Vec2.fromCopy(b);
    P.normalize();
    P.scale(PM);
    return P;
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} A new vector equals to A minus B.
   */
  static subtract(a, b) {
    return new Vec2(
      a.x - b.x,
      a.y - b.y
    );
  }

  /**
   * Angle relative to the positive x-axis.
   * @returns {number} Value in radians.
   */
  get angleX() {
    return Math.atan2(
      this.y,
      this.x
    );
  }

  /**
   * Angle relative to the positive y-axis.
   * @returns {number} Value in radians.
   */
  get angleY() {
    return Math.atan2(
      this.x,
      this.y
    );
  }

  /**
   * @returns {number} The magnitude of this vector.
   */
  get magnitude() {
    return Math.sqrt(
      this.x ** 2 +
      this.y ** 2
    );
  }

  /**
   * A short hand for an iterable array or values.
   * @returns {number[]} An array of numeric expressions.
   */
  get xy() {
    return [this.x, this.y];
  }

  /**
   * Limits the maximum length of this vector.
   * @param {number} max A numeric expression.
   * @returns {Vec2} This vector.
   */
  set limit(max) {
    if (this.magnitude > max) {
      this.normalize();
      this.scale(max);
    }
    return this;
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number} m A numeric expression.
   * @returns {Vec2} This vector.
   */
  set magnitude(m) {
    this.normalize();
    this.scale(m);
    return this;
  }

  /**
   * Sets all the components.
   * @returns {Vec2} This vector.
   */
  set xy(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Adds A to this vector.
   * @param {Vec2} a A vector.
   * @returns {Vec2} This vector.
   */
  add(a) {
    this.x = this.x + a.x;
    this.y = this.y + a.y;
    return this;
  }

  /**
   * Keeps the vector's magnitude between the given values, minimum
   * and maximum (inclusive).
   * @param {number} max A numeric expression.
   * @param {number} min A numeric expression.
   * @returns {Vec2} This vector.
   */
  clamp(max, min) {
    const M = this.magnitude;
    if (M > max) this.magnitude = max;
    else if (M < min) this.magnitude = min;
    return this;
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec2} a A vector.
   * @returns {Vec2} This vector.
   */
  copy(a) {
    this.x = { ...a }.x;
    this.y = { ...a }.y;
    return this;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   * @returns {Vec2} This vector.
   */
  normalize() {
    let m = this.magnitude;
    if (m === 0) m = 1;
    else m = 1 / m;
    this.x = this.x * m;
    this.y = this.y * m;
    return this;
  }

  /**
   * Rotates this vector on z-axis by phi.
   * @param {number} phi A numeric expression (angle in radians).
   * @returns {Vec2} This vector.
   */
  rotateAxisZ(phi) {
    [this.x, this.y] = [
      this.x * Math.cos(phi) - this.y * Math.sin(phi),
      this.x * Math.sin(phi) + this.y * Math.cos(phi)
    ];
    return this;
  }

  /**
   * Scales this vector by A.
   * @param {number} val A numeric expression.
   * @returns {Vec2} This vector.
   */
  scale(val) {
    this.x = this.x * val;
    this.y = this.y * val;
    return this;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec2} a A vector.
   * @returns {Vec2} This vector.
   */
  subtract(a) {
    this.x = this.x - a.x;
    this.y = this.y - a.y;
    return this;
  }
}

/**
 * A three-dimensional vector class.
 */
export class Vec3 extends Vec {
  /**
   * Creates a three-dimensional vector pointing to X, Y and Z.
   * @param {number} x A numeric expression.
   * @param {number} y A numeric expression.
   * @param {number} z A numeric expression.
   */
  constructor(x, y, z) {
    super(x, y, z || 0);
  }

  /**
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {Vec3} A new vector equals to A plus B.
   */
  static add(a, b) {
    return new Vec3(
      a.x + b.x,
      a.y + b.y,
      a.z + b.z
    );
  }

  /**
   * Returns the angle between A and B.
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {number} The angle between A and B (in radians).
   */
  static angleBetween(a, b) {
    const MA = a.magnitude;
    const MB = b.magnitude;
    if (MA === 0 || MB === 0) {
      console.error("Cannot divide by zero.");
      return NaN;
    }
    return Math.acos(Vec3.dot(a, b) / (MA * MB));
  }

  /**
   * Gives a vector which is perpendicular to both vectors A and B.
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {Vec3} A new vector, the cross product of A and B.
   */
  static cross(a, b) {
    return new Vec3(
      (a.y * b.z - b.y * a.z),
      (a.z * b.x - b.z * a.x),
      (a.x * b.y - b.x * a.y)
    );
  }

  /**
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a, b) {
    return Math.sqrt(
      (a.x - b.x) ** 2 +
      (a.y - b.y) ** 2 +
      (a.z - b.z) ** 2
    );
  }

  /**
   * "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {number} Chebyshev distance from A to B.
   */
  static distanceChebyshev(a, b) {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y),
      Math.abs(a.z - b.z)
    );
  }

  /**
   * "Inspired by the grid-like organization of Manhattan, this
   * is distance to the nearest points when you can only travel
   * around the boundaries."
   * 
   * In other words: 
   * Only horizontal, vertical and diagonal (45 deg.) movements.
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {number} Manhattan distance from A to B.
   */
  static distanceManhattan(a, b) {
    return Math.sqrt(
      Math.abs(a.x - b.x) +
      Math.abs(a.y - b.y) +
      Math.abs(a.z - b.z)
    );
  }

  /**
   * It takes an exponent parameter (e), and the results can be similar
   * or even equivalent to Chebyshev, Euclidian and Manhattan metrics.
   * 
   * - If { p = 1 }: It'll be equivalent to Manhattan distance.
   * 
   * - If { p = 2 }: It'll be equivalent to Euclidian distance.
   * 
   * - If { p = infinite }: It'll be equivalent to Chebyshev distance.
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @param {number} e A numeric expression.
   * @returns {number} Minkowski distance from A to B.
   */
  static distanceMinkowski(a, b, e) {
    if (e === 0) {
      console.error("Cannot divide by zero.");
      return NaN;
    }
    return (
      Math.abs(a.x - b.x) ** e +
      Math.abs(a.y - b.y) ** e +
      Math.abs(a.z - b.z) ** e
    ) ** (1 / e);
  }

  /**
   * The sum of the product of each component.
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {number} The dot product of these two vectors.
   */
  static dot(a, b) {
    return (
      a.x * b.x +
      a.y * b.y +
      a.z * b.z
    );
  }

  /**
   * @param {Vec3} a A vector.
   * @returns {Vec3} A new vector identical to A.
   */
  static fromCopy(a) {
    return new Vec3(
      { ...a }.x,
      { ...a }.y,
      { ...a }.z
    );
  }

  /**
   * @param {number} radius A numeric expression.
   * Rotates  phi A by numeric expression (angle from positive x-axis in radians).
   * @param {number} z A numeric expression.
   * @returns {Vec3} A new vector created from Cylindrical Coordinates.
   */
  static fromCylindricalCoords(radius, phi, z) {
    return new Vec3(
      radius * Math.cos(phi),
      radius * Math.sin(phi),
      z
    );
  }

  /**
   * @param {number} radius A numeric expression.
   * Rotates  phi A by numeric expression (angle from positive x-axis in radians).
   * Rotates  theta A by numeric expression (angle from positive z-axis in radians).
   * @returns {Vec3} A new vector created from Spherical Coordinates.
   */
  static fromSphericalCoords(radius, phi, theta) {
    return new Vec3(
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta)
    );
  }

  /**
   * Orthogonal projection of A onto B.
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {Vec3} The component of A projected on B (in direction of B).
   */
  static project(a, b) {
    const PM = a.magnitude * Math.cos(Vec3.angleBetween(a, b));
    const P = Vec3.fromCopy(b);
    P.normalize();
    P.scale(PM);
    return P;
  }

  /**
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {Vec2} A new vector equals to A minus B.
   */
  static subtract(a, b) {
    return new Vec3(
      a.x - b.x,
      a.y - b.y,
      a.z - b.z
    );
  }

  /**
   * Rotates to the by from positive x-axis.
   * @returns {number} Value in radians.
   */
  get angleX() {
    return Math.atan2(
      this.y, this.x
    );
  }

  /**
   * Rotates to the by positive y-axis.
   * @returns {number} Value in radians.
   */
  get angleY() {
    return Math.atan2(
      this.x, this.y
    );
  }

  /**
   * Rotates to the by positive z-axis.
   * @returns {number} Value in radians.
   */
  get angleZ() {
    return Math.acos(
      this.z / this.magnitude
    );
  }

  /**
   * Alias for z component.
   * @returns {number} A numeric expression.
   */
  get b() {
    return this.z;
  }

  /**
 * Alias for y component.
 * @returns {number} A numeric expression.
 */
  get g() {
    return this.y;
  }

  /**
   * @returns {number} The magnitude of this vector.
   */
  get magnitude() {
    return Math.sqrt(
      this.x ** 2 +
      this.y ** 2 +
      this.z ** 2
    );
  }

  /**
   * Alias for x component.
   * @returns {number} A numeric expression.
   */
  get r() {
    return this.x;
  }

  /**
   * A short hand for an iterable array or values.
   * @returns {number[]} An array of numeric expressions.
   */
  get rgb() {
    return [this.x, this.y, this.z];
  }

  /**
   * A short hand for an iterable array or values.
   * @returns {number[]} An array of numeric expressions.
   */
  get xyz() {
    return [this.x, this.y, this.z];
  }

  /**
   * Alias for z component.
   * @param {number} b A numeric expression.
   */
  set b(b) {
    this.z = b;
  }

  /**
 * Alias for y component.
 * @param {number} g A numeric expression.
 */
  set g(g) {
    this.y = g;
  }

  /**
   * Limits the maximum length of this vector.
   * @param {number} max A numeric expression.
   * @returns {Vec3} This vector.
   */
  set limit(max) {
    if (this.magnitude > max) {
      this.normalize();
      this.scale(max);
    }
    return this;
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number} m A numeric expression.
   * @returns {Vec3} This vector.
   */
  set magnitude(m) {
    this.normalize();
    this.scale(m);
    return this;
  }

  /**
   * Alias for x component.
   * @param {number} r A numeric expression.
   */
  set r(r) {
    this.x = r;
  }

  /**
   * Sets all the components.
   * @returns {Vec3} This vector.
   */
  set rgb(r, g, b) {
    this.x = r;
    this.y = g;
    this.z = b;
  }

  /**
   * Sets all the components.
   * @returns {Vec3} This vector.
   */
  set xyz(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Adds A to this vector.
   * @param {Vec3} a A vector.
   * @returns {Vec3} This vector.
   */
  add(a) {
    this.x = this.x + a.x;
    this.y = this.y + a.y;
    this.z = this.z + a.z;
    return this;
  }

  /**
   * Keeps the vector's magnitude between the given values, minimum
   * and maximum (inclusive).
   * @param {number} max A numeric expression.
   * @param {number} min A numeric expression.
   * @returns {Vec3} This vector.
   */
  clamp(max, min) {
    const M = this.magnitude;
    if (M > max) this.magnitude = max;
    else if (M < min) this.magnitude = min;
    return this;
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec3} a A vector.
   * @returns {Vec3} This vector.
   */
  copy(a) {
    this.x = { ...a }.x;
    this.y = { ...a }.y;
    this.z = { ...a }.z;
    return this;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   * @returns {Vec3} This vector.
   */
  normalize() {
    let m = this.magnitude;
    if (m === 0) m = 1;
    else m = 1 / m;
    this.x = this.x * m;
    this.y = this.y * m;
    this.z = this.z * m;
    return this;
  }

  /**
   * Rotates x-axis by phi.
   * @param {number} phi A numeric expression (angle in radians).
   * @returns {Vec3} This vector.
   */
  rotateAxisX(phi) {
    [this.y, this.z] = [
      this.z * Math.cos(phi) - this.z * Math.sin(phi),
      this.z * Math.sin(phi) + this.z * Math.cos(phi)
    ];
    return this;
  }

  /**
   * Rotates y-axis by phi.
   * @param {number} phi A numeric expression (angle in radians).
   * @returns {Vec3} This vector.
   */
  rotateAxisY(phi) {
    [this.x, this.z] = [
      this.x * Math.cos(phi) - this.z * Math.sin(phi),
      -this.x * Math.sin(phi) + this.z * Math.cos(phi)
    ];
    return this;
  }

  /**
   * Rotates z-axis by phi.
   * @param {number} phi A numeric expression (angle in radians).
   * @returns {Vec3} This vector.
   */
  rotateAxisZ(phi) {
    [this.x, this.y] = [
      this.x * Math.cos(phi) - this.y * Math.sin(phi),
      this.x * Math.sin(phi) + this.y * Math.cos(phi)
    ];
    return this;
  }

  /**
   * Scales this vector by A.
   * @param {number} val A numeric expression.
   * @returns {Vec3} This vector.
   */
  scale(val) {
    this.x = this.x * val;
    this.y = this.y * val;
    this.z = this.z * val;
    return this;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec3} a A vector.
   * @returns {Vec3} This vector.
   */
  subtract(a) {
    this.x = this.x - a.x;
    this.y = this.y - a.y;
    this.z = this.z - a.z;
    return this;
  }
}

/**
 * A four-dimensional vector class.
 */
export class Vec4 extends Vec {
  /**
   * Creates a four-dimensional vector pointing to X, Y, Z and W.
   * @param {number} x A numeric expression.
   * @param {number} y A numeric expression.
   * @param {number} z A numeric expression.
   * @param {number} w A numeric expression.
   */
  constructor(x, y, z, w) {
    super(x, y, z || 0, w || 0);
  }

  /**
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {Vec4} A new vector equals to A plus B.
   */
  static add(a, b) {
    return new Vec4(
      a.x + b.x,
      a.y + b.y,
      a.z + b.z,
      a.w + b.w
    );
  }

  /**
   * Returns the angle between A and B.
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} The angle between A and B (in radians).
   */
  static angleBetween(a, b) {
    const MA = a.magnitude;
    const MB = b.magnitude;
    if (MA === 0 || MB === 0) {
      console.error("Cannot divide by zero.");
      return NaN;
    }
    return Math.acos(Vec4.dot(a, b) / (MA * MB));
  }

  /**
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a, b) {
    return Math.sqrt(
      (a.x - b.x) ** 2 +
      (a.y - b.y) ** 2 +
      (a.z - b.z) ** 2 +
      (a.w - b.w) ** 2
    );
  }

  /**
   * "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} Chebyshev distance from A to B.
   */
  static distanceChebyshev(a, b) {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y),
      Math.abs(a.z - b.z),
      Math.abs(a.w - b.w)
    );
  }

  /**
   * "Inspired by the grid-like organization of Manhattan, this
   * is distance to the nearest points when you can only travel
   * around the boundaries."
   * 
   * In other words: 
   * Only horizontal, vertical and diagonal (45 deg.) movements.
   * @param {Vec4} a a vector.
   * @param {Vec4} b A vector.
   * @returns {number} Manhattan distance from A to B.
   */
  static distanceManhattan(a, b) {
    return Math.sqrt(
      Math.abs(a.x - b.x) +
      Math.abs(a.y - b.y) +
      Math.abs(a.z - b.z) +
      Math.abs(a.w - b.w)
    );
  }

  /**
   * It takes an exponent parameter (e), and the results can be similar
   * or even equivalent to Chebyshev, Euclidian and Manhattan metrics.
   * 
   * - If { p = 1 }: It'll be equivalent to Manhattan distance.
   * 
   * - If { p = 2 }: It'll be equivalent to Euclidian distance.
   * 
   * - If { p = infinite }: It'll be equivalent to Chebyshev distance.
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @param {number} e A numeric expression.
   * @returns {number} Minkowski distance from A to B.
   */
  static distanceMinkowski(a, b, e) {
    if (e === 0) {
      console.error("Cannot divide by zero.");
      return NaN;
    }
    return (
      Math.abs(a.x - b.x) ** e +
      Math.abs(a.y - b.y) ** e +
      Math.abs(a.z - b.z) ** e +
      Math.abs(a.w - b.w) ** e
    ) ** (1 / e);
  }

  /**
   * The sum of the product of each component.
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} The dot product of these two vectors.
   */
  static dot(a, b) {
    return (
      a.x * b.x +
      a.y * b.y +
      a.z * b.z +
      a.w * b.w
    );
  }

  /**
   * @param {Vec4} a A vector.
   * @returns {Vec4} A new vector identical to A.
   */
  static fromCopy(a) {
    return new Vec4(
      { ...a }.x,
      { ...a }.y,
      { ...a }.z,
      { ...a }.w
    );
  }

  /**
   * Orthogonal projection of A onto B.
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {Vec4} The component of A projected on B (in direction of B).
   */
  static project(a, b) {
    const PM = a.magnitude * Math.cos(Vec4.angleBetween(a, b));
    const P = Vec4.fromCopy(b);
    P.normalize();
    P.scale(PM);
    return P;
  }

  /**
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {Vec2} A new vector equals to A minus B.
   */
  static subtract(a, b) {
    return new Vec4(
      a.x - b.x,
      a.y - b.y,
      a.z - b.z,
      a.w - b.w
    );
  }

  /**
   * Alias for w component.
   * @returns {number} A numeric expression.
   */
  get a() {
    return this.w;
  }

  /**
   * Angle relative to the positive x-axis.
   * @returns {number} Value in radians.
   */
  get angleX() {
    return Math.atan2(
      this.y, this.x
    );
  }

  /**
   * Angle relative to the positive y-axis.
   * @returns {number} Value in radians.
   */
  get angleY() {
    return Math.atan2(
      this.x, this.y
    );
  }

  /**
   * Angle relative to the positive z-axis.
   * @returns {number} Value in radians.
   */
  get angleZ() {
    return Math.acos(
      this.z / this.magnitude
    );
  }

  /**
   * Alias for z component.
   * @returns {number} A numeric expression.
   */
  get b() {
    return this.z;
  }

  /**
 * Alias for y component.
 * @returns {number} A numeric expression.
 */
  get g() {
    return this.y;
  }

  /**
   * @returns {number} The magnitude of this vector.
   */
  get magnitude() {
    return Math.sqrt(
      this.x ** 2 +
      this.y ** 2 +
      this.z ** 2 +
      this.w ** 2
    );
  }

  /**
   * Alias for x component.
   * @returns {number} A numeric expression.
   */
  get r() {
    return this.x;
  }

  /**
   * A short hand for an iterable array or values.
   * @returns {number[]} An array of numeric expressions.
   */
  get rgba() {
    return [this.x, this.y, this.z, this.w];
  }

  /**
   * A short hand for an iterable array or values.
   * @returns {number[]} An array of numeric expressions.
   */
  get xyzw() {
    return [this.x, this.y, this.z, this.w];
  }

  /**
   * Alias for w component.
   * @param {number} a A numeric expression.
   */
  set a(a) {
    this.w = a;
  }

  /**
   * Alias for z component.
   * @param {number} b A numeric expression.
   */
  set b(b) {
    this.z = b;
  }

  /**
 * Alias for y component.
 * @param {number} g A numeric expression.
 */
  set g(g) {
    this.y = g;
  }

  /**
   * Limits the maximum length of this vector.
   * @param {number} max A numeric expression.
   * @returns {Vec4} This vector.
   */
  set limit(max) {
    if (this.magnitude > max) {
      this.normalize();
      this.scale(max);
    }
    return this;
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number} m A numeric expression.
   * @returns {Vec4} This vector.
   */
  set magnitude(m) {
    this.normalize();
    this.scale(m);
    return this;
  }

  /**
   * Alias for x component.
   * @param {number} r A numeric expression.
   */
  set r(r) {
    this.x = r;
  }

  /**
   * Sets all the components.
   * @returns {Vec4} This vector.
   */
  set rgba(r, g, b, a) {
    this.x = r;
    this.y = g;
    this.z = b;
    this.w = a;
  }

  /**
   * Sets all the components.
   * @returns {Vec4} This vector.
   */
  set xyzw(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  /**
   * Adds A to this vector.
   * @param {Vec4} a A vector.
   * @returns {Vec4} This vector.
   */
  add(a) {
    this.x = this.x + a.x;
    this.y = this.y + a.y;
    this.z = this.z + a.z;
    this.w = this.w + a.w;
    return this;
  }

  /**
   * Keeps the vector's magnitude between the given values, minimum
   * and maximum (inclusive).
   * @param {number} max A numeric expression.
   * @param {number} min A numeric expression.
   * @returns {Vec4} This vector.
   */
  clamp(max, min) {
    const M = this.magnitude;
    if (M > max) this.magnitude = max;
    else if (M < min) this.magnitude = min;
    return this;
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec4} a A vector.
   * @returns {Vec4} This vector.
   */
  copy(a) {
    this.x = { ...a }.x;
    this.y = { ...a }.y;
    this.z = { ...a }.z;
    this.w = { ...a }.w;
    return this;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   * @returns {Vec4} This vector.
   */
  normalize() {
    let m = this.magnitude;
    if (m === 0) m = 1;
    else m = 1 / m;
    this.x = this.x * m;
    this.y = this.y * m;
    this.z = this.z * m;
    this.w = this.w * m;
    return this;
  }

  /**
   * Scales this vector by A.
   * @param {number} val A numeric expression.
   * @returns {Vec4} This vector.
   */
  scale(val) {
    this.x = this.x * val;
    this.y = this.y * val;
    this.z = this.z * val;
    this.w = this.w * val;
    return this;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec4} a A vector.
   * @returns {Vec4} This vector.
   */
  subtract(a) {
    this.x = this.x - a.x;
    this.y = this.y - a.y;
    this.z = this.z - a.z;
    this.w = this.w - a.w;
    return this;
  }
}
