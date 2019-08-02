/**
 * A three-dimensional vector class.
 */
export default class Vec3 {
  /**
   * Creates a three-dimensional vector pointing to X, Y and Z.
   * @param {number} x Numeric expression.
   * @param {number} y Numeric expression.
   * @param {number} z Numeric expression.
   */
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  ////////////////////
  // STATIC METHODS //
  ////////////////////

  /**
   * Returns a Vector equals to A plus B.
   * @param {Vec3} a Vector.
   * @param {number | Vec3} b A numeric expression or a Vector.
   */
  static add(a, b) {
    return b instanceof Vec3 ?
      new Vec3(a.x + b.x, a.y + b.y, a.z + b.z) :
      new Vec3(a.x + b, a.y + b, a.z + b);
  }

  /**
   * Returns the Chebyshev Distance.
   * 
   * - "Also known as the Chessboard Distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec3} a A Vector.
   * @param {Vec3} b A Vector.
   */
  static distanceChebyshev(a, b) {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y),
      Math.abs(a.z - b.z)
    );
  }

  /**
   * Returns the Euclidian Distance of A to B.
   * @param {Vec3} a A Vector.
   * @param {Vec3} b A Vector.
   */
  static distanceEuclidian(a, b) {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    const P = (a.z - b.z);
    return Math.sqrt((S * S) + (T * T) + (P * P));
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
   * @param {Vec3} a A Vector.
   * @param {Vec3} b A Vector.
   */
  static distanceManhattan(a, b) {
    return Math.sqrt(
      Math.abs(a.x - b.x) +
      Math.abs(a.y - b.y) +
      Math.abs(a.z - b.z)
    );
  }

  /**
   * Returns the division of A by B.
   * @param {Vec3} a A Vector.
   * @param {number | Vec3} b A numeric expression or a Vector.
   */
  static divide(a, b) {
    return b instanceof Vec3 ?
      new Vec3(a.x / b.x, a.y / b.y, a.z / b.z) :
      new Vec3(a.x / b, a.y / b, a.z / b);
  }

  /**
   * Returns the product of A by B.
   * @param {Vec3} a A Vector.
   * @param {number | Vec3} b A numeric expression or a Vector
   */
  static multiply(a, b) {
    return b instanceof Vec3 ?
      new Vec3(a.x * b.x, a.y * b.y, a.z * b.z) :
      new Vec3(a.x * b, a.y * b, a.z * b);
  }

  /**
   * Returns a Vector equals to A minus B.
   * @param {Vec3} a A Vector.
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
   * Adds A to 'this' Vector.
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
   * Copy the coordinates of A to 'this' Vector.
   * @param {Vec3} a A Vector.
   */
  copy(a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
  }

  /**
   * Divides 'this' Vector by A.
   * @param {number | Vec3} a A numeric expression or a Vector.
   */
  divide(a) {
    if (a instanceof Vec3) {
      this.x = this.x / a.x;
      this.y = this.y / a.y;
      this.z = this.z / a.z;
    } else {
      this.x = this.x / a;
      this.y = this.y / a;
      this.z = this.z / a;
    }
  }

  /**
   * Returns the magnitude (size) of 'this' Vector (Pythagorean theorem).
   */
  getMagnitude() {
    return Math.sqrt(
      this.x * this.x +
      this.y * this.y +
      this.z * this.z
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
   * @param {number | Vec3} a A numeric expression or a Vector.
   */
  multiply(a) {
    if (a instanceof Vec3) {
      this.x = this.x * a.x;
      this.y = this.y * a.y;
      this.z = this.z * a.z;
    } else {
      this.x = this.x * a;
      this.y = this.y * a;
      this.z = this.z * a;
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
  }

  /**
   * Sets to A 'this' Vector's magnitude.
   * @param {number | Vec3} a A numeric expression or a Vector.
   */
  setMagnitude(a) {
    this.normalize();
    this.multiply(a);
  }

  /**
   * Subtracts A to 'this' Vector.
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
