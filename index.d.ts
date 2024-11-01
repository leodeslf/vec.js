// #region Vec2

declare interface Vec2PropertiesBase {
  /**
   * The `magnitude` of this vector.
   */
  magnitude: number;

  /**
   * The squared `magnitude` of this vector.
   */
  readonly magnitudeSq: number;

  /**
   * The `x` component of this vector.
   */
  x: number;

  /**
   * The `y` component of this vector.
   */
  y: number;

  /**
   * Iterator method for this vector.
   * @yields This vector's components.
   */
  [Symbol.iterator](): Generator<number, void, undefined>;
}

declare interface Vec2Properties extends Vec2PropertiesBase {
  /**
   * Angle relative the x-axis towards the positive y-axis (counter-clockwise),
   * interval [0, 2PI). Value in radians.
   */
  angleX: number;

  /**
   * Angle relative the y-axis towards the negative x-axis (counter-clockwise),
   * interval [0, 2PI). Value in radians.
   */
  angleY: number;

  /**
   * Shortcut to get all the components of this vector as an array.
   */
  xy: number[];
}

declare interface Vec2MethodsBase<Vec> {
  /**
   * Adds vector `v` to this vector.
   * @param v A vector.
   * @returns This vector.
   */
  add(v: Vec): this;

  /**
   * Keeps the `magnitude` of this vector between the given minimum and maximum
   * values (inclusive).
   * @param max A numeric value.
   * @param min A numeric value.
   * @returns This vector.
   */
  clamp(min: number, max: number): this;

  /**
   * Returns a new copy of this vector.
   * @returns A new vector.
   */
  clone(): Vec;

  /**
   * Copy each component from vector `v` to this vector.
   * @param v A vector.
   * @returns This vector.
   */
  copy(v: Vec): this;

  /**
   * Computes the distance from this vector to vector `v` (with the {@link https://en.wikipedia.org/wiki/Euclidean_distance Euclidean metric}).
   * @param v A vector.
   * @returns Euclidean distance.
   */
  distance(v: Vec): number;

  /**
   * Computes the squared distance from this vector to vector `v` (with the 
   * Euclidean metric).
   * @param v A vector.
   * @returns Euclidean distance squared.
   */
  distanceSq(v: Vec): number;

  /**
   * The {@link https://en.wikipedia.org/wiki/Dot_product dot product} (aka.
   * scalar product or inner product) measures how much this vector and vector
   * `v` point in the same direction.
   * 
   * - When pointing in the same direction: we get the largest value.
   * - When the angle between is 90 degrees: we get 0.
   * - When pointing in opposite directions: we inverse the largest value.
   * @param v A vector.
   * @returns The dot product.
   */
  dot(v: Vec): number;

  /**
   * Checks whether or not this vector is infinite.
   * @returns Boolean result.
   */
  isInfinite(): boolean;

  /**
   * Checks whether or not a component of this vector is `NaN`.
   * @returns Boolean result.
   */
  isNaN(): boolean;

  /**
   * Checks whether or not this vector has a magnitude of zero.
   * @returns Boolean result.
   */
  isZero(): boolean;

  /**
   * Limits the maximum `magnitude` of this vector to the given value.
   * @param max A numeric value.
   * @returns This vector.
   */
  limitMax(max: number): this;

  /**
   * Limits the minimum `magnitude` of this vector to the given value.
   * @param min A numeric value.
   * @returns This vector.
   */
  limitMin(min: number): this;

  /**
   * Points this vector in direction of vector `v`.
   * @param v A vector.
   * @returns This vector.
   */
  lookAt(v: Vec): this;

  /**
   * Transforms this vector into its negation (aka. opposite).
   * @returns This vector.
   */
  negate(): this;

  /**
   * Transforms this vector into a unit vector (i.e.: `magnitude` = 1).
   * @returns This vector.
   */
  normalize(): this;

  /**
   * Transforms this vector into the orthogonal projection of itself onto `v`,
   * i.e.: the component of this vector projected on `v` (in direction of `v`).
   * @param v A vector.
   * @returns This vector.
   */
  project(v: Vec): this;

  /**
   * Randomizes the direction of this vector keeping its `magnitude`.
   * @returns This vector.
   */
  random(): this;

  /**
   * A rotation about the z-axis moving the positive x-axis towards the positive
   * y-axis by `phi`.
   * @param phi Angle in radians.
   * @returns This vector.
   */
  rotateZ(phi: number): this;

  /**
   * Checks whether or not this vector and vector `v` satisfy the equality
   * definition.
   * @param v A vector.
   * @returns Boolean result.
   */
  satisfyEquality(v: Vec): boolean;

