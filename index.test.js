import { Vec2, Vec3, Vec4 } from './index.js';
import { assert } from 'chai';

const { EPSILON, MAX_VALUE } = Number;
const { PI } = Math;
const DEG_45 = PI * 0.25;
const DEG_90 = PI * 0.5;
const DEG_120 = PI * (1 / 3 * 2);

describe('@leodeslf/vec.js', () => {
  describe('Vec2', () => {
    it('set & get [x] component', () => {
      const a = new Vec2(0, 0);
      a.x = 1;
      assert.strictEqual(a.x, 1);
    });
    it('set & get [y] component', () => {
      const a = new Vec2(0, 0);
      a.y = 1;
      assert.strictEqual(a.y, 1);
    });
    it('set & get [xy]', () => {
      const a = new Vec2(0, 0);
      a.xy = [1, 2];
      assert.deepStrictEqual(a.xy, [1, 2]);
    });
    it('set & get [magnitude]', () => {
      const a = new Vec2(0, 1);
      a.magnitude = 2;
      assert.strictEqual(a.magnitude, 2);
    });
    it('get [magnitude squared]', () => {
      const a = new Vec2(0, 2);
      assert.strictEqual(a.magnitudeSq, 4);
    });
    it('set & get [x-axis angle]', () => {
      const a = new Vec2(1, 1);
      a.angleX = DEG_120;
      assert.approximately(a.angleX, DEG_120, EPSILON * 2);
      const b = new Vec2(1, 1);
      b.angleX = -DEG_120;
      assert.approximately(b.angleX, 2 * PI - DEG_120, EPSILON * 4);
      const c = new Vec2(1, 1);
      c.angleX = 0;
      assert.strictEqual(c.angleX, 0);
    });
    it('set & get [y-axis angle]', () => {
      const a = new Vec2(1, 1);
      a.angleY = DEG_120;
      assert.approximately(a.angleY, DEG_120, EPSILON * 2);
      const b = new Vec2(1, 1);
      b.angleY = -DEG_120;
      assert.approximately(b.angleY, 2 * PI - DEG_120, EPSILON * 4);
      const c = new Vec2(1, 1);
      c.angleY = 0;
      assert.strictEqual(c.angleY, 0);
    });
    it('instantiate a vector from [polar coords]', () => {
      const a = Vec2.fromPolarCoords(1, 0);
      assert.strictEqual(a.x, 1);
      assert.approximately(a.y, 0, EPSILON);
    });
    it('create a [random] vector', () => {
      const a = Vec2.random();
      assert.approximately(a.magnitude, 1, EPSILON);
    });
    it('define a [random] direction but keep the same magnitude', () => {
      const a = new Vec2(0, 1);
      a.random();
      assert.notStrictEqual(a.y, 1);
      assert.approximately(a.magnitude, 1, EPSILON);
    });
    it('a vector can [look at] another vector', () => {
      const a = new Vec2(-0.5, 0);
      const b = new Vec2(1, 0);
      assert.deepStrictEqual(a.lookAt(b).xy, [0.5, 0]);
    });
    it('a vector can [turn left] (90 deg)', () => {
      const a = new Vec2(1, 1);
      assert.deepStrictEqual(a.turnLeft().xy, [-1, 1]);
    });
    it('a vector can [turn right] (-90 deg)', () => {
      const a = new Vec2(1, 1);
      assert.deepStrictEqual(a.turnRight().xy, [1, -1]);
    });
    it('find the [angle between] two vectors', () => {
      const a = new Vec2(1, 0);
      const b = new Vec2(0, 1);
      assert.strictEqual(Vec2.angleBetween(a, b), DEG_90);
      assert.strictEqual(a.angleBetween(b), DEG_90);
    });
    it('[rotate x-axis]', () => {
      const a = new Vec2(1, 1);
      a.rotateZ(DEG_45);
      assert.approximately(a.x, 0, EPSILON);
      assert.approximately(a.angleX, DEG_90, EPSILON);
    });
  });

  describe('Vec3', () => {
    it('set & get [x] component', () => {
      const a = new Vec3(0, 0, 0);
      a.x = 1;
      assert.strictEqual(a.x, 1);
    });
    it('set & get [y] component', () => {
      const a = new Vec3(0, 0, 0);
      a.y = 1;
      assert.strictEqual(a.y, 1);
    });
    it('set & get [z] component', () => {
      const a = new Vec3(0, 0, 0);
      a.z = 1;
      assert.strictEqual(a.z, 1);
    });
    it('set & get [xyz]', () => {
      const a = new Vec3(0, 0, 0);
      a.xyz = [1, 2, 3];
      assert.deepStrictEqual(a.xyz, [1, 2, 3]);
    });
    it('set & get [magnitude]', () => {
      const a = new Vec3(0, 0, 1);
      a.magnitude = 2;
      assert.strictEqual(a.magnitude, 2);
    });
    it('get [magnitude squared]', () => {
      const a = new Vec3(0, 0, 2);
      assert.strictEqual(a.magnitudeSq, 4);
    });
    it('get [x-axis angle]', () => {
      const a = new Vec3(1, 0, 0);
      assert.strictEqual(a.angleX, 0);
      const b = new Vec3(-1, 0, 0);
      assert.strictEqual(b.angleX, PI);
    });
    it('get [y-axis angle]', () => {
      const a = new Vec3(0, 1, 0);
      assert.strictEqual(a.angleY, 0);
      const b = new Vec3(0, -1, 0);
      assert.strictEqual(b.angleY, PI);
    });
    it('get [z-axis angle]', () => {
      const a = new Vec3(0, 0, 1);
      assert.strictEqual(a.angleZ, 0);
      const b = new Vec3(0, 0, -1);
      assert.strictEqual(b.angleZ, PI);
    });
    it('instantiate a vector from [cylindrical coords]', () => {
      const a = Vec3.fromCylindricalCoords(1, 0, 1);
      assert.strictEqual(a.x, 1);
      assert.approximately(a.y, 0, EPSILON);
      assert.strictEqual(a.z, 1);
    });
    it('instantiate a vector from [spherical coords]', () => {
      const a = Vec3.fromSphericalCoords(1, DEG_90, DEG_45);
      assert.approximately(a.angleX, DEG_45, EPSILON);
      assert.approximately(a.angleY, DEG_45, EPSILON);
      assert.approximately(a.z, 0, EPSILON);
    });
    it('create a [random] vector', () => {
      const a = Vec3.random();
      assert.approximately(a.magnitude, 1, EPSILON);
    });
    it('define a [random] direction but keep the same magnitude', () => {
      const a = new Vec3(0, 0, 1);
      a.random();
      assert.notStrictEqual(a.z, 1);
      assert.approximately(a.magnitude, 1, EPSILON);
    });
    it('a vector can [look at] another vector', () => {
      const a = new Vec3(0, -0.5, 0);
      const b = new Vec3(0, 1, 0);
      assert.deepStrictEqual(a.lookAt(b).xyz, [0, 0.5, 0]);
    });
    it('find the [angle between] two vectors', () => {
      const a = new Vec3(0, 1, 0);
      const b = new Vec3(0, 0, 1);
      assert.strictEqual(Vec3.angleBetween(a, b), DEG_90);
      assert.strictEqual(a.angleBetween(b), DEG_90);
    });
    it('find the [cross product] between two vectors', () => {
      const a1 = new Vec3(0, 1, 0);
      const a2 = a1.clone();
      const a3 = a1.clone();
      const b = new Vec3(0, -1, 0);
      const c = new Vec3(0, 0, 1);
      assert.strictEqual(Vec3.cross(a1, a2).magnitude, 0);
      assert.strictEqual(Vec3.cross(a1, b).magnitude, 0);
      assert.deepStrictEqual(Vec3.cross(a1, c).xyz, [1, 0, 0]);
      assert.strictEqual(a1.cross(a2).magnitude, 0);
      assert.strictEqual(a2.cross(b).magnitude, 0);
      assert.deepStrictEqual(a3.cross(c).xyz, [1, 0, 0]);
    });
    it('[rotate x-axis]', () => {
      const a = new Vec3(1, 0, 1);
      a.rotateX(DEG_90);
      assert.strictEqual(a.x, 1);
      assert.strictEqual(a.y, -1);
      assert.approximately(a.z, 0, EPSILON);
    });
    it('[rotate y-axis]', () => {
      const a = new Vec3(1, 1, 0);
      a.rotateY(DEG_90);
      assert.approximately(a.x, 0, EPSILON);
      assert.strictEqual(a.y, 1);
      assert.strictEqual(a.z, 1);
    });
    it('[rotate z-axis]', () => {
      const a = new Vec3(0, 1, 1);
      a.rotateZ(DEG_90);
      assert.strictEqual(a.x, -1);
      assert.approximately(a.y, 0, EPSILON);
      assert.strictEqual(a.z, 1);
    });
  });

  describe('Vec4', () => {
    it('set & get [x] component', () => {
      const a = new Vec4(0, 0, 0, 0);
      a.x = 1;
      assert.strictEqual(a.x, 1);
    });
    it('set & get [y] component', () => {
      const a = new Vec4(0, 0, 0, 0);
      a.y = 1;
      assert.strictEqual(a.y, 1);
    });
    it('set & get [z] component', () => {
      const a = new Vec4(0, 0, 0, 0);
      a.z = 1;
      assert.strictEqual(a.z, 1);
    });
    it('set & get [w] component', () => {
      const a = new Vec4(0, 0, 0, 0);
      a.w = 1;
      assert.strictEqual(a.w, 1);
    });
    it('set & get [xyzw]', () => {
      const a = new Vec4(0, 0, 0, 0);
      a.xyzw = [1, 2, 3, 4];
      assert.deepStrictEqual(a.xyzw, [1, 2, 3, 4]);
    });
    it('set & get [magnitude]', () => {
      const a = new Vec4(0, 0, 0, 1);
      a.magnitude = 2;
      assert.strictEqual(a.magnitude, 2);
    });
    it('get [magnitude squared]', () => {
      const a = new Vec4(0, 0, 0, 2);
      assert.strictEqual(a.magnitudeSq, 4);
    });
    it('get [x-axis angle]', () => {
      const a = new Vec4(1, 0, 0, 0);
      assert.strictEqual(a.angleX, 0);
      const b = new Vec4(-1, 0, 0, 0);
      assert.strictEqual(b.angleX, PI);
    });
    it('get [y-axis angle]', () => {
      const a = new Vec4(0, 1, 0, 0);
      assert.strictEqual(a.angleY, 0);
      const b = new Vec4(0, -1, 0, 0);
      assert.strictEqual(b.angleY, PI);
    });
    it('get [z-axis angle]', () => {
      const a = new Vec4(0, 0, 1, 0);
      assert.strictEqual(a.angleZ, 0);
      const b = new Vec4(0, 0, -1, 0);
      assert.strictEqual(b.angleZ, PI);
    });
    it('get [w-axis angle]', () => {
      const a = new Vec4(0, 0, 0, 1);
      assert.strictEqual(a.angleW, 0);
      const b = new Vec4(0, 0, 0, -1);
      assert.strictEqual(b.angleW, PI);
    });
    it('create a [random] vector', () => {
      const a = Vec4.random();
      assert.approximately(a.magnitude, 1, EPSILON);
    });
    it('define a [random] direction but keep the same magnitude', () => {
      const a = new Vec4(0, 0, 0, 1);
      a.random();
      assert.notStrictEqual(a.w, 1);
      assert.approximately(a.magnitude, 1, EPSILON);
    });
    it('a vector can [clone] itself', () => {
      const a = new Vec4(1, 2, 3, 4);
      assert.deepStrictEqual(a.clone().xyzw, a.xyzw);
    });
    it('a vector can [copy] another vector', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(0, 0, 0, 0);
      assert.deepStrictEqual(b.copy(a).xyzw, a.xyzw);
    });
    it('[limit maximum magnitude]', () => {
      const a = new Vec4(1, 2, 3, 4);
      assert.approximately(a.limitMax(1).magnitude, 1, EPSILON);
    });
    it('[limit minimum magnitude]', () => {
      const a = new Vec4(1, 2, 3, 4);
      assert.strictEqual(a.limitMin(10).magnitude, 10);
    });
    it('[clamp magnitude]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, 4);
      assert.approximately(a.clamp(1, 1).magnitude, 1, EPSILON);
      assert.strictEqual(b.clamp(10, 10).magnitude, 10);
    });
    it('set all components at [zero]', () => {
      const a = new Vec4(1, 2, 3, 4);
      assert.strictEqual(a.zero().magnitude, 0);
    });
    it('two vectors [satisfy equality]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, 4);
      const c = new Vec4(4, 3, 2, 1);
      assert.strictEqual(Vec4.satisfyEquality(a, b), true);
      assert.strictEqual(a.satisfyEquality(b), true);
      assert.strictEqual(Vec4.satisfyEquality(a, c), false);
      assert.strictEqual(a.satisfyEquality(c), false);
    });
    it('two vectors [satisfy opposition]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(-1, -2, -3, -4);
      const c = new Vec4(1, 2, 3, 4);
      assert.strictEqual(Vec4.satisfyOpposition(a, b), true);
      assert.strictEqual(a.satisfyOpposition(b), true);
      assert.strictEqual(Vec4.satisfyOpposition(a, c), false);
      assert.strictEqual(a.satisfyOpposition(c), false);
    });
    it('check if a vector [is infinite]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, Infinity);
      assert.strictEqual(Vec4.isInfinite(a), false);
      assert.strictEqual(Vec4.isInfinite(b), true);
      assert.strictEqual(a.isInfinite(), false);
      assert.strictEqual(b.isInfinite(), true);
    });
    it('check if a vector [is NaN]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, NaN);
      assert.strictEqual(Vec4.isNaN(a), false);
      assert.strictEqual(Vec4.isNaN(b), true);
      assert.strictEqual(a.isNaN(), false);
      assert.strictEqual(b.isNaN(), true);
    });
    it('check if a vector [is zero]', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(0, 0, 0, 0);
      assert.strictEqual(Vec4.isZero(a), false);
      assert.strictEqual(Vec4.isZero(b), true);
      assert.strictEqual(a.isZero(), false);
      assert.strictEqual(b.isZero(), true);
    });
    it('[add] two vectors', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, 4);
      assert.deepStrictEqual(Vec4.add(a, b).xyzw, [2, 4, 6, 8]);
      assert.deepStrictEqual(a.add(b).xyzw, [2, 4, 6, 8]);
    });
    it('find the [angle between] two vectors', () => {
      const a = new Vec4(0, 0, 1, 0);
      const b = new Vec4(0, 0, 0, 1);
      assert.strictEqual(Vec4.angleBetween(a, b), DEG_90);
      assert.strictEqual(a.angleBetween(b), DEG_90);
    });
    it('find the [distance] between two vectors', () => {
      const a = new Vec4(0, 0, 0, 0);
      const b = new Vec4(1, 1, 1, 1);
      assert.strictEqual(Vec4.distance(a, b), Math.sqrt(4));
      assert.strictEqual(Vec4.distance(a, a), 0);
    });
    it('find the [distance chebyshev] between two vectors', () => {
      const a = new Vec4(0, 0, 0, 0);
      const b = new Vec4(0, 0, 1, 1);
      assert.strictEqual(Vec4.distanceChebyshev(a, b), 1);
      assert.strictEqual(Vec4.distanceChebyshev(a, a), 0);
    });
    it('find the [distance manhattan] between two vectors', () => {
      const a = new Vec4(0, 0, 0, 0);
      const b = new Vec4(0, 0, 1, 1);
      assert.strictEqual(Vec4.distanceManhattan(a, b), 2);
      assert.strictEqual(Vec4.distanceManhattan(a, a), 0);
    });
    it('find the [distance minkowski] between two vectors', () => {
      const a = new Vec4(0, 0, 0, 0);
      const b = new Vec4(0, 0, 1, 1);
      assert.strictEqual(Vec4.distanceMinkowski(a, b, 1), 2);
      assert.strictEqual(Vec4.distanceMinkowski(a, b, 2), Math.sqrt(2));
      assert.approximately(Vec4.distanceMinkowski(a, b, MAX_VALUE), 1, EPSILON);
      assert.strictEqual(Vec4.distanceMinkowski(a, a, 1), 0);
      assert.strictEqual(Vec4.distanceMinkowski(a, a, 2), 0);
      assert.strictEqual(Vec4.distanceMinkowski(a, a, MAX_VALUE), 0);
    });
    it('find the [distance squared] between two vectors', () => {
      const a = new Vec4(0, 0, 0, 0);
      const b = new Vec4(1, 1, 1, 1);
      assert.strictEqual(Vec4.distanceSq(a, b), 4);
      assert.strictEqual(Vec4.distanceSq(a, a), 0);
    });
    it('find the [dot product] between two vectors', () => {
      const a = new Vec4(0, 0, 1, 0);
      const b = new Vec4(0, 0, -1, 0);
      const c = new Vec4(0, 0, 0, 1);
      assert.strictEqual(Vec4.dot(a, a), 1);
      assert.strictEqual(Vec4.dot(a, b), -1);
      assert.strictEqual(Vec4.dot(a, c), 0);
      assert.strictEqual(a.dot(a), 1);
      assert.strictEqual(a.dot(b), -1);
      assert.strictEqual(a.dot(c), 0);
    });
    it('find the [linear interpolation] between two vectors', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(-1, -2, -3, -4);
      assert.deepStrictEqual(Vec4.lerp(a, b, 0.5).xyzw, [0, 0, 0, 0]);
    });
    it('[negate] a vector', () => {
      const a = new Vec4(1, 2, 3, 4);
      assert.deepStrictEqual(Vec4.negate(a).xyzw, [-1, -2, -3, -4]);
      assert.deepStrictEqual(a.negate().xyzw, [-1, -2, -3, -4]);
    });
    it('[normalize] a vector', () => {
      const a = new Vec4(1, 2, 3, 4);
      assert.approximately(Vec4.normalize(a).magnitude, 1, EPSILON);
      assert.approximately(a.normalize().magnitude, 1, EPSILON);
    });
    it('[project] a vector onto another', () => {
      const a = new Vec4(0, 0, 0, 1);
      const b = new Vec4(0, 0, 0, 2);
      assert.deepStrictEqual(Vec4.project(a, b).xyzw, [0, 0, 0, 1]);
      assert.deepStrictEqual(a.project(b).xyzw, [0, 0, 0, 1]);
    });
    it('[scale] a vector', () => {
      const a = new Vec4(1, 2, 3, 4);
      assert.deepStrictEqual(Vec4.scale(a, 0.5).xyzw, [0.5, 1, 1.5, 2]);
      assert.deepStrictEqual(a.scale(0.5).xyzw, [0.5, 1, 1.5, 2]);
    });
    it('[subtract] two vectors', () => {
      const a = new Vec4(1, 2, 3, 4);
      const b = new Vec4(1, 2, 3, 4);
      assert.deepStrictEqual(Vec4.subtract(a, b).xyzw, [0, 0, 0, 0]);
      assert.deepStrictEqual(a.subtract(b).xyzw, [0, 0, 0, 0]);
    });
    it('can be [iterated]', () => {
      const a = new Vec4(1, 2, 3, 4);
      assert.deepStrictEqual([...a], [1, 2, 3, 4]);
    });
  });
});
