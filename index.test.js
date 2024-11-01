import { describe, test, expect } from 'bun:test';
import { Vec2, Vec3, Vec4 } from './index.js';

const { MAX_VALUE } = Number;
const { PI } = Math;
const DEG_45 = PI * 0.25;
const DEG_90 = PI * 0.5;
const DEG_120 = PI * (1 / 3 * 2);
const PRECISE_DIGITS = 15;

describe('@leodeslf/vec.js', () => {
  describe('Vec2', () => {
    test('set & get [x] component', () => {
      const a = new Vec2(0, 0);
      a.x = 1;
      expect(a.x).toStrictEqual(1);
    });
    test('set & get [y] component', () => {
      const a = new Vec2(0, 0);
      a.y = 1;
      expect(a.y).toStrictEqual(1);
    });
    test('set & get [xy]', () => {
      const a = new Vec2(0, 0);
      a.xy = [1, 2];
      expect(a.xy).toStrictEqual([1, 2]);
    });
    test('set & get [magnitude]', () => {
      const a = new Vec2(0, 1);
      a.magnitude = 2;
      expect(a.magnitude).toStrictEqual(2);
    });
    test('get [magnitude squared]', () => {
      const a = new Vec2(0, 2);
      expect(a.magnitudeSq).toStrictEqual(4);
    });
    test('set & get [x-axis angle]', () => {
      const a = new Vec2(1, 1);
      a.angleX = DEG_120;
      expect(a.angleX).toBeCloseTo(DEG_120, PRECISE_DIGITS);
      const b = new Vec2(1, 1);
      b.angleX = -DEG_120;
      expect(b.angleX).toBeCloseTo(2 * PI - DEG_120, PRECISE_DIGITS);
      const c = new Vec2(1, 1);
      c.angleX = 0;
      expect(c.angleX).toStrictEqual(0);
    });
    test('set & get [y-axis angle]', () => {
      const a = new Vec2(1, 1);
      a.angleY = DEG_120;
      expect(a.angleY).toBeCloseTo(DEG_120, PRECISE_DIGITS);
      const b = new Vec2(1, 1);
      b.angleY = -DEG_120;
      expect(b.angleY).toBeCloseTo(2 * PI - DEG_120, PRECISE_DIGITS);
      const c = new Vec2(1, 1);
      c.angleY = 0;
      expect(c.angleY).toStrictEqual(0);
    });
    test('instantiate a vector from [polar coords]', () => {
      const a = Vec2.fromPolarCoords(1, 0);
      expect(a.x).toStrictEqual(1);
      expect(a.y).toBeCloseTo(0, PRECISE_DIGITS);
    });
    test('create a [random] vector', () => {
      const a = Vec2.random();
      expect(a.magnitude).toBeCloseTo(1, PRECISE_DIGITS);
    });
    test('define a [random] direction but keep the same magnitude', () => {
      const a = new Vec2(0, 1);
      a.random();
      expect(a.y).not.toStrictEqual(1);
      expect(a.magnitude).toBeCloseTo(1, PRECISE_DIGITS);
    });
    test('a vector can [look at] another vector', () => {
      const a = new Vec2(-0.5, 0);
      const b = new Vec2(1, 0);
      expect(a.lookAt(b).xy).toStrictEqual([0.5, 0]);
    });
    test('a vector can [turn left] (90 deg)', () => {
      const a = new Vec2(1, 1);
      expect(a.turnLeft().xy).toStrictEqual([-1, 1]);
    });
    test('a vector can [turn right] (-90 deg)', () => {
      const a = new Vec2(1, 1);
      expect(a.turnRight().xy).toStrictEqual([1, -1]);
    });
    test('find the [angle between] two vectors', () => {
      const a = new Vec2(1, 0);
      const b = new Vec2(0, 1);
      expect(Vec2.angleBetween(a, b)).toStrictEqual(DEG_90);
      expect(a.angleBetween(b)).toStrictEqual(DEG_90);
    });
    test('[rotate x-axis]', () => {
      const a = new Vec2(1, 1);
      a.rotateZ(DEG_45);
      expect(a.x).toBeCloseTo(0, PRECISE_DIGITS);
      expect(a.angleX).toBeCloseTo(DEG_90, PRECISE_DIGITS);
    });
  });

  describe('Vec3', () => {
    test('set & get [x] component', () => {
      const a = new Vec3(0, 0, 0);
      a.x = 1;
      expect(a.x).toStrictEqual(1);
    });
    test('set & get [y] component', () => {
      const a = new Vec3(0, 0, 0);
      a.y = 1;
      expect(a.y).toStrictEqual(1);
    });
    test('set & get [z] component', () => {
      const a = new Vec3(0, 0, 0);
      a.z = 1;
      expect(a.z).toStrictEqual(1);
    });
    test('set & get [xyz]', () => {
      const a = new Vec3(0, 0, 0);
      a.xyz = [1, 2, 3];
      expect(a.xyz).toStrictEqual([1, 2, 3]);
    });
    test('set & get [magnitude]', () => {
      const a = new Vec3(0, 0, 1);
      a.magnitude = 2;
      expect(a.magnitude).toStrictEqual(2);
    });
    test('get [magnitude squared]', () => {
      const a = new Vec3(0, 0, 2);
      expect(a.magnitudeSq).toStrictEqual(4);
    });
    test('get [x-axis angle]', () => {
      const a = new Vec3(1, 0, 0);
      expect(a.angleX).toStrictEqual(0);
      const b = new Vec3(-1, 0, 0);
      expect(b.angleX).toStrictEqual(PI);
    });
    test('get [y-axis angle]', () => {
      const a = new Vec3(0, 1, 0);
      expect(a.angleY).toStrictEqual(0);
      const b = new Vec3(0, -1, 0);
      expect(b.angleY).toStrictEqual(PI);
    });
    test('get [z-axis angle]', () => {
      const a = new Vec3(0, 0, 1);
      expect(a.angleZ).toStrictEqual(0);
      const b = new Vec3(0, 0, -1);
      expect(b.angleZ).toStrictEqual(PI);
    });
    test('instantiate a vector from [cylindrical coords]', () => {
      const a = Vec3.fromCylindricalCoords(1, 0, 1);
      expect(a.x).toStrictEqual(1);
      expect(a.y).toStrictEqual(0, PRECISE_DIGITS);
      expect(a.z).toStrictEqual(1);
    });
    test('instantiate a vector from [spherical coords]', () => {
      const a = Vec3.fromSphericalCoords(1, DEG_90, DEG_45);
      expect(a.angleX).toStrictEqual(DEG_45, PRECISE_DIGITS);
      expect(a.angleY).toStrictEqual(DEG_45, PRECISE_DIGITS);
      expect(a.z).toBeCloseTo(0, PRECISE_DIGITS);
    });
    test('create a [random] vector', () => {
      const a = Vec3.random();
      expect(a.magnitude).toBeCloseTo(1, PRECISE_DIGITS);
    });
    test('define a [random] direction but keep the same magnitude', () => {
      const a = new Vec3(0, 0, 1);
      a.random();
      expect(a.z).not.toStrictEqual(1);
      expect(a.magnitude).toBeCloseTo(1, PRECISE_DIGITS);
    });
    test('a vector can [look at] another vector', () => {
      const a = new Vec3(0, -0.5, 0);
      const b = new Vec3(0, 1, 0);
      expect(a.lookAt(b).xyz).toStrictEqual([0, 0.5, 0]);
    });
    test('find the [angle between] two vectors', () => {
      const a = new Vec3(0, 1, 0);
      const b = new Vec3(0, 0, 1);
      expect(Vec3.angleBetween(a, b)).toStrictEqual(DEG_90);
      expect(a.angleBetween(b)).toStrictEqual(DEG_90);
    });
    test('find the [cross product] between two vectors', () => {
      const a1 = new Vec3(0, 1, 0);
      const a2 = a1.clone();
      const a3 = a1.clone();
      const b = new Vec3(0, -1, 0);
      const c = new Vec3(0, 0, 1);
      expect(Vec3.cross(a1, a2).magnitude).toStrictEqual(0);
      expect(Vec3.cross(a1, b).magnitude).toStrictEqual(0);
      expect(Vec3.cross(a1, c).xyz).toStrictEqual([1, 0, 0]);
      expect(a1.cross(a2).magnitude).toStrictEqual(0);
      expect(a2.cross(b).magnitude).toStrictEqual(0);
      expect(a3.cross(c).xyz).toStrictEqual([1, 0, 0]);
    });
    test('[rotate x-axis]', () => {
      const a = new Vec3(1, 0, 1);
      a.rotateX(DEG_90);
      expect(a.x).toStrictEqual(1);
      expect(a.y).toStrictEqual(-1);
      expect(a.z).toBeCloseTo(0, PRECISE_DIGITS);
    });
    test('[rotate y-axis]', () => {
      const a = new Vec3(1, 1, 0);
      a.rotateY(DEG_90);
      expect(a.x).toBeCloseTo(0, PRECISE_DIGITS);
      expect(a.y).toStrictEqual(1);
      expect(a.z).toStrictEqual(1);
    });
    test('[rotate z-axis]', () => {
      const a = new Vec3(0, 1, 1);
      a.rotateZ(DEG_90);
      expect(a.x).toStrictEqual(-1);
      expect(a.y).toBeCloseTo(0, PRECISE_DIGITS);
      expect(a.z).toStrictEqual(1);
    });
  });

  describe('Vec4', () => {
    test('set & get [x] component', () => {
      const a = new Vec4(0, 0, 0, 0);
      a.x = 1;
      expect(a.x).toStrictEqual(1);
    });
    test('set & get [y] component', () => {
      const a = new Vec4(0, 0, 0, 0);
      a.y = 1;
      expect(a.y).toStrictEqual(1);
    });
    test('set & get [z] component', () => {
      const a = new Vec4(0, 0, 0, 0);
      a.z = 1;
      expect(a.z).toStrictEqual(1);
    });
    test('set & get [w] component', () => {
      const a = new Vec4(0, 0, 0, 0);
      a.w = 1;
      expect(a.w).toStrictEqual(1);
    });
    test('set & get [xyzw]', () => {
      const a = new Vec4(0, 0, 0, 0);
      a.xyzw = [1, 2, 3, 4];
      expect(a.xyzw).toStrictEqual([1, 2, 3, 4]);
    });
    test('set & get [magnitude]', () => {
      const a = new Vec4(0, 0, 0, 1);
      a.magnitude = 2;
      expect(a.magnitude).toStrictEqual(2);
    });
    test('get [magnitude squared]', () => {
      const a = new Vec4(0, 0, 0, 2);
      expect(a.magnitudeSq).toStrictEqual(4);
    });
    test('get [x-axis angle]', () => {
      const a = new Vec4(1, 0, 0, 0);
      expect(a.angleX).toStrictEqual(0);
      const b = new Vec4(-1, 0, 0, 0);
      expect(b.angleX).toStrictEqual(PI);
    });
    test('get [y-axis angle]', () => {
      const a = new Vec4(0, 1, 0, 0);
      expect(a.angleY).toStrictEqual(0);
      const b = new Vec4(0, -1, 0, 0);
      expect(b.angleY).toStrictEqual(PI);
    });
    test('get [z-axis angle]', () => {
      const a = new Vec4(0, 0, 1, 0);
      expect(a.angleZ).toStrictEqual(0);
      const b = new Vec4(0, 0, -1, 0);
      expect(b.angleZ).toStrictEqual(PI);
    });
    test('get [w-axis angle]', () => {
      const a = new Vec4(0, 0, 0, 1);
      expect(a.angleW).toStrictEqual(0);
      const b = new Vec4(0, 0, 0, -1);
      expect(b.angleW).toStrictEqual(PI);
    });
    test('create a [random] vector', () => {
      const a = Vec4.random();
      expect(a.magnitude).toBeCloseTo(1, PRECISE_DIGITS);
    });
    test('define a [random] direction but keep the same magnitude', () => {
      const a = new Vec4(0, 0, 0, 1);
      a.random();
      expect(a.w).not.toStrictEqual(1);
      expect(a.magnitude).toBeCloseTo(1, PRECISE_DIGITS);
    });
    test('a vector can [clone] itself', () => {
      const a = new Vec4(1, 2, 3, 4);
      expect(a.clone().xyzw).toStrictEqual(a.xyzw);
    });
    test('a vector can [copy] another vector', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(0, 0, 0, 0);
      expect(b.copy(a).xyzw).toStrictEqual(a.xyzw);
    });
    test('[limit maximum magnitude]', () => {
      const a = new Vec4(1, 2, 3, 4);
      expect(a.limitMax(1).magnitude).toBeCloseTo(1, PRECISE_DIGITS);
    });
    test('[limit minimum magnitude]', () => {
      const a = new Vec4(1, 2, 3, 4);
      expect(a.limitMin(10).magnitude).toStrictEqual(10);
    });
    test('[clamp magnitude]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, 4);
      expect(a.clamp(1, 1).magnitude).toBeCloseTo(1, PRECISE_DIGITS);
      expect(b.clamp(10, 10).magnitude).toStrictEqual(10);
    });
    test('two vectors [satisfy equality]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, 4);
      const c = new Vec4(4, 3, 2, 1);
      expect(Vec4.satisfyEquality(a, b)).toStrictEqual(true);
      expect(a.satisfyEquality(b)).toStrictEqual(true);
      expect(Vec4.satisfyEquality(a, c)).toStrictEqual(false);
      expect(a.satisfyEquality(c)).toStrictEqual(false);
    });
    test('two vectors [satisfy opposition]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(-1, -2, -3, -4);
      const c = new Vec4(1, 2, 3, 4);
      expect(Vec4.satisfyOpposition(a, b)).toStrictEqual(true);
      expect(a.satisfyOpposition(b)).toStrictEqual(true);
      expect(Vec4.satisfyOpposition(a, c)).toStrictEqual(false);
      expect(a.satisfyOpposition(c)).toStrictEqual(false);
    });
    test('check if a vector [is infinite]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, Infinity);
      expect(Vec4.isInfinite(a)).toStrictEqual(false);
      expect(Vec4.isInfinite(b)).toStrictEqual(true);
      expect(a.isInfinite()).toStrictEqual(false);
      expect(b.isInfinite()).toStrictEqual(true);
    });
    test('check if a vector [is NaN]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, NaN);
      expect(Vec4.isNaN(a)).toStrictEqual(false);
      expect(Vec4.isNaN(b)).toStrictEqual(true);
      expect(a.isNaN()).toStrictEqual(false);
      expect(b.isNaN()).toStrictEqual(true);
    });
    test('check if a vector [is zero]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(0, 0, 0, 0);
      expect(Vec4.isZero(a)).toStrictEqual(false);
      expect(Vec4.isZero(b)).toStrictEqual(true);
      expect(a.isZero()).toStrictEqual(false);
      expect(b.isZero()).toStrictEqual(true);
    });
    test('[add] two vectors', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, 4);
      expect(Vec4.add(a, b).xyzw).toStrictEqual([2, 4, 6, 8]);
      expect(a.add(b).xyzw).toStrictEqual([2, 4, 6, 8]);
    });
    test('find the [angle between] two vectors', () => {
      const a = new Vec4(0, 0, 1, 0);
      const b = new Vec4(0, 0, 0, 1);
      expect(Vec4.angleBetween(a, b)).toStrictEqual(DEG_90);
      expect(a.angleBetween(b)).toStrictEqual(DEG_90);
    });
    test('find the [distance] between two vectors', () => {
      const a = new Vec4(0, 0, 0, 0);
      const b = new Vec4(1, 1, 1, 1);
      expect(Vec4.distance(a, b)).toStrictEqual(Math.sqrt(4));
      expect(Vec4.distance(a, a)).toStrictEqual(0);
    });
    test('find the [distance chebyshev] between two vectors', () => {
      const a = new Vec4(0, 0, 0, 0);
      const b = new Vec4(0, 0, 1, 1);
      expect(Vec4.distanceChebyshev(a, b)).toStrictEqual(1);
      expect(Vec4.distanceChebyshev(a, a)).toStrictEqual(0);
    });
    test('find the [distance manhattan] between two vectors', () => {
      const a = new Vec4(0, 0, 0, 0);
      const b = new Vec4(0, 0, 1, 1);
      expect(Vec4.distanceManhattan(a, b)).toStrictEqual(2);
      expect(Vec4.distanceManhattan(a, a)).toStrictEqual(0);
    });
    test('find the [distance minkowski] between two vectors', () => {
      const a = new Vec4(0, 0, 0, 0);
      const b = new Vec4(0, 0, 1, 1);
      expect(Vec4.distanceMinkowski(a, b, 1)).toStrictEqual(2);
      expect(Vec4.distanceMinkowski(a, b, 2)).toStrictEqual(Math.sqrt(2));
      expect(Vec4.distanceMinkowski(a, b, MAX_VALUE)).toBeCloseTo(1, PRECISE_DIGITS);
      expect(Vec4.distanceMinkowski(a, a, 1)).toStrictEqual(0);
      expect(Vec4.distanceMinkowski(a, a, 2)).toStrictEqual(0);
      expect(Vec4.distanceMinkowski(a, a, MAX_VALUE)).toStrictEqual(0);
    });
    test('find the [distance squared] between two vectors', () => {
      const a = new Vec4(0, 0, 0, 0);
      const b = new Vec4(1, 1, 1, 1);
      expect(Vec4.distanceSq(a, b)).toStrictEqual(4);
      expect(Vec4.distanceSq(a, a)).toStrictEqual(0);
    });
    test('find the [dot product] between two vectors', () => {
      const a = new Vec4(0, 0, 1, 0);
      const b = new Vec4(0, 0, -1, 0);
      const c = new Vec4(0, 0, 0, 1);
      expect(Vec4.dot(a, a)).toStrictEqual(1);
      expect(Vec4.dot(a, b)).toStrictEqual(-1);
      expect(Vec4.dot(a, c)).toStrictEqual(0);
      expect(a.dot(a)).toStrictEqual(1);
      expect(a.dot(b)).toStrictEqual(-1);
      expect(a.dot(c)).toStrictEqual(0);
    });
    test('create an [immutable], readonly vector', () => {
      const a = Vec4.immutable(1, 2, 3, 4);
      expect(a.isInfinite).toBeFalse();
      expect(() => a.x = Infinity).toThrowError();
    });
    test('find the [linear interpolation] between two vectors', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(-1, -2, -3, -4);
      expect(Vec4.lerp(a, b, 0.5).xyzw).toStrictEqual([0, 0, 0, 0]);
    });
    test('[negate] a vector', () => {
      const a = new Vec4(1, 2, 3, 4);
      expect(Vec4.negate(a).xyzw).toStrictEqual([-1, -2, -3, -4]);
      expect(a.negate().xyzw).toStrictEqual([-1, -2, -3, -4]);
    });
    test('[normalize] a vector', () => {
      const a = new Vec4(1, 2, 3, 4);
      expect(Vec4.normalize(a).magnitude).toBeCloseTo(1, PRECISE_DIGITS);
      expect(a.normalize().magnitude).toBeCloseTo(1, PRECISE_DIGITS);
    });
    test('[project] a vector onto another', () => {
      const a = new Vec4(0, 0, 0, 1);
      const b = new Vec4(0, 0, 0, 2);
      expect(Vec4.project(a, b).xyzw).toStrictEqual([0, 0, 0, 1]);
      expect(a.project(b).xyzw).toStrictEqual([0, 0, 0, 1]);
    });
    test('[scale] a vector', () => {
      const a = new Vec4(1, 2, 3, 4);
      expect(Vec4.scale(a, 0.5).xyzw).toStrictEqual([0.5, 1, 1.5, 2]);
      expect(a.scale(0.5).xyzw).toStrictEqual([0.5, 1, 1.5, 2]);
    });
    test('[subtract] two vectors', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, 4);
      expect(Vec4.subtract(a, b).xyzw).toStrictEqual([0, 0, 0, 0]);
      expect(a.subtract(b).xyzw).toStrictEqual([0, 0, 0, 0]);
    });
    test('create & set a [zero] vector', () => {
      const a = Vec4.zero();
      expect(a.magnitude).toStrictEqual(0);
      const b = new Vec4(1, 2, 3, 4);
      expect(b.zero().magnitude).toStrictEqual(0);
    });
    test('can be [iterated]', () => {
      const a = new Vec4(1, 2, 3, 4);
      expect([...a]).toStrictEqual([1, 2, 3, 4]);
    });
  });
});