  /**
   * Checks whether or not this vector and vector `v` satisfy the opposition
   * definition.
   * @param v A vector.
   * @returns Boolean result.
   */
  satisfyOpposition(v: Vec): boolean;

  /**
   * Transforms this vector into the scalar multiplication of itself by a given
   * scalar `c`.
   * @param c A numeric value.
   * @returns This vector.
   */
  scale(c: number): this;

  /**
   * Subtracts vector `v` from this vector.
   * @param v A vector.
   * @returns This vector.
   */
  subtract(v: Vec): this;

  /**
   * Transforms this vector into a zero vector (i.e.: `magnitude` = 0).
   * @returns This vector.
   */
  zero(): this;
}

declare interface Vec2Methods extends Vec2MethodsBase<Vec2> {
  /**
   * Returns the angle between this vector and vector `v`. Interval (-PI, PI].
   * @param v A vector.
   * @returns Value in radians.
   */
  angleBetween(v: Vec2): number;

  /**
   * Points this vector to its left, a z-axis rotation of 90 degrees (0.5PI).
   * @returns This vector.
   */
  turnLeft(): this;

  /**
   * Points this vector to its right, a z-axis rotation of -90 degrees (-0.5PI).
   * @returns This vector.
   */
  turnRight(): this;
}

declare interface Vec2 extends Vec2Properties, Vec2Methods { }

declare interface Vec2ImmutableBase extends Readonly<Vec2PropertiesBase> {
  /**
   * The boolean condition of infinity of this vector.
   */
  readonly isInfinite: boolean;

  /**
   * The boolean condition of NaN of this vector.
   */
  readonly isNaN: boolean;

  /**
   * The boolean condition of zero of this vector.
   */
  readonly isZero: boolean;
}

declare interface Vec2Immutable extends
  Vec2ImmutableBase, Readonly<Vec2Properties> { }

declare interface Vec2ConstructorBase<Vec> {
  /**
   * Returns the addition of `v` plus `w`.
   * @param v A vector.
   * @param w A vector.
   * @returns A new vector.
   */
  add(v: Vec, w: Vec): Vec;

  /**
   * Computes the distance from `v` to `w` with the {@link https://en.wikipedia.org/wiki/Euclidean_distance Euclidean metric}.
   * @param v A vector.
   * @param w A vector.
   * @returns Euclidean distance.
   */
  distance(v: Vec, w: Vec): number;

  /**
   * Computes the distance from `v` to `w` with the {@link https://en.wikipedia.org/wiki/Chebyshev_distance Chebyshev metric}.
   * 
   * "Also known as the Chessboard distance, it is somewhat similar to the
   * Manhattan distance, but with 45 degrees rotation."
   * @param v A vector.
   * @param w A vector.
   * @returns Chebyshev distance.
   */
  distanceChebyshev(v: Vec, w: Vec): number;

  /**
   * Computes the distance from `v` to `w` with the {@link https://en.wikipedia.org/wiki/Taxicab_geometry Manhattan metric}
   * (aka. taxicab metric). Given two points, it is the sum of the absolute
   * differences of their components.
   * 
   * "Inspired by the grid-like organization of Manhattan, this is distance to
   * the nearest points when you can only travel around the boundaries." I.e.:
   * Only horizontal, vertical and diagonal (45 degrees) movements.
   * @param v A vector.
   * @param w A vector.
   * @returns Manhattan distance.
   */
  distanceManhattan(v: Vec, w: Vec): number;

  /**
   * Computes the distance from `v` to `w` with the Minkowski metric.
   * 
   * Said to be a generalization of the Euclidean distance, Manhattan distance,
   * and Chebyshev distance, the {@link https://en.wikipedia.org/wiki/Minkowski_distance Minkowski metric}
   * is a distance of order `p` which can be equivalent to:
   * 
   * - Manhattan distance when `p` = 1.
   * - Euclidean distance when `p` = 2.
   * - Chebyshev distance when `p` = Infinite.
   * @param v A vector.
   * @param w A vector.
   * @param p A numeric value equal to or greater than 1.
   * @returns Minkowski distance.
   */
  distanceMinkowski(v: Vec, w: Vec, p: number): number;

  /**
   * Computes the squared distance from `v` to `w` with the Euclidean metric.
   * @param v A vector.
   * @param w A vector.
   * @returns Euclidean distance squared.
   */
  distanceSq(v: Vec, w: Vec): number;

