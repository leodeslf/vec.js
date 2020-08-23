/**
 * Vector class and utilities.
 */
class Vec {
  /**
   * @param {number} x A numeric expression.
   * @param {number} y A numeric expression.
   * @param {number} z A numeric expression.
   * @param {number} w A numeric expression.
   */
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    if (typeof z === 'number') this.z = z;
    if (typeof w === 'number') this.w = w;
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

  ////////////////////
  // STATIC METHODS //
  ////////////////////

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} A new vector equals to A plus B.
   */
  static add(a, b) {
    return new Vec2(a.x + b.x, a.y + b.y);
  }

  /**
   * @param {number} radius Numeric expression.
   * @param {number} phi Numeric expression (angle from x axis measured in radians).
   * @returns {Vec2} A new vector created from Polar Coordinates.
   */
  static fromPolarCoords(radius, phi) {
    return new Vec2(
      radius * Math.cos(phi),
      radius * Math.sin(phi)
    );
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a, b) {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    return Math.sqrt((S * S) + (T * T));
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
      Math.abs(a.y - b.y));
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
      Math.abs(a.y - b.y));
  }

	/**
   * It takes an exponent parameter (e), and the results can be similar
   * or even equivalent to Chebyshev, Euclidian and Manhattan metrics.
   * 
   * - If { p = 1 }: It'll be equivalent to Manhattan distance.
   * 
   * - If { p = 2 }: It'll be equivalent to Euclidian distance.
   * 
   * - If { p = infinite }: It'll be equivalent to Chebyshev distance.	 *
	 * @param {Vec2} a A vector.
	 * @param {Vec2} b A vector.
   * @param {number} e A numeric expression.
   * @returns {number} Minkowski distance from A to B.
	 */
  static distanceMinkowski(a, b, e) {
    return ((
      Math.abs(a.x - b.x) ** e +
      Math.abs(a.y - b.y) ** e
    ) ** (1 / e));
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} A new vector equals to A minus B.
   */
  static subtract(a, b) {
    return new Vec2(a.x - b.x, a.y - b.y);
  }

  //////////////////////
  // INSTANCE METHODS //
  //////////////////////

  /**
   * Returns the angle relative to the positive x-axis (in radians).
   * Values between PI and -PI.
   */
  get angleX() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Returns the angle relative to the positive y-axis (in radians).
   * Values between PI and -PI.
   */
  get angleY() {
    return Math.atan2(this.x, this.y);
  }

  /**
   * @returns {number} The magnitude of this vector.
   */
  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Limits the maximum length of this vector to the A value.
   * @param {number} a A numeric expression.
   */
  set limit(a) {
    if (this.magnitude > a) {
      this.normalize();
      this.scale(a);
    }
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number} a A numeric expression.
   */
  set magnitude(a) {
    this.normalize();
    this.scale(a);
  }

  /**
   * Adds A to this vector.
   * @param {Vec2} a A vector.
   */
  add(a) {
    this.x = this.x + a.x;
    this.y = this.y + a.y;
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec2} a A vector.
   */
  copy(a) {
    this.x = { ...a }.x;
    this.y = { ...a }.y;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   */
  normalize() {
    const MA = 1 / this.magnitude;
    this.x = this.x * MA;
    this.y = this.y * MA;
  }

  /**
   * Scales this vector by A.
   * @param {number} a A numeric expression.
   */
  scale(a) {
    this.x = this.x * a;
    this.y = this.y * a;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec2} a A vector.
   */
  subtract(a) {
    this.x = this.x - a.x;
    this.y = this.y - a.y;
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
    super(x, y, z);
  }

  ////////////////////
  // STATIC METHODS //
  ////////////////////

  /**
   * Returns a vector equals to A plus B.
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   */
  static add(a, b) {
    return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  /**
   * @param {number} radius Numeric expression.
   * @param {number} phi Numeric expression (angle from x axis measured in radians).
   * @param {number} theta Numeric expression (angle from z axis measured in radians).
   * @returns {Vec3} A new vector created from Spherical Coordinates.
   */
  static fromSphericalCoords(radius, phi, theta) {
    return new Vec3(
      radius * Math.cos(phi) * Math.sin(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(theta)
    );
  }

  /**
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a, b) {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    const P = (a.z - b.z);
    return Math.sqrt((S * S) + (T * T) + (P * P));
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
      Math.abs(a.z - b.z));
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
      Math.abs(a.z - b.z));
  }

	/**
   * It takes an exponent parameter (e), and the results can be similar
   * or even equivalent to Chebyshev, Euclidian and Manhattan metrics.
   * 
   * - If { p = 1 }: It'll be equivalent to Manhattan distance.
   * 
   * - If { p = 2 }: It'll be equivalent to Euclidian distance.
   * 
   * - If { p = infinite }: It'll be equivalent to Chebyshev distance.	 *
	 * @param {Vec3} a A vector.
	 * @param {Vec3} b A vector.
   * @param {number} e A numeric expression.
   * @returns {number} Minkowski distance from A to B.
	 */
  static distanceMinkowski(a, b, e) {
    return ((
      Math.abs(a.x - b.x) ** e +
      Math.abs(a.y - b.y) ** e +
      Math.abs(a.z - b.z) ** e
    ) ** (1 / e));
  }

  /**
   * @param {Vec3} a A vector.
   * @param {Vec3} b A vector.
   * @returns {Vec2} A new vector equals to A minus B.
   */
  static subtract(a, b) {
    return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  //////////////////////
  // INSTANCE METHODS //
  //////////////////////

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive x-axis (in radians).
   */
  get angleX() {
    return Math.atan2(Math.sqrt(this.y ** 2 + this.z ** 2), this.x);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive y-axis (in radians).
   */
  get angleY() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.z ** 2), this.y);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive z-axis (in radians).
   */
  get angleZ() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.y ** 2), this.z);
  }

  /**
   * @returns {number} The magnitude of this vector.
   */
  get magnitude() {
    return Math.sqrt(
      this.x * this.x +
      this.y * this.y +
      this.z * this.z
    );
  }

  /**
   * Limits the maximum length of this vector to the A value.
   * @param {number} a A numeric expression.
   */
  set limit(a) {
    if (this.magnitude > a) {
      this.normalize();
      this.scale(a);
    }
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number} a A numeric expression.
   */
  set magnitude(a) {
    this.normalize();
    this.scale(a);
  }

  /**
   * Adds A to this vector.
   * @param {Vec3} a A vector.
   */
  add(a) {
    this.x = this.x + a.x;
    this.y = this.y + a.y;
    this.z = this.z + a.z;
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec3} a A vector.
   */
  copy(a) {
    this.x = { ...a }.x;
    this.y = { ...a }.y;
    this.z = { ...a }.z;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   */
  normalize() {
    const MA = 1 / this.magnitude;
    this.x = this.x * MA;
    this.y = this.y * MA;
    this.z = this.z * MA;
  }

  /**
   * Scales this vector by A.
   * @param {number} a A numeric expression.
   */
  scale(a) {
    this.x = this.x * a;
    this.y = this.y * a;
    this.z = this.z * a;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec3} a A vector.
   */
  subtract(a) {
    this.x = this.x - a.x;
    this.y = this.y - a.y;
    this.z = this.z - a.z;
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
    super(x, y, z, w);
  }

  ////////////////////
  // STATIC METHODS //
  ////////////////////

  /**
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {Vec4} A new vector equals to A plus B.
   */
  static add(a, b) {
    return new Vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
  }

  /**
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a, b) {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    const P = (a.z - b.z);
    const Q = (a.w - b.w);
    return Math.sqrt((S * S) + (T * T) + (P * P) + (Q * Q));
  }

  /**
   * Returns the Chebyshev distance from A to B.
   * 
   * - "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} Manhattan distance from A to B.
   */
  static distanceChebyshev(a, b) {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y),
      Math.abs(a.z - b.z),
      Math.abs(a.w - b.w));
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
      Math.abs(a.w - b.w));
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
    return ((
      Math.abs(a.x - b.x) ** e +
      Math.abs(a.y - b.y) ** e +
      Math.abs(a.z - b.z) ** e +
      Math.abs(a.w - b.w) ** e
    ) ** (1 / e));
  }

  /**
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {Vec2} A new vector equals to A minus B.
   */
  static subtract(a, b) {
    return new Vec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
  }

  //////////////////////
  // INSTANCE METHODS //
  //////////////////////

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive x-axis (in radians).
   */
  get angleX() {
    return Math.atan2(Math.sqrt(this.y ** 2 + this.z ** 2), this.x);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive y-axis (in radians).
   */
  get angleY() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.z ** 2), this.y);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive z-axis (in radians).
   */
  get angleZ() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.y ** 2), this.z);
  }

  /**
   * @returns {number} The magnitude of this vector.
   */
  get magnitude() {
    return Math.sqrt(
      this.x * this.x +
      this.y * this.y +
      this.z * this.z +
      this.w * this.w
    );
  }

  /**
   * Limits the maximum length of this vector to the A value.
   * @param {number} a A numeric expression.
   */
  set limit(a) {
    if (this.magnitude > a) {
      this.normalize();
      this.scale(a);
    }
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number} a A numeric expression.
   */
  set magnitude(a) {
    this.normalize();
    this.scale(a);
  }

  /**
   * Adds A to this vector.
   * @param {Vec4} a A vector.
   */
  add(a) {
    this.x = this.x + a.x;
    this.y = this.y + a.y;
    this.z = this.z + a.z;
    this.w = this.w + a.w;
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec4} a A vector.
   */
  copy(a) {
    this.x = { ...a }.x;
    this.y = { ...a }.y;
    this.z = { ...a }.z;
    this.w = { ...a }.w;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   */
  normalize() {
    const MA = 1 / this.magnitude;
    this.x = this.x * MA;
    this.y = this.y * MA;
    this.z = this.z * MA;
    this.w = this.w * MA;
  }

  /**
   * Scales this vector by A.
   * @param {number} a A numeric expression.
   */
  scale(a) {
    this.x = this.x * a;
    this.y = this.y * a;
    this.z = this.z * a;
    this.w = this.w * a;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec4} a A vector.
   */
  subtract(a) {
    this.x = this.x - a.x;
    this.y = this.y - a.y;
    this.z = this.z - a.z;
    this.w = this.w - a.w;
  }
}
