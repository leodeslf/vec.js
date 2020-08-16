/**
 * Vectors class and utilities.
 */
class Vec {
  /**
   * @param {number} x Numeric expression.
   * @param {number} y Numeric expression.
   * @param {number} z Numeric expression.
   * @param {number} w Numeric expression.
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
   * @param {number} x Numeric expression.
   * @param {number} y Numeric expression.
   */
  constructor(x, y) {
    super(x, y);
  }

  ////////////////////
  // STATIC METHODS //
  ////////////////////

  /**
   * Returns a vector equals to A plus B.
   * @param {Vec2} a Vector.
   * @param {number | Vec2} b A numeric expression or a Vector.
   */
  static add(a, b) {
    return b instanceof Vec2 ?
      new Vec2(a.x + b.x, a.y + b.y) :
      new Vec2(a.x + b, a.y + b);
  }

  /**
   * Creates a vector using Polar Coordinates.
   * @param {number} radius Numeric expression.
   * @param {number} angle Numeric expression (angle measured in radians).
   */
  static byPolarCoords(radius, angle) {
    return new Vec2(
      radius * Math.cos(angle),
      radius * Math.sin(angle)
    );
  }

  /**
   * Returns the distance from A to B.
   * @param {Vec2} a Vector.
   * @param {Vec2} b Vector.
   */
  static distance(a, b) {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    return Math.sqrt((S * S) + (T * T));
  }