  /**
   * The {@link https://en.wikipedia.org/wiki/Dot_product dot product} (aka.
   * scalar product or inner product) measures how much `v` and `w` point in the
   * same direction.
   * 
   * - When pointing in the same direction: we get the largest value.
   * - When the angle between is 90 degrees: we get 0.
   * - When pointing in opposite directions: we inverse the largest value.
   * @param v A vector.
   * @param w A vector.
   * @returns The dot product.
   */
  dot(v: Vec, w: Vec): number;

  /**
   * Checks whether or not vector `v` is infinite.
   * @param v A vector.
   * @returns Boolean result.
   */
  isInfinite(v: Vec): boolean;

  /**
   * Checks whether or not a component of vector `v` is `NaN`.
   * @param v A vector.
   * @returns Boolean result.
   */
  isNaN(v: Vec): boolean;

  /**
   * Checks whether or not vector `v` has a magnitude of zero.
   * @param v A vector.
   * @returns Boolean result.
   */
  isZero(v: Vec): boolean;

  /**
   * Linearly interpolates between `v` and `w`. Parameter `t` is clamped to the
   * range of [0, 1].
   * 
   * - Returns `v` when `t` = 0.
   * - Returns `w` when `t` = 1.
   * - Returns the point midway between `v` and `w` when `t` = 0.5.
   * @param v A vector.
   * @param w A vector.
   * @param t The interpolant (aka. alpha), a numeric value.
   * @returns A new Vector.
   */
  lerp(v: Vec, w: Vec, t: number): Vec;

  /**
   * Returns the negation (aka. opposite) of vector `v`.
   * @param v A vector.
   * @returns A new vector.
   */
  negate(v: Vec): Vec;

  /**
   * Returns a unit vector (i.e.: `magnitude` = 1) from vector `v`.
   * @param v A vector.
   * @returns A new Vector.
   */
  normalize(v: Vec): Vec;

  /**
   * Returns a vector that is the orthogonal projection of `v` onto `w`, i.e.:
   * the component of `v` projected on `w` (in direction of `w`).
   * @param v A vector.
   * @param w A vector.
   * @returns The projection vector.
   */
  project(v: Vec, w: Vec): Vec;

  /**
   * Checks whether or not `v` and `w` satisfy the equality definition.
   * @param v A vector.
   * @param w A vector.
   * @returns Boolean result.
   */
  satisfyEquality(v: Vec, w: Vec): boolean;

  /**
   * Checks whether or not `v` and `w` satisfy the opposition definition.
   * @param v A vector.
   * @param w A vector.
   * @returns Boolean result.
   */
  satisfyOpposition(v: Vec, w: Vec): boolean;

  /**
   * Returns the scalar multiplication of `v` by a given scalar `c`.
   * @param v A vector.
   * @param c A numeric value.
   * @returns A new vector.
   */
  scale(v: Vec, c: number): Vec;

  /**
   * Returns the subtraction of `v` minus `w`.
   * @param v A vector.
   * @param w A vector.
   * @returns A new vector.
   */
  subtract(v: Vec, w: Vec): Vec;

  /**
   * Returns a zero vector (i.e.: pointing to the origin).
   * @returns A new Vector.
   */
  zero(v: Vec): Vec;
}

declare interface Vec2Constructor extends Vec2ConstructorBase<Vec2> {
  /**
   * Creates a 2-dimensional vector pointing to `x` and `y`.
   * @param x A numeric value.
   * @param y A numeric value.
   */
  new(x?: number, y?: number): Vec2;

  /**
   * Returns the angle between `v` and `w`. Interval (-PI, PI].
   * @param v A vector.
   * @param w A vector.
   * @returns Value in radians.
   */
  angleBetween(v: Vec2, w: Vec2): number;

  /**
   * Returns a new vector created from polar coordinates (denoted by ρ, θ).
   * @param r Radius, a numeric value.
   * @param theta Polar angle relative to the positive x-axis in radians, a numeric value.
   * @returns A new vector.
   */
  fromPolarCoords(r: number, theta: number): Vec2;

  /** 
   * Creates an immutable vector. It works faster than a regular instance while
   * while keeping a compatible interface; its only members are precomputed,
   * read-only properties.
   * @param x A numeric value.
   * @param y A numeric value.
   * @returns An immutable vector.
   */
  immutable(x?: number, y?: number): Vec2Immutable;

  /**
   * Returns a random vector uniformly distributed on the circumference of a
   * unit circle. Method by Marsaglia (1972).
   * @returns A new vector.
   */
  random(): Vec2;
}

// #region Vec3

