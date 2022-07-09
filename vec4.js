/**
 * A four-dimensional vector class.
 */
export default class Vec4 {
  /**
   * Creates a four-dimensional vector pointing to X, Y, Z and W.
   * @param {number} [x = 0] A numeric expression.
   * @param {number} [y = 0] A numeric expression.
   * @param {number} [z = 0] A numeric expression.
   * @param {number} [w = 0] A numeric expression.
   */
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
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
   * Returns the angle between A and B, interval [0, PI].
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} Value in radians.
   */
  static angleBetween(a, b) {
    const MA = a.magnitude;
    const MB = b.magnitude;
    if (MA === 0 || MB === 0) {
      console.error("Cannot divide by zero.");
      return NaN;
    }
    return Math.acos((
      a.x * b.x +
      a.y * b.y +
      a.z * b.z +
      a.w * b.w
    ) / (MA * MB));
  }

  /**
   * @param {Vec4} a A vector.
   * @returns {Vec4} A new vector identical to A.
   */
  static clone(a) {
    return new Vec4(
      a.x,
      a.y,
      a.z,
      a.w
    );
  }

  /**
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a, b) {
    const ABX = a.x - b.x;
    const ABY = a.y - b.y;
    const ABZ = a.z - b.z;
    const ABW = a.w - b.w;
    return Math.sqrt(
      ABX * ABX +
      ABY * ABY +
      ABZ * ABZ +
      ABW * ABW
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
   * - When powers to 1: It'll be equivalent to Manhattan distance.
   * - When powers to 2: It'll be equivalent to Euclidian distance.
   * - When powers to infinite: It'll be equivalent to Chebyshev distance.
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
   * Returns true if vectors A and B are equal (identical components).
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {boolean} The deep comparison result.
   */
  static equal(a, b) {
    return (
      a.x === b.x &&
      a.y === b.y &&
      a.z === b.z &&
      a.w === b.w
    );
  }

  /**
   * @param {Vec4} a A vector.
   * @returns {Vec4} A new vector identical to A.
   * @deprecated
   */
  static fromCopy(a) {
    return new Vec4(
      a.x,
      a.y,
      a.z,
      a.w
    );
  }

  /**
   * Linearly interpolates between a and b. Parameter t is clamped to the
   * range of [0, 1].
   * - Returns a when t = 0.
   * - Returns b when t = 1.
   * - Returns the point midway between a and b when t = 0.5.
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @param {number} t The interpolant aka. alpha.
   * @returns {Vec4} Linear interpolation between a and b.
   */
  static lerp(a, b, t) {
    if (t > 1) t = 1;
    else if (t < 0) t = 0;
    return new Vec4(
      a.x + (b.x - a.x) * t,
      a.y + (b.y - a.y) * t,
      a.z + (b.z - a.z) * t,
      a.w + (b.w - a.w) * t
    );
  }

  /**
   * Orthogonal projection of A onto B.
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {Vec4} The component of A projected on B (in direction of B).
   */
  static project(a, b) {
    return Vec4
      .clone(b)
      .normalize()
      .scale(a.magnitude * Math.cos(Vec4.angleBetween(a, b)));
  }

  /**
   * Returns a new vector with a random magnitude (between max and min) and
   * a uniformly distributed direction.
   * @param {number} [min = 0] Minumim magnitude value (inclusive).
   * @param {number} [max = 1] Maximum magnitude value (exclusive).
   * @returns {Vec4} A new vector.
   */
  static random(min = 0, max = 1) {
    const A = -.5 + Math.random();
    const B = -.5 + Math.random();
    const C = -.5 + Math.random();
    const D = -.5 + Math.random();
    const SQRT = Math.sqrt((1 - A * A - B * B) / (C * C + D * D));
    const random = new Vec4(A, B, C * SQRT, D * SQRT);
    random.magnitude = min + Math.random() * (max - min);
    return random;
  }

  /**
   * @param {Vec4} a A vector.
   * @param {Vec4} b A vector.
   * @returns {Vec4} A new vector equals to A minus B.
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
   * Angle relative to the w-axis, unsigned, interval [0, PI].
   * @returns {number} Value in radians.
   */
  get angleW() {
    return Math.atan2(Math.sqrt(
      this.x * this.x +
      this.y * this.y +
      this.z * this.z
    ), this.w);
  }

  /**
   * Angle relative to the x-axis, unsigned, interval [0, PI].
   * @returns {number} Value in radians.
   */
  get angleX() {
    return Math.atan2(Math.sqrt(
      this.y * this.y +
      this.z * this.z +
      this.w * this.w
    ), this.x);
  }

  /**
   * Angle relative to the y-axis, unsigned, interval [0, PI].
   * @returns {number} Value in radians.
   */
  get angleY() {
    return Math.atan2(Math.sqrt(
      this.z * this.z +
      this.w * this.w +
      this.x * this.x
    ), this.y);
  }

  /**
   * Angle relative to the z-axis, unsigned, interval [0, PI].
   * @returns {number} Value in radians.
   */
  get angleZ() {
    return Math.atan2(Math.sqrt(
      this.w * this.w +
      this.x * this.x +
      this.y * this.y
    ), this.z);
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
      this.x * this.x +
      this.y * this.y +
      this.z * this.z +
      this.w * this.w
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
   * A shortcut for an iterable array or values.
   * @returns {number[]} An array of numbers.
   */
  get rgba() {
    return [this.x, this.y, this.z, this.w];
  }

  /**
   * A shortcut for an iterable array or values.
   * @returns {number[]} An array of numbers.
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
   * @deprecated
   */
  set limit(max) {
    if (this.magnitude > max) {
      this.normalize();
      this.x *= max;
      this.y *= max;
      this.z *= max;
      this.w *= max;
    }
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number} m A numeric expression.
   */
  set magnitude(m) {
    this.normalize();
    this.x *= m;
    this.y *= m;
    this.z *= m;
    this.w *= m;
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
   * @param {number[]} rgba An array of numbers.
   */
  set rgba(rgba) {
    this.x = rgba[0];
    this.y = rgba[1];
    this.z = rgba[2];
    this.w = rgba[3];
  }

  /**
   * Sets all the components.
   * @param {number[]} xyzw An array of numbers.
   */
  set xyzw(xyzw) {
    this.x = xyzw[0];
    this.y = xyzw[1];
    this.z = xyzw[2];
    this.w = xyzw[3];
  }

  /**
   * Adds A to this vector.
   * @param {Vec4} a A vector.
   * @returns {Vec4} This vector.
   */
  add(a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    this.w += a.w;
    return this;
  }

  /**
   * Keeps the vector's magnitude between the given values, minimum
   * and maximum (inclusive).
   * @param {number} min A numeric expression.
   * @param {number} max A numeric expression.
   * @returns {Vec4} This vector.
   */
  clamp(min, max) {
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
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
    return this;
  }

  /**
   * Limits the maximim length of this vector.
   * @param {number} max A numeric expression.
   * @returns {Vec4} This vector.
   */
  limitMaxMagnitude(max) {
    const M = this.magnitude;
    if (M > max && M > 0) {
      this.normalize();
      this.x *= max;
      this.y *= max;
      this.z *= max;
      this.w *= max;
    }
    return this;
  }

  /**
   * Limits the minimim length of this vector.
   * @param {number} min A numeric expression.
   * @returns {Vec4} This vector.
   */
  limitMinMagnitude(min) {
    const M = this.magnitude;
    if (M < min && M > 0) {
      this.normalize();
      this.x *= min;
      this.y *= min;
      this.z *= min;
      this.w *= min;
    }
    return this;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   * @returns {Vec4} This vector.
   */
  normalize() {
    let m = this.magnitude;
    if (m === 0) return this;
    else m = 1 / m;
    this.x *= m;
    this.y *= m;
    this.z *= m;
    this.w *= m;
    return this;
  }

  /**
   * Scales this vector by a given factor.
   * @param {number} f A numeric expression.
   * @returns {Vec4} This vector.
   */
  scale(f) {
    this.x *= f;
    this.y *= f;
    this.z *= f;
    this.w *= f;
    return this;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec4} a A vector.
   * @returns {Vec4} This vector.
   */
  subtract(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    this.w -= a.w;
    return this;
  }
}
