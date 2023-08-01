declare interface Vec2Base {
  /**
   * Angle relative the x-axis towards the positive y-axis (counter-clockwise),
   * interval [0, 2PI).
   * @returns Value in radians.
   */
  get angleX(): number;

  /**
   * Angle relative the y-axis towards the negative x-axis (counter-clockwise),
   * interval [0, 2PI).
   * @returns Value in radians.
   */
  get angleY(): number;

  /**
   * @returns The `magnitude` of this vector.
   */
  get magnitude(): number;

  /**
   * @returns The squared `magnitude` of this vector.
   */
  get magnitudeSq(): number;

  /**
   * @returns The `x` component of this vector.
   */
  get x(): number;

  /**
   * @returns The `y` component of this vector.
   */
  get y(): number;

  /**
   * Set the `magnitude` of this vector to the given value. Fails to perform if
   * the current magnitude is zero.
   * @param m A numeric value.
   */
  set magnitude(m: number);

  /**
   * Set the `x` component of this vector.
   * @param x A numeric value.
   */
  set x(x: number);

  /**
   * Set the `y` component of this vector.
   * @param y A numeric value.
   */
  set y(y: number);

  /**
   * Adds vector `v` to this vector.
   * @param v A vector.
   * @returns This vector.
   */
  add<Vec>(v: Vec): this;

  /**
   * Returns the angle between this vector and vector `v`. Interval (-PI, PI].
   * @param v A vector.
   * @returns Value in radians.
   */
  angleBetween<Vec>(v: Vec): number;

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
  clone<Vec>(): Vec;

  /**
   * Copy each component from vector `v` to this vector.
   * @param v A vector.
   * @returns This vector.
   */
  copy<Vec>(v: Vec): this;

  /**
   * Computes the distance from this vector to vector `v` (with the {@link https://en.wikipedia.org/wiki/Euclidean_distance Euclidean metric}).
   * @param v A vector.
   * @returns Euclidean distance.
   */
  distance<Vec>(v: Vec): number;

  /**
   * Computes the squared distance from this vector to vector `v` (with the 
   * Euclidean metric).
   * @param v A vector.
   * @returns Euclidean distance squared.
   */
  distanceSq<Vec>(v: Vec): number;

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
  dot<Vec>(v: Vec): number;

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
  lookAt<Vec>(v: Vec): this;

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
  project<Vec>(v: Vec): this;

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
  satisfyEquality<Vec>(v: Vec): boolean;

  /**
   * Checks whether or not this vector and vector `v` satisfy the opposition
   * definition.
   * @param v A vector.
   * @returns Boolean result.
   */
  satisfyOpposition<Vec>(v: Vec): boolean;

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
  subtract<Vec>(v: Vec): this;

  /**
   * Transforms this vector into a zero vector (i.e.: `magnitude` = 0).
   * @returns This vector.
   */
  zero(): this;

  /**
   * Iterator method for this vector.
   * @yields This vector's components.
   */
  [Symbol.iterator](): Generator<number, void, never>;
}

declare interface Vec2 extends Vec2Base {/**
   * Shortcut to get all the components of this vector as an array.
   * @returns An array of numbers.
   */
  get xy(): number[];

  /**
   * Set the angle relative the x-axis towards the positive y-axis
   * (counter-clockwise) to `phi`.
   * @param phi Angle in radians.
   */
  set angleX(phi: number);

  /**
   * Set the angle relative the y-axis towards the negative x-axis
   * (counter-clockwise) to `phi`.
   * @param phi Angle in radians.
   */
  set angleY(phi: number);

  /**
   * Shortcut to set all the components of this vector from an array.
   * @param xy An array of numeric values.
   */
  set xy(xy: number[]);

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

declare interface Vec2ConstructorBase {
  /**
   * Creates a 2-dimensional vector pointing to `x` and `y`.
   * @param x A numeric value.
   * @param y A numeric value.
   */
  new(x?: number, y?: number): Vec2;

  /**
   * Returns the addition of `v` plus `w`.
   * @param v A vector.
   * @param w A vector.
   * @returns A new vector.
   */
  add<Vec>(v: Vec, w: Vec): Vec;

  /**
   * Returns the angle between `v` and `w`. Interval (-PI, PI].
   * @param v A vector.
   * @param w A vector.
   * @returns Value in radians.
   */
  angleBetween<Vec>(v: Vec, w: Vec): number;

  /**
   * Computes the squared distance from `v` to `w` with the Euclidean metric.
   * @param v A vector.
   * @param w A vector.
   * @returns Euclidean distance squared.
   */
  distanceSq<Vec>(v: Vec, w: Vec): number;

  /**
   * Computes the distance from `v` to `w` with the {@link https://en.wikipedia.org/wiki/Euclidean_distance Euclidean metric}.
   * @param v A vector.
   * @param w A vector.
   * @returns Euclidean distance.
   */
  distance<Vec>(v: Vec, w: Vec): number;