declare interface Vec3PropertiesBase extends Vec2PropertiesBase {
  /**
   * The `z` component of this vector.
   */
  z: number;

  /**
   * Alias for the `z` component of this vector.
   */
  b: number;

  /**
   * Alias for the `y` component of this vector.
   */
  g: number;

  /**
   * Alias for the `x` component of this vector.
   */
  r: number;
}

declare interface Vec3Properties extends Vec3PropertiesBase {
  /**
   * Angle relative to the positive x-axis towards the point defined by (y,
   * z). Interval [0, PI]. Value in radians.
   */
  angleX: number;

  /**
   * Angle relative to the positive y-axis towards the point defined by (z,
   * x). Interval [0, PI]. Value in radians.
   */
  angleY: number;

  /**
   * Angle relative to the positive z-axis towards the point defined by (x,
   * y). Interval [0, PI]. Value in radians.
   */
  angleZ: number;

  /**
   * Alias to get all the components of this vector as an array.
   */
  rgb: number[];

  /**
   * Shortcut to get all the components of this vector as an array.
   */
  xyz: number[];
}

declare interface Vec3MethodsBase<Vec> extends Vec2MethodsBase<Vec> {
  /**
   * Returns the angle between this vector and vector `v`. Interval [0, PI].
   * @param v A vector.
   * @returns Value in radians.
   */
  angleBetween(v: Vec): number;
}

declare interface Vec3Methods extends Vec3MethodsBase<Vec3> {
  /**
   * Transforms this vector into the {@link https://en.wikipedia.org/wiki/Cross_product cross product}
   * (aka. vector product) of itself cross `v`, which is perpendicular to both
   * of them and whose magnitude measures the area they span.
   * 
   * - When pointing in either the same or opposite directions: we get 0.
   * - When the angle between is 90 degrees: we get the largest value.
   * @param v A vector.
   * @returns This vector.
   */
  cross(v: Vec3): this;

  /**
   * A rotation about the x-axis moving the positive y-axis towards the
   * positive z-axis by `phi`.
   * @param phi Angle in radians, a numeric value.
   * @returns This vector.
   */
  rotateX(phi: number): this;

  /**
   * A rotation about the y-axis moving the positive x-axis towards the
   * positive z-axis by `phi`.
   * @param phi Angle in radians, a numeric value.
   * @returns This vector.
   */
  rotateY(phi: number): this;
}

declare interface Vec3 extends Vec3Properties, Vec3Methods { }

declare interface Vec3ImmutableBase extends Vec2ImmutableBase, Readonly<Vec3PropertiesBase> { }

declare interface Vec3Immutable extends
  Vec3ImmutableBase, Readonly<Vec3Properties> {
}

declare interface Vec3ConstructorBase<Vec> extends Vec2ConstructorBase<Vec> {
  /**
   * Returns the angle between `v` and `w`. Interval [0, PI].
   * @param v A vector.
   * @param w A vector.
   * @returns Value in radians.
   */
  angleBetween(v: Vec, w: Vec): number;
}

declare interface Vec3Constructor extends Vec3ConstructorBase<Vec3> {
  /**
   * Creates a 3-dimensional vector pointing to `x`, `y`, and `z`.
   * @param x A numeric value.
   * @param y A numeric value.
   * @param z A numeric value.
   */
  new(x?: number, y?: number, z?: number): Vec3;

  /**
   * The {@link https://en.wikipedia.org/wiki/Cross_product cross product}
   * (aka. vector product) of `v` cross `w`, which is perpendicular to both of
   * them and whose magnitude measures the area they span.
   * 
   * - When pointing in either the same or opposite directions: we get 0.
   * - When the angle between is 90 degrees: we get the largest value.
   * @param v A vector.
   * @param w A vector.
   * @returns The cross product.
   */
  cross(v: Vec3, w: Vec3): Vec3;

  /**
   * Returns a new vector created from cylindrical coordinates (r, φ, z).
   * 
   * - r (radius): The `magnitude`.
   * - φ (phi): The polar angle to be relative to the positive x-axis towards
   * the positive y-axis.
   * @param r Radius, any a numeric value.
   * @param phi Polar angle relative to the positive x-axis (counter-clockwise, towards the positive y) in radians, a numeric value.
   * @param z Depth, a numeric value.
   * @returns A new vector.
   */
  fromCylindricalCoords(r: number, phi: number, z: number): Vec3;