  /**
   * Returns the Chebyshev distance from A to B.
   * 
   * - "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec2} a Vector.
   * @param {Vec2} b Vector.
   */
  static distanceChebyshev(a, b) {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y)
    );
  }

  /**
   * Returns the Manhattan distance from A to B.
   * 
   * - "Inspired by the grid-like organization of Manhattan, this
   * is distance to the nearest points when you can only travel
   * around the boundaries."
   * 
   * - In other words: 
   * Only horizontal, vertical and diagonal (45 deg.) movements.
   * @param {Vec2} a Vector.
   * @param {Vec2} b Vector.
   */
  static distanceManhattan(a, b) {
    return Math.sqrt(
      Math.abs(a.x - b.x) +
      Math.abs(a.y - b.y)
    );
  }

	/**
	 * Returns the Minkowski distance from A to B.
     * 
     * - It takes an exponent parameter (e), and the results can be similar
     * or even equivalent to Chebyshev, Euclidian and Manhattan.
     * 
     * - If { p = 1 }: It'll be equivalent to Manhattan distance.
     * 
     * - If { p = 2 }: It'll be equivalent to Euclidian distance.
     * 
     * - If { p = infinite }: It'll be equivalent to Chebyshev distance.
	 *
	 * @param {Vec2} a Vector.
	 * @param {Vec2} b Vector.
   * @param {number} e A numeric expression.
	 */
  static distanceMinkowski(a, b, e) {
    return (
      (
        Math.abs(a.x - b.x) ** e +
        Math.abs(a.y - b.y) ** e
      ) ** (1 / e)
    );
  }

  /**
   * Returns a vector equals to A minus B.
   * @param {Vec2} a Vector.
   * @param {number | Vec2} b A numeric expression or a Vector.
   */
  static subtract(a, b) {
    return b instanceof Vec2 ?
      new Vec2(a.x - b.x, a.y - b.y) :
      new Vec2(a.x - b, a.y - b);
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
   * Resturns the magnitude of this vector.
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
      this.multiply(a);
    }
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number | Vec2} a A numeric expression or a Vector.
   */
  set magnitude(a) {
    this.normalize();
    this.multiply(a);
  }

  /**
   * Adds A to this vector.
   * @param {number | Vec2} a A numeric expression or a Vector.
   */
  add(a) {
    if (a instanceof Vec2) {
      this.x = this.x + a.x;
      this.y = this.y + a.y;
    } else {
      this.x = this.x + a;
      this.y = this.y + a;
    }
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec2} a Vector.
   */
  copy(a) {
    this.x = a.x;
    this.y = a.y;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   */
  normalize() {
    const MA = this.magnitude;
    this.x = this.x / MA;
    this.y = this.y / MA;
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
   * @param {number | Vec2} a A numeric expression or a Vector.
   */
  subtract(a) {
    if (a instanceof Vec2) {
      this.x = this.x - a.x;
      this.y = this.y - a.y;
    } else {
      this.x = this.x - a;
      this.y = this.y - a;
    }
  }
}

/**
 * A three-dimensional vector class.
 */
export class Vec3 extends Vec {
  /**
   * Creates a three-dimensional vector pointing to X, Y and Z.
   * @param {number} x Numeric expression.
   * @param {number} y Numeric expression.
   * @param {number} z Numeric expression.
   */
  constructor(x, y, z) {
    super(x, y, z);
  }

  ////////////////////
  // STATIC METHODS //
  ////////////////////

  /**
   * Returns a vector equals to A plus B.
   * @param {Vec3} a Vector.
   * @param {number | Vec3} b A numeric expression or a Vector.
   */
  static add(a, b) {
    return b instanceof Vec3 ?
      new Vec3(a.x + b.x, a.y + b.y, a.z + b.z) :
      new Vec3(a.x + b, a.y + b, a.z + b);
  }

  /**
   * Returns the Euclidian Distance from A to B.
   * @param {Vec3} a Vector.
   * @param {Vec3} b Vector.
   */
  static distance(a, b) {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    const P = (a.z - b.z);
    return Math.sqrt((S * S) + (T * T) + (P * P));
  }

  /**
   * Returns the Chebyshev Distance from A to B.
   * 
   * - "Also known as the Chessboard Distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec3} a Vector.
   * @param {Vec3} b Vector.
   */
  static distanceChebyshev(a, b) {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y),
      Math.abs(a.z - b.z)
    );
  }

  /**
   * Returns the Manhattan Distance from A to B.
   * 
   * - "Inspired by the grid-like organization of Manhattan, this
   * is distance to the nearest points when you can only travel
   * around the boundaries."
   * 
   * - In other words: 
   * Only horizontal, vertical and diagonal (45 deg.) movements.
   * @param {Vec3} a Vector.
   * @param {Vec3} b Vector.
   */
  static distanceManhattan(a, b) {
    return Math.sqrt(
      Math.abs(a.x - b.x) +
      Math.abs(a.y - b.y) +
      Math.abs(a.z - b.z)
    );
  }

	/**
	 * Returns the Minkowski Distance from A to B.
     * 
     * - It takes an exponent parameter (e), and the results can be similar
     * or even equivalent to Chebyshev, Euclidian and Manhattan.
     * 
     * - If { p = 1 }: It'll be equivalent to Manhattan distance.
     * 
     * - If { p = 2 }: It'll be equivalent to Euclidian distance.
     * 
     * - If { p = infinite }: It'll be equivalent to Chebyshev distance.
	 *
	 * @param {Vec3} a Vector.
	 * @param {Vec3} b Vector.
   * @param {number} e A numeric expression.
	 */
  static distanceMinkowski(a, b, e) {
    return (
      (
        Math.abs(a.x - b.x) ** e +
        Math.abs(a.y - b.y) ** e +
        Math.abs(a.z - b.z) ** e
      ) ** (1 / e)
    );
  }

  /**
   * Returns a Vector equals to A minus B.
   * @param {Vec3} a Vector.
   * @param {number | Vec3} b A numeric expression or a Vector.
   */
  static subtract(a, b) {
    return b instanceof Vec3 ?
      new Vec3(a.x - b.x, a.y - b.y, a.z - b.z) :
      new Vec3(a.x - b, a.y - b, a.z - b);
  }

  //////////////////////
  // INSTANCE METHODS //
  //////////////////////

  /**
   * Returns the angle relative to the positive x-axis (in radians).
   * Values between PI and -PI.
   */
  get angleX() {
    return Math.atan2(Math.sqrt(this.y ** 2 + this.z ** 2), this.x);
  }

  /**
   * Returns the angle relative to the positive y-axis (in radians).
   * Values between PI and -PI.
   */
  get angleY() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.z ** 2), this.y);
  }

  /**
   * Returns the angle relative to the positive z-axis (in radians).
   * Values between PI and -PI.
   */
  get angleZ() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.y ** 2), this.z);
  }

  /**
   * Resturns the magnitude of this vector.
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
      this.multiply(a);
    }
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number | Vec3} a A numeric expression or a Vector.
   */
  set magnitude(a) {
    this.normalize();
    this.multiply(a);
  }

  /**
   * Adds A to this vector.
   * @param {number | Vec3} a A numeric expression or a Vector.
   */
  add(a) {
    if (a instanceof Vec3) {
      this.x = this.x + a.x;
      this.y = this.y + a.y;
      this.z = this.z + a.z;
    } else {
      this.x = this.x + a;
      this.y = this.y + a;
      this.z = this.z + a;
    }
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec3} a Vector.
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
    const MA = this.magnitude;
    this.x = this.x / MA;
    this.y = this.y / MA;
    this.z = this.z / MA;
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
   * @param {number | Vec3} a A numeric expression or a Vector.
   */
  subtract(a) {
    if (a instanceof Vec3) {
      this.x = this.x - a.x;
      this.y = this.y - a.y;
      this.z = this.z - a.z;
    } else {
      this.x = this.x - a;
      this.y = this.y - a;
      this.z = this.z - a;
    }
  }
}

/**
 * A four-dimensional vector class.
 */