  /**
   * Computes the distance from `v` to `w` with the {@link https://en.wikipedia.org/wiki/Chebyshev_distance Chebyshev metric}.
   * 
   * "Also known as the Chessboard distance, it is somewhat similar to the
   * Manhattan distance, but with 45 degrees rotation."
   * @param v A vector.
   * @param w A vector.
   * @returns Chebyshev distance.
   */
  distanceChebyshev<Vec>(v: Vec, w: Vec): number;

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
  distanceManhattan<Vec>(v: Vec, w: Vec): number;

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
  distanceMinkowski<Vec>(v: Vec, w: Vec, p: number): number;

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
  dot<Vec>(v: Vec, w: Vec): number;

  /**
   * Checks whether or not vector `v` is infinite.
   * @param v A vector.
   * @returns Boolean result.
   */
  isInfinite<Vec>(v: Vec): boolean;

  /**
   * Checks whether or not a component of vector `v` is `NaN`.
   * @param v A vector.
   * @returns Boolean result.
   */
  isNaN<Vec>(v: Vec): boolean;

  /**
   * Checks whether or not vector `v` has a magnitude of zero.
   * @param v A vector.
   * @returns Boolean result.
   */
  isZero<Vec>(v: Vec): boolean;

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
  lerp<Vec>(v: Vec, w: Vec, t: number): Vec;

  /**
   * Returns the negation (aka. opposite) of vector `v`.
   * @param v A vector.
   * @returns A new vector.
   */
  negate<Vec>(v: Vec): Vec;

  /**
   * Returns a unit vector (i.e.: `magnitude` = 1) from vector `v`.
   * @param v A vector.
   * @returns A new Vector.
   */
  normalize<Vec>(v: Vec): Vec;

  /**
   * Returns a vector that is the orthogonal projection of `v` onto `w`, i.e.:
   * the component of `v` projected on `w` (in direction of `w`).
   * @param v A vector.
   * @param w A vector.
   * @returns The projection vector.
   */
  project<Vec>(v: Vec, w: Vec): Vec;

  /**
   * Returns a random vector uniformly distributed on the circumference of a
   * unit circle. Method by Marsaglia (1972).
   * @returns A new vector.
   */
  random<Vec>(): Vec;

  /**
   * Checks whether or not `v` and `w` satisfy the equality definition.
   * @param v A vector.
   * @param w A vector.
   * @returns Boolean result.
   */
  satisfyEquality<Vec>(v: Vec, w: Vec): boolean;

  /**
   * Checks whether or not `v` and `w` satisfy the opposition definition.
   * @param v A vector.
   * @param w A vector.
   * @returns Boolean result.
   */
  satisfyOpposition<Vec>(v: Vec, w: Vec): boolean;

  /**
   * Returns the scalar multiplication of `v` by a given scalar `c`.
   * @param v A vector.
   * @param c A numeric value.
   * @returns A new vector.
   */
  scale<Vec>(v: Vec, c: number): Vec;

  /**
   * Returns the subtraction of `v` minus `w`.
   * @param v A vector.
   * @param w A vector.
   * @returns A new vector.
   */
  subtract<Vec>(v: Vec, w: Vec): Vec;
}

declare interface Vec2Constructor extends Vec2ConstructorBase {
  /**
   * Returns a new vector created from polar coordinates (denoted by ρ, θ).
   * @param r Radius, a numeric value.
   * @param theta Polar angle relative to the positive x-axis in radians, a numeric value.
   * @returns A new vector.
   */
  fromPolarCoords(r: number, theta: number): Vec2;
}

declare interface Vec3Base extends Vec2Base {
  /**
   * Array-like notation to get `z`.
   * @returns The `z` component of this vector.
   */
  get 2(): number;

  /**
   * Angle relative to the positive x-axis towards the point defined by (y,
   * z). Interval [0, PI].
   * @returns Value in radians.
   */
  get angleX(): number;

  /**
   * Angle relative to the positive y-axis towards the point defined by (z,
   * x). Interval [0, PI].
   * @returns Value in radians.
   */
  get angleY(): number;

  /**
   * Angle relative to the positive z-axis towards the point defined by (x,
   * y). Interval [0, PI].
   * @returns Value in radians.
   */
  get angleZ(): number;

  /**
   * Alias for the `z` component of this vector.
   * @returns The `z` component of this vector.
   */
  get b(): number;

  /**
   * Alias for the `y` component of this vector.
   * @returns The `y` component of this vector.
   */
  get g(): number;

  /**
   * Alias for the `x` component of this vector.
   * @returns The `x` component of this vector.
   */
  get r(): number;

  /**
   * @returns The `z` component of this vector.
   */
  get z(): number;

  /**
   * Alias to set the `z` component of this vector.
   * @param b A numeric value.
   */
  set b(b: number);

  /**
   * Alias to set the `y` component of this vector.
   * @param g A numeric value.
   */
  set g(g: number);

  /**
   * Alias to set the `x` component of this vector.
   * @param r A numeric value.
   */
  set r(r: number);

