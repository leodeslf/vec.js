/**
 * A two-dimensional vector class.
 */
export default class Vec2 {
  /**
   * Creates a two-dimensional vector pointing to X and Y.
   * @param {number} [x = 0] A numeric expression.
   * @param {number} [y = 0] A numeric expression.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
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
   * Returns the angle between A and B, interval (-PI, PI].
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} Value in radians.
   */
  static angleBetween(a, b) {
    return Math.atan2(
      b.y * a.x - b.x * a.y,
      b.x * a.x + b.y * a.y
    )
  }

  /**
   * @param {Vec2} a A vector.
   * @returns {Vec2} A new vector identical to A.
   */
  static clone(a) {
    return new Vec2(
      a.x,
      a.y
    );
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a, b) {
    const ABX = a.x - b.x;
    const ABY = a.y - b.y;
    return Math.sqrt(
      ABX * ABX +
      ABY * ABY
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
   * - When powers to 1: It'll be equivalent to Manhattan distance.
   * - When powers to 2: It'll be equivalent to Euclidian distance.
   * - When powers to infinite: It'll be equivalent to Chebyshev distance.
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
   * Returns true if vectors A and B are equal (identical components).
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {boolean} The deep comparison result.
   */
  static equal(a, b) {
    return (
      a.x === b.x &&
      a.y === b.y
    );
  }

  /**
   * @param {Vec2} a A vector.
   * @returns {Vec2} A new vector identical to A.
   * @deprecated
   */
  static fromCopy(a) {
    return new Vec2(
      a.x,
      a.y
    );
  }

  /**
   * @param {number} r A numeric expression.
   * @param {number} phi Angle from positive x-axis in radians.
   * @returns {Vec2} A new vector created from Polar Coordinates.
   */
  static fromPolarCoords(r, phi) {
    return new Vec2(
      r * Math.cos(phi),
      r * Math.sin(phi)
    );
  }

  /**
   * Linearly interpolates between a and b. Parameter t is clamped to the
   * range of [0, 1].
   * - Returns a when t = 0.
   * - Returns b when t = 1.
   * - Returns the point midway between a and b when t = 0.5.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @param {number} t The interpolant aka. alpha.
   * @returns {Vec2} Linear interpolation between a and b.
   */
  static lerp(a, b, t) {
    if (t > 1) t = 1;
    else if (t < 0) t = 0;
    return new Vec2(
      a.x + (b.x - a.x) * t,
      a.y + (b.y - a.y) * t
    );
  }

  /**
   * Orthogonal projection of A onto B.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} The component of A projected on B (in direction of B).
   */
  static project(a, b) {
    return Vec2
      .clone(b)
      .normalize()
      .scale(a.magnitude * Math.cos(Vec2.angleBetween(a, b)));
  }

  /**
   * Returns a new vector with a random magnitude (between max and min) and
   * a uniformly distributed direction.
   * @param {number} [min = 0] Minumim magnitude value (inclusive).
   * @param {number} [max = 1] Maximum magnitude value (exclusive).
   * @returns {Vec2} A new vector.
   */
  static random(min = 0, max = 1) {
    const R = min + Math.random() * (max - min);
    const PHI = Math.random() * Math.PI * 2;
    return new Vec2(
      R * Math.cos(PHI),
      R * Math.sin(PHI)
    );
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
   * Angle relative to the positive x-axis, signed, interval (-PI, PI].
   * @returns {number} Value in radians.
   */
  get angleX() {
    return Math.atan2(
      this.y,
      this.x
    );
  }

  /**
   * Angle relative to the positive y-axis, signed, interval (-PI, PI].
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
      this.x * this.x +
      this.y * this.y
    );
  }

  /**
   * A shortcut for an iterable array or values.
   * @returns {number[]} An array of numbers.
   */
  get xy() {
    return [this.x, this.y];
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
  }

  /**
   * Sets all the components.
   * @param {number[]} xy An array of numbers.
   */
  set xy(xy) {
    this.x = xy[0];
    this.y = xy[1];
  }

  /**
   * Adds A to this vector.
   * @param {Vec2} a A vector.
   * @returns {Vec2} This vector.
   */
  add(a) {
    this.x += a.x;
    this.y += a.y;
    return this;
  }

  /**
   * Keeps the vector's magnitude between the given values, minimum
   * and maximum (inclusive).
   * @param {number} min A numeric expression.
   * @param {number} max A numeric expression.
   * @returns {Vec2} This vector.
   */
  clamp(min, max) {
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
    this.x = a.x;
    this.y = a.y;
    return this;
  }

  /**
   * Limits the maximim length of this vector.
   * @param {number} max A numeric expression.
   * @returns {Vec2} This vector.
   */
  limitMaxMagnitude(max) {
    const M = this.magnitude;
    if (M > max && M > 0) {
      this.normalize();
      this.x *= max;
      this.y *= max;
    }
    return this;
  }

  /**
   * Limits the minimim length of this vector.
   * @param {number} min A numeric expression.
   * @returns {Vec2} This vector.
   */
  limitMinMagnitude(min) {
    const M = this.magnitude;
    if (M < min && M > 0) {
      this.normalize();
      this.x *= min;
      this.y *= min;
    }
    return this;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   * @returns {Vec2} This vector.
   */
  normalize() {
    let m = this.magnitude;
    if (m === 0) return this;
    else m = 1 / m;
    this.x *= m;
    this.y *= m;
    return this;
  }

  /**
   * Rotates this vector on z-axis by phi.
   * @param {number} phi Angle in radians.
   * @returns {Vec2} This vector.
   */
  rotateAxisZ(phi) {
    [this.x, this.y] = [
      this.x * Math.cos(phi) + this.y * -Math.sin(phi),
      this.x * Math.sin(phi) + this.y * Math.cos(phi)
    ];
    return this;
  }

  /**
   * Scales this vector by a given factor.
   * @param {number} f A numeric expression.
   * @returns {Vec2} This vector.
   */
  scale(f) {
    this.x *= f;
    this.y *= f;
    return this;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec2} a A vector.
   * @returns {Vec2} This vector.
   */
  subtract(a) {
    this.x -= a.x;
    this.y -= a.y;
    return this;
  }
}