  /**
   * Returns a new vector created from spherical coordinates (r, θ, φ).
   * 
   * - r (radius): The `magnitude`.
   * - θ (theta): The azimuthal angle to be relative to the positive z-axis
   * towards the xy-plane.
   * - φ (phi): The polar angle to be relative to the positive x-axis towards
   * the positive y-axis.
   * @param r Radius, a numeric value.
   * @param theta Azimuthal angle in radians, interval [0, PI], a numeric value.
   * @param phi Polar angle in radians, interval [0, 2PI), a numeric value.
   * @returns A new vector.
   */
  fromSphericalCoords(r: number, theta: number, phi: number): Vec3;

  /** 
   * Creates an immutable vector. It works faster than a regular instance while
   * while keeping a compatible interface; its only members are precomputed,
   * read-only properties.
   * @param x A numeric value.
   * @param y A numeric value.
   * @param z A numeric value.
   * @returns An immutable vector.
   */
  immutable(x?: number, y?: number, z?: number): Vec3Immutable;

  /**
   * Returns a random vector uniformly distributed on the surface of a unit
   * sphere. Method by Marsaglia (1972).
   * @returns A new vector.
   */
  random(): Vec3;
}

// #region Vec4

declare interface Vec4PropertiesBase extends Vec3PropertiesBase {
  /**
   * The `w` component of this vector.
   */
  w: number;
}

declare interface Vec4Properties extends Vec4PropertiesBase {
  /**
   * Alias for the `w` component of this vector.
   */
  a: number;

  /**
   * Angle relative to the positive w-axis towards the point defined by (x, y,
   * z). Interval [0, PI]. Value in radians.
   */
  angleW: number;

  /**
   * Angle relative to the positive x-axis towards the point defined by (y, z,
   * w). Interval [0, PI]. Value in radians.
   */
  angleX: number;

  /**
   * Angle relative to the positive y-axis towards the point defined by (z, w,
   * x). Interval [0, PI]. Value in radians.
   */
  angleY: number;

  /**
   * Angle relative to the positive z-axis towards the point defined by (w, x,
   * y). Interval [0, PI]. Value in radians.
   */
  angleZ: number;

  /**
   * Alias to get all the components of this vector as an array.
   */
  rgba: number[];

  /**
   * Shortcut to get all the components of this vector as an array.
   */
  xyzw: number[];
}

declare interface Vec4MethodsBase<Vec> extends
  Omit<Vec3MethodsBase<Vec>, 'rotateZ'> { }

declare interface Vec4Methods extends Vec4MethodsBase<Vec4> { }

declare interface Vec4 extends Vec4Properties, Vec4Methods { }

declare interface Vec4ImmutableBase extends
  Vec3ImmutableBase, Readonly<Vec4PropertiesBase> { }

declare interface Vec4Immutable extends
  Vec4ImmutableBase, Readonly<Vec4Properties> { }

declare interface Vec4ConstructorBase<Vec> extends Vec3ConstructorBase<Vec> { }

declare interface Vec4Constructor extends Vec4ConstructorBase<Vec4> {
  /**
   * Creates a 4-dimensional vector pointing to `x`, `y`, `z`, and `w`.
   * @param x A numeric value.
   * @param y A numeric value.
   * @param z A numeric value.
   * @param w A numeric value.
   */
  new(x?: number, y?: number, z?: number, w?: number): Vec4;

  /** 
   * Creates an immutable vector. It works faster than a regular instance while
   * while keeping a compatible interface; its only members are precomputed,
   * read-only properties.
   * @param x A numeric value.
   * @param y A numeric value.
   * @param z A numeric value.
   * @param w A numeric value.
   * @returns An immutable vector.
   */
  immutable(x?: number, y?: number, z?: number, w?: number): Vec4Immutable;

  /**
   * Returns a random vector uniformly distributed on the surface of a 4-sphere.
   * Method by Marsaglia (1972).
   * @returns A new vector.
   */
  random(): Vec4;
}

// #region @leodeslf/vec.js module

/**
 * A set of classes that provide functionality related to basic linear-algebra,
 * geometry, and more, for 2, 3, and 4-dimensional vectors.
 * @summary JavaScript vector library.
 * @copyright Copyright (c) Leonardo de S. Leal F., 2018-present.
 * @author Leonardo de S. Leal F. <hello@leodeslf.com>
 * @license MIT
 */
declare module '@leodeslf/vec.js' {
  /**
   * A 2-dimensional vector class.
   */
  const Vec2: Vec2Constructor;

  /**
   * A 3-dimensional vector class.
   */
  const Vec3: Vec3Constructor;

  /**
   * A 4-dimensional vector class.
   */
  const Vec4: Vec4Constructor;

  export { Vec2, Vec3, Vec4 };
}