  /**
   * Set the `z` component of this vector.
   * @param z A numeric value.
   */
  set z(z: number);

  /**
   * Returns the angle between this vector and vector `v`. Interval [0, PI].
   * @param v A vector.
   * @returns Value in radians.
   */
  angleBetween<Vec>(v: Vec): number;
}

declare interface Vec3 extends Vec3Base {
  /**
   * Alias to get all the components of this vector as an array.
   * @returns An array of numbers.
   */
  get rgb(): number[];

  /**
   * Shortcut to get all the components of this vector as an array.
   * @returns An array of numbers.
   */
  get xyz(): number[];

  /**
   * Alias to set all the components of this vector from an array.
   * @param rgb An array of numeric values.
   */
  set rgb(rgb: number[]);

  /**
   * Shortcut to set all the components of this vector from an array.
   * @param xyz An array of numeric values.
   */
  set xyz(xyz: number[]);

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

declare interface Vec3ConstructorBase extends Vec2ConstructorBase {
  /**
   * Creates a 3-dimensional vector pointing to `x`, `y`, and `z`.
   * @param x A numeric value.
   * @param y A numeric value.
   * @param z A numeric value.
   */
  new(x?: number, y?: number, z?: number): Vec3;

  /**
   * Returns the angle between `v` and `w`. Interval [0, PI].
   * @param v A vector.
   * @param w A vector.
   * @returns Value in radians.
   */
  angleBetween<Vec>(v: Vec, w: Vec): number;

  /**
   * Returns a random vector uniformly distributed on the surface of a unit
   * sphere. Method by Marsaglia (1972).
   * @returns A new vector.
   */
  random<Vec>(): Vec;
}

declare interface Vec3Constructor extends Vec3ConstructorBase {
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
   * @param theta Azimuthal angle in radians, a numeric value.
   * @param phi Polar angle in radians, a numeric value.
   * @returns A new vector.
   */
  fromSphericalCoords(r: number, theta: number, phi: number): Vec3;
}

declare interface Vec4Base extends Vec3Base {
  /**
   * Array-like notation to get `w`.
   * @returns The `w` component of this vector.
   */
  get 3(): number;

  /**
   * Alias for the `w` component of this vector.
   * @returns The `w` component of this vector.
   */
  get a(): number;

  /**
   * Angle relative to the positive w-axis towards the point defined by (x, y,
   * z). Interval [0, PI].
   * @returns Value in radians.
   */
  get angleW(): number;

  /**
   * Angle relative to the positive x-axis towards the point defined by (y, z,
   * w). Interval [0, PI].
   * @returns Value in radians.
   */
  get angleX(): number;

  /**
   * Angle relative to the positive y-axis towards the point defined by (z, w,
   * x). Interval [0, PI].
   * @returns Value in radians.
   */
  get angleY(): number;

  /**
   * Angle relative to the positive z-axis towards the point defined by (w, x,
   * y). Interval [0, PI].
   * @returns Value in radians.
   */
  get angleZ(): number;

  /**
   * Alias to get all the components of this vector as an array.
   * @returns An array of numbers.
   */
  get rgba(): number[];

  /**
   * @returns The `w` component of this vector.
   */
  get w(): number;

  /**
   * Shortcut to get all the components of this vector as an array.
   * @returns An array of numbers.
   */
  get xyzw(): number[];

  /**
   * Alias to set the `w` component of this vector.
   * @param a A numeric value.
   */
  set a(a: number);

  /**
   * Alias to set all the components of this vector from an array.
   * @param rgba An array of numeric values.
   */
  set rgba(rgba: number[]);

  /**
   * Set the `w` component of this vector.
   * @param w A numeric value.
   */
  set w(w: number);

  /**
   * Shortcut to set all the components of this vector from an array.
   * @param xyzw An array of numeric values.
   */
  set xyzw(xyzw: number[]);
}

declare interface Vec4 extends Vec4Base { }

declare interface Vec4ConstructorBase extends Vec3ConstructorBase {
  /**
   * Creates a 4-dimensional vector pointing to `x`, `y`, `z`, and `w`.
   * @param x A numeric value.
   * @param y A numeric value.
   * @param z A numeric value.
   * @param w A numeric value.
   */
  new(x?: number, y?: number, z?: number, w?: number): Vec4;

  /**
   * Returns a random vector uniformly distributed on the surface of a 4-sphere.
   * Method by Marsaglia (1972).
   * @returns A new vector.
   */
  random<Vec>(): Vec;
}

declare interface Vec4Constructor extends Vec4ConstructorBase { }

/**
 * A set of classes that provide functionality related to basic linear-algebra,
 * geometry, and more, for 2, 3, and 4-dimensional vectors.
 * @summary JavaScript vector library.
 * @version 3.0.0
 * @copyright Copyright (c) Leonardo de S.L.F, 2018-present.
 * @author Leonardo de S.L.F <hello@leodeslf.com>
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