export class Vec4 extends Vec {
  /**
   * Creates a four-dimensional vector pointing to X, Y, Z and W.
   * @param {number} x Numeric expression.
   * @param {number} y Numeric expression.
   * @param {number} z Numeric expression.
   * @param {number} w Numeric expression.
   */
  constructor(x, y, z, w) {
    super(x, y, z, w);
  }

  ////////////////////
  // STATIC METHODS //
  ////////////////////

  /**
   * Returns a vector equals to A plus B.
   * @param {Vec4} a Vector.
   * @param {number | Vec4} b A numeric expression or a Vector.
   * @returns {Vec4} Vector. 
   */
  static add(a, b) {
    return b instanceof Vec4 ?
      new Vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w) :
      new Vec4(a.x + b, a.y + b, a.z + b, a.w + b);
  }

  /**
   * Returns the Chebyshev distance from A to B.
   * 
   * - "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec4} a Vector.
   * @param {Vec4} b Vector.
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
   * Returns the Euclidian distance from A to B.
   * @param {Vec4} a Vector.
   * @param {Vec4} b Vector.
   */
  static distanceEuclidian(a, b) {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    const P = (a.z - b.z);
    const Q = (a.w - b.w);
    return Math.sqrt((S * S) + (T * T) + (P * P) + (Q * Q));
  }

  /**
   * Returns the Manhattan distance from A to B.
   * 
   * - "Inspired by the grid-like organization of Manhattan, this
   * is distance to the nearest points when you can only travel
   * around the boundaries."
   * 
   * - In other words: 
   * Only horizontal, vertical and diagonal (45 deg.) movements.
   * @param {Vec4} a Vector.
   * @param {Vec4} b Vector.
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
	 * Returns the Minkowski distance from A to B.
     * 
     * - It takes an exponent parameter (e), and the results can be similar
     * or even equivalent to Chebyshev, Euclidian and Manhattan.
     * 
     * - If { p = 1 }: It'll be equivalent to Manhattan distance.
     * 
     * - If { p = 2 }: It'll be equivalent to Euclidian distance.
     * 
     * - If { p = infinite }: It'll be equivalent to Chebyshev distance.
	 *
	 * @param {Vec4} a Vector.
	 * @param {Vec4} b Vector.
   * @param {number} e A numeric expression.
	 */
  static distanceMinkowski(a, b, e) {
    return (
      (
        Math.abs(a.x - b.x) ** e +
        Math.abs(a.y - b.y) ** e +
        Math.abs(a.z - b.z) ** e +
        Math.abs(a.w - b.w) ** e
      ) ** (1 / e)
    );
  }

  /**
   * Subtracts A from this vector.
   * Returns a vector equals to A minus B.
   * @param {Vec4} a Vector.
   * @param {number | Vec4} b A numeric expression or a Vector.
   */
  static subtract(a, b) {
    return b instanceof Vec4 ?
      new Vec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w) :
      new Vec4(a.x - b, a.y - b, a.z - b, a.w - b);
  }

  //////////////////////
  // INSTANCE METHODS //
  //////////////////////

  /**
   * Returns the angle relative to the positive x-axis (in radians).
   * Values between PI and -PI.
   */
  get angleX() {
    return Math.atan2(Math.sqrt(this.y ** 2 + this.z ** 2), this.x);
  }

  /**
   * Returns the angle relative to the positive y-axis (in radians).
   * Values between PI and -PI.
   */
  get angleY() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.z ** 2), this.y);
  }

  /**
   * Returns the angle relative to the positive z-axis (in radians).
   * Values between PI and -PI.
   */
  get angleZ() {
    return Math.atan2(Math.sqrt(this.x ** 2 + this.y ** 2), this.z);
  }

  /**
   * Resturns the magnitude of this vector.
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
   * @param {number | Vec4} a A numeric expression or a Vector.
   */
  add(a) {
    if (a instanceof Vec4) {
      this.x = this.x + a.x;
      this.y = this.y + a.y;
      this.z = this.z + a.z;
      this.w = this.w + a.w;
    } else {
      this.x = this.x + a;
      this.y = this.y + a;
      this.z = this.z + a;
      this.w = this.w + a;
    }
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec4} a Vector.
   */
  copy(a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   */
  normalize() {
    const MA = this.magnitude;
    this.x = this.x / MA;
    this.y = this.y / MA;
    this.z = this.z / MA;
    this.w = this.w / MA;
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
   * @param {number | Vec4} a A numeric expression or a Vector.
   */
  subtract(a) {
    if (a instanceof Vec4) {
      this.x = this.x - a.x;
      this.y = this.y - a.y;
      this.z = this.z - a.z;
      this.w = this.w - a.w;
    } else {
      this.x = this.x - a;
      this.y = this.y - a;
      this.z = this.z - a;
      this.w = this.w - a;
    }
  }
}
