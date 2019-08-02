/**
 * A four-dimensional vector class.
 */
export default class Vec4 {
  /**
   * Creates a four-dimensional vector pointing to X, Y, Z and W.
   * @param {number} x Numeric expression.
   * @param {number} y Numeric expression.
   * @param {number} z Numeric expression.
   * @param {number} w Numeric expression.
   */
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  ////////////////////
  // STATIC METHODS //
  ////////////////////

  /**
   * Returns a Vector equals to A plus B.
   * @param {Vec4} a Vector.
   * @param {number | Vec4} b A numeric expression or a Vector.
   */
  static add(a, b) {
    return b instanceof Vec4 ?
      new Vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w) :
      new Vec4(a.x + b, a.y + b, a.z + b, a.w + b);
  }

  /**
   * Returns the Chebyshev Distance.
   * 
   * - "Also known as the Chessboard Distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec4} a A Vector.
   * @param {Vec4} b A Vector.
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
   * Returns the Euclidian Distance of A to B.
   * @param {Vec4} a A Vector.
   * @param {Vec4} b A Vector.
   */
  static distanceEuclidian(a, b) {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    const P = (a.z - b.z);
    const Q = (a.w - b.w);
    return Math.sqrt((S * S) + (T * T) + (P * P) + (Q * Q));
  }

  /**
   * Returns the Manhattan Distance.
   * 
   * - "Inspired by the grid-like organization of Manhattan, this
   * is distance to the nearest points when you can only travel
   * around the boundaries."
   * 
   * - In other words: 
   * Only horizontal, vertical and diagonal (45 deg.) movements.
   * @param {Vec4} a A Vector.
   * @param {Vec4} b A Vector.
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
   * Returns the division of A by B.
   * @param {Vec4} a A Vector.
   * @param {number | Vec4} b A numeric expression or a Vector.
   */
  static divide(a, b) {
    return b instanceof Vec4 ?
      new Vec4(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w) :
      new Vec4(a.x / b, a.y / b, a.z / b, a.w / b);
  }

  /**
   * Returns the product of A by B.
   * @param {Vec4} a A Vector.
   * @param {number | Vec4} b A numeric expression or a Vector
   */
  static multiply(a, b) {
    return b instanceof Vec4 ?
      new Vec4(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w) :
      new Vec4(a.x * b, a.y * b, a.z * b, a.w * b);
  }

  /**
   * Returns a Vector equals to A minus B.
   * @param {Vec4} a A Vector.
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
   * Adds A to 'this' Vector.
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
   * Copy the coordinates of A to 'this' Vector.
   * @param {Vec4} a A Vector.
   */
  copy(a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
  }

  /**
   * Divides 'this' Vector by A.
   * @param {number | Vec4} a A numeric expression or a Vector.
   */
  divide(a) {
    if (a instanceof Vec4) {
      this.x = this.x / a.x;
      this.y = this.y / a.y;
      this.z = this.z / a.z;
      this.w = this.w / a.w;
    } else {
      this.x = this.x / a;
      this.y = this.y / a;
      this.z = this.z / a;
      this.w = this.w / a;
    }
  }

  /**
   * Returns the magnitude (size) of 'this' Vector (Pythagorean theorem).
   */
  getMagnitude() {
    return Math.sqrt(
      this.x * this.x +
      this.y * this.y +
      this.z * this.z +
      this.w * this.w
    );
  }

  /**
   * Limits the maximum size of 'this' Vector to the A value.
   * @param {number} a A numeric expression.
   */
  limit(a) {
    if (this.getMagnitude() > a) {
      this.normalize();
      this.multiply(a);
    }
  }

  /**
   * Multiplies 'this' Vector by A.
   * @param {number | Vec4} a A numeric expression or a Vector.
   */
  multiply(a) {
    if (a instanceof Vec4) {
      this.x = this.x * a.x;
      this.y = this.y * a.y;
      this.z = this.z * a.z;
      this.w = this.w * a.w;
    } else {
      this.x = this.x * a;
      this.y = this.y * a;
      this.z = this.z * a;
      this.w = this.w * a;

    }
  }

  /**
   * Sets to 1 'this' Vector's magnitude (Unit Vector).
   */
  normalize() {
    const MA = this.getMagnitude();
    this.x = this.x / MA;
    this.y = this.y / MA;
    this.z = this.z / MA;
    this.w = this.w / MA;
  }

  /**
   * Sets to A 'this' Vector's magnitude.
   * @param {number | Vec4} a A numeric expression or a Vector.
   */
  setMagnitude(a) {
    this.normalize();
    this.multiply(a);
  }

  /**
   * Subtracts A to 'this' Vector.
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
