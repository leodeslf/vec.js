const { PI, sin, cos, acos, atan2, sqrt, random, abs } = Math;
const PI2 = PI * 2;

// #region Vec2

class Vec2 {
  #magnitude = 0;
  #prevXY = new Float64Array([0, 0]);
  #xy = new Float64Array(2);

  #computeMagnitude(
    x = this.#xy[0],
    y = this.#xy[1]
  ) {
    if (
      x !== this.#prevXY[0] ||
      y !== this.#prevXY[1]
    ) {
      this.#magnitude = sqrt(
        x ** 2 +
        y ** 2
      );
      this.#prevXY[0] = x;
      this.#prevXY[1] = y;
    }
  }

  constructor(x = 0, y = 0) {
    this.#xy[0] = x;
    this.#xy[1] = y;
    this.#computeMagnitude(x, y);
  }

  static add(v, w) {
    return new Vec2(
      v.#xy[0] + w.#xy[0],
      v.#xy[1] + w.#xy[1]
    );
  }

  static angleBetween(v, w) {
    const vX = v.#xy[0];
    const vY = v.#xy[1];
    const wX = w.#xy[0];
    const wY = w.#xy[1];
    return atan2(
      vX * wY - vY * wX,
      vX * wX + vY * wY
    );
  }

  static distance(v, w) {
    return sqrt(
      (v.#xy[0] - w.#xy[0]) ** 2 +
      (v.#xy[1] - w.#xy[1]) ** 2
    );
  }

  static distanceChebyshev(v, w) {
    const absX = abs(v.#xy[0] - w.#xy[0]);
    const absY = abs(v.#xy[1] - w.#xy[1]);
    return absX >= absY ?
      absX :
      absY;
  }

  static distanceManhattan(v, w) {
    return (
      abs(v.#xy[0] - w.#xy[0]) +
      abs(v.#xy[1] - w.#xy[1])
    );
  }

  static distanceMinkowski(v, w, p) {
    return (
      abs(v.#xy[0] - w.#xy[0]) ** p +
      abs(v.#xy[1] - w.#xy[1]) ** p
    ) ** (1 / p);
  }

  static distanceSq(v, w) {
    return (
      (v.#xy[0] - w.#xy[0]) ** 2 +
      (v.#xy[1] - w.#xy[1]) ** 2
    );
  }

  static dot(v, w) {
    return (
      v.#xy[0] * w.#xy[0] +
      v.#xy[1] * w.#xy[1]
    );
  }

  static fromPolarCoords(r, theta) {
    return new Vec2(
      r * cos(theta),
      r * sin(theta)
    );
  }

  static immutable(x = 0, y = 0) {
    const data = new Float64Array(10);
    data[0] = x;
    data[1] = y;
    data[4] = atan2(
      y,
      x
    ) + (y < 0 ? PI2 : 0);
    data[5] = -atan2(
      x,
      y
    ) + (x > 0 ? PI2 : 0);
    const magnitudeSq = (
      x ** 2 +
      y ** 2
    );
    data[8] = sqrt(magnitudeSq);
    data[9] = magnitudeSq;
    const isInfinite = (
      x === +Infinity ||
      x === -Infinity ||
      y === +Infinity ||
      y === -Infinity
    );
    const _isNaN = (
      isNaN(x) &&
      isNaN(y)
    );
    const isZero = (
      x === 0 &&
      y === 0
    );
    const xy = Object.freeze([...data.slice(0, 2)]);
    return {
      get angleX() { return data[4]; },
      get angleY() { return data[5]; },
      get isInfinite() { return isInfinite; },
      get isNaN() { return _isNaN; },
      get isZero() { return isZero; },
      get magnitude() { return data[8]; },
      get magnitudeSq() { return data[10]; },
      get x() { return data[0]; },
      get xy() { return xy; },
      get y() { return data[1]; }
    };
  }

  static isInfinite(v) {
    const x = v.#xy[0];
    const y = v.#xy[1];
    return (
      x === +Infinity ||
      x === -Infinity ||
      y === +Infinity ||
      y === -Infinity
    );
  }

  static isNaN(v) {
    return (
      isNaN(v.#xy[0]) ||
      isNaN(v.#xy[1])
    );
  }

  static isZero(v) {
    return (
      v.#xy[0] === 0 &&
      v.#xy[1] === 0
    );
  }

  static lerp(v, w, t) {
    if (t > 1) t = 1;
    else if (t < 0) t = 0;
    const vX = v.#xy[0];
    const vY = v.#xy[1];
    return new Vec2(
      vX + (w.#xy[0] - vX) * t,
      vY + (w.#xy[1] - vY) * t
    );
  }

  static negate(v) {
    return new Vec2(
      -v.#xy[0],
      -v.#xy[1]
    );
  }

  static normalize(v) {
    const m = v.#magnitude;
    return new Vec2(
      v.#xy[0] / m,
      v.#xy[1] / m
    );
  }

  static project(v, w) {
    const vX = v.#xy[0];
    const vY = v.#xy[1];
    const wX = w.#xy[0];
    const wY = w.#xy[1];
    const wM = w.#magnitude;
    const f = v.#magnitude * cos(atan2(
      vX * wY - vY * wX,
      vX * wX + vY * wY
    ));
    return new Vec2(
      wX / wM * f,
      wY / wM * f
    );
  }

  static random() {
    const phi = random() * PI2;
    return new Vec2(
      cos(phi),
      sin(phi)
    );
  }

  static satisfyEquality(v, w) {
    return (
      v.#xy[0] === w.#xy[0] &&
      v.#xy[1] === w.#xy[1]
    );
  }

  static satisfyOpposition(v, w) {
    return (
      v.#xy[0] === -w.#xy[0] &&
      v.#xy[1] === -w.#xy[1]
    );
  }

  static scale(v, c) {
    return new Vec2(
      v.#xy[0] * c,
      v.#xy[1] * c
    );
  }

  static subtract(v, w) {
    return new Vec2(
      v.#xy[0] - w.#xy[0],
      v.#xy[1] - w.#xy[1]
    );
  }

  static zero() {
    return new Vec2();
  }

  get angleX() {
    return atan2(
      this.#xy[1],
      this.#xy[0]
    ) + (this.#xy[1] < 0 ? PI2 : 0);
  }

  get angleY() {
    return -atan2(
      this.#xy[0],
      this.#xy[1]
    ) + (this.#xy[0] > 0 ? PI2 : 0);
  }

  get magnitude() {
    return this.#magnitude;
  }

  get magnitudeSq() {
    return this.#magnitude ** 2;
  }

  get x() {
    return this.#xy[0];
  }

  get xy() {
    return [...this.#xy];
  }

  get y() {
    return this.#xy[1];
  }

  set angleX(phi) {
    const m = this.#magnitude;
    this.#xy[0] = m * cos(phi);
    this.#xy[1] = m * sin(phi);
    this.#computeMagnitude();
  }

  set angleY(phi) {
    const m = this.#magnitude;
    this.#xy[0] = m * -sin(phi);
    this.#xy[1] = m * cos(phi);
    this.#computeMagnitude();
  }

  set magnitude(m) {
    const M = this.#magnitude;
    this.#xy[0] = this.#xy[0] / M * m;
    this.#xy[1] = this.#xy[1] / M * m;
    this.#computeMagnitude();
  }

  set x(x) {
    this.#xy[0] = x;
    this.#computeMagnitude();
  }

  set xy(xy) {
    this.#xy[0] = xy[0];
    this.#xy[1] = xy[1];
    this.#computeMagnitude();
  }

  set y(y) {
    this.#xy[1] = y;
    this.#computeMagnitude();
  }

  add(v) {
    this.#xy[0] += v.#xy[0];
    this.#xy[1] += v.#xy[1];
    this.#computeMagnitude();
    return this;
  }

  angleBetween(v) {
    const x = this.#xy[0];
    const y = this.#xy[1];
    const vX = v.#xy[0];
    const vY = v.#xy[1];
    return atan2(
      x * vY - y * vX,
      x * vX + y * vY
    );
  }

  clamp(min, max) {
    const m = this.#magnitude;
    if (m > max) {
      this.#xy[0] = this.#xy[0] / m * max;
      this.#xy[1] = this.#xy[1] / m * max;
      this.#computeMagnitude();
    } else if (m < min) {
      this.#xy[0] = this.#xy[0] / m * min;
      this.#xy[1] = this.#xy[1] / m * min;
      this.#computeMagnitude();
    }
    return this;
  }

  clone() {
    return new Vec2(
      this.#xy[0],
      this.#xy[1]
    );
  }

  copy(v) {
    this.#xy[0] = v.#xy[0];
    this.#xy[1] = v.#xy[1];
    this.#computeMagnitude();
    return this;
  }

  distance(v) {
    return sqrt(
      (this.#xy[0] - v.#xy[0]) ** 2 +
      (this.#xy[1] - v.#xy[1]) ** 2
    );
  }

  distanceSq(v) {
    return (
      (this.#xy[0] - v.#xy[0]) ** 2 +
      (this.#xy[1] - v.#xy[1]) ** 2
    );
  }

  dot(v) {
    return (
      this.#xy[0] * v.#xy[0] +
      this.#xy[1] * v.#xy[1]
    );
  }

  isInfinite() {
    const x = this.#xy[0];
    const y = this.#xy[1];
    return (
      x === +Infinity ||
      x === -Infinity ||
      y === +Infinity ||
      y === -Infinity
    );
  }

  isNaN() {
    return (
      isNaN(this.#xy[0]) ||
      isNaN(this.#xy[1])
    );
  }

  isZero() {
    return (
      this.#xy[0] === 0 &&
      this.#xy[1] === 0
    );
  }

  limitMax(max) {
    const m = this.#magnitude;
    if (m > max) {
      this.#xy[0] = this.#xy[0] / m * max;
      this.#xy[1] = this.#xy[1] / m * max;
      this.#computeMagnitude();
    }
    return this;
  }

  limitMin(min) {
    const m = this.#magnitude;
    if (m < min) {
      this.#xy[0] = this.#xy[0] / m * min;
      this.#xy[1] = this.#xy[1] / m * min;
      this.#computeMagnitude();
    }
    return this;
  }

  lookAt(v) {
    const m = this.#magnitude;
    const vM = v.#magnitude;
    this.#xy[0] = v.#xy[0] / vM * m;
    this.#xy[1] = v.#xy[1] / vM * m;
    this.#computeMagnitude();
    return this;
  }

  negate() {
    this.#xy[0] *= -1;
    this.#xy[1] *= -1;
    this.#computeMagnitude();
    return this;
  }

  normalize() {
    const m = this.#magnitude;
    this.#xy[0] /= m;
    this.#xy[1] /= m;
    this.#computeMagnitude();
    return this;
  }

  project(v) {
    const x = this.#xy[0];
    const y = this.#xy[1];
    const vX = v.#xy[0];
    const vY = v.#xy[1];
    const vM = v.#magnitude;
    const f = this.#magnitude * cos(atan2(
      x * vY - y * vX,
      x * vX + y * vY
    ));
    this.#xy[0] = vX / vM * f;
    this.#xy[1] = vY / vM * f;
    this.#computeMagnitude();
    return this;
  }

  random() {
    const phi = random() * PI2;
    const m = this.#magnitude;
    this.#xy[0] = m * cos(phi);
    this.#xy[1] = m * sin(phi);
    this.#computeMagnitude();
    return this;
  }

  rotateZ(phi) {
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const x = this.#xy[0];
    const y = this.#xy[1];
    this.#xy[0] = x * cosPhi - y * sinPhi;
    this.#xy[1] = x * sinPhi + y * cosPhi;
    this.#computeMagnitude();
    return this;
  }

  satisfyEquality(v) {
    return (
      this.#xy[0] === v.#xy[0] &&
      this.#xy[1] === v.#xy[1]
    );
  }

  satisfyOpposition(v) {
    return (
      this.#xy[0] === -v.#xy[0] &&
      this.#xy[1] === -v.#xy[1]
    );
  }

  scale(c) {
    this.#xy[0] *= c;
    this.#xy[1] *= c;
    return this;
  }

  subtract(v) {
    this.#xy[0] -= v.#xy[0];
    this.#xy[1] -= v.#xy[1];
    this.#computeMagnitude();
    return this;
  }

  turnLeft() {
    const x = this.#xy[0];
    this.#xy[0] = -this.#xy[1];
    this.#xy[1] = x;
    this.#computeMagnitude();
    return this;
  }

  turnRight() {
    const x = this.#xy[0];
    this.#xy[0] = this.#xy[1];
    this.#xy[1] = -x;
    this.#computeMagnitude();
    return this;
  }

  zero() {
    this.#xy[0] = 0;
    this.#xy[1] = 0;
    this.#computeMagnitude();
    return this;
  }

  *[Symbol.iterator]() {
    yield this.#xy[0];
    yield this.#xy[1];
  }
}

// #region Vec3

class Vec3 {
  #magnitude = 0;
  #prevXYZ = new Float64Array([0, 0, 0]);
  #xyz = new Float64Array(3);

  #computeMagnitude(
    x = this.#xyz[0],
    y = this.#xyz[1],
    z = this.#xyz[2]
  ) {
    if (
      x !== this.#prevXYZ[0] ||
      y !== this.#prevXYZ[1] ||
      z !== this.#prevXYZ[2]
    ) {
      this.#magnitude = sqrt(
        x ** 2 +
        y ** 2 +
        z ** 2
      );
      this.#prevXYZ[0] = x;
      this.#prevXYZ[1] = y;
      this.#prevXYZ[2] = z;
    }
  }

  constructor(x = 0, y = 0, z = 0) {
    this.#xyz[0] = x;
    this.#xyz[1] = y;
    this.#xyz[2] = z;
    this.#computeMagnitude(x, y, z);
  }

  static add(v, w) {
    return new Vec3(
      v.#xyz[0] + w.#xyz[0],
      v.#xyz[1] + w.#xyz[1],
      v.#xyz[2] + w.#xyz[2]
    );
  }

  static angleBetween(v, w) {
    return acos((
      v.#xyz[0] * w.#xyz[0] +
      v.#xyz[1] * w.#xyz[1] +
      v.#xyz[2] * w.#xyz[2]
    ) / (v.#magnitude * w.#magnitude));
  }

  static cross(v, w) {
    const vX = v.#xyz[0];
    const vY = v.#xyz[1];
    const vZ = v.#xyz[2];
    const wX = w.#xyz[0];
    const wY = w.#xyz[1];
    const wZ = w.#xyz[2];
    return new Vec3(
      vY * wZ - vZ * wY,
      vZ * wX - vX * wZ,
      vX * wY - vY * wX
    );
  }

  static distance(v, w) {
    return sqrt(
      (v.#xyz[0] - w.#xyz[0]) ** 2 +
      (v.#xyz[1] - w.#xyz[1]) ** 2 +
      (v.#xyz[2] - w.#xyz[2]) ** 2
    );
  }

  static distanceChebyshev(v, w) {
    const absX = abs(v.#xyz[0] - w.#xyz[0]);
    const absY = abs(v.#xyz[1] - w.#xyz[1]);
    const absZ = abs(v.#xyz[2] - w.#xyz[2]);
    return absX >= absY && absX >= absZ ?
      absX :
      absY >= absZ ?
        absY :
        absZ;
  }

  static distanceManhattan(v, w) {
    return (
      abs(v.#xyz[0] - w.#xyz[0]) +
      abs(v.#xyz[1] - w.#xyz[1]) +
      abs(v.#xyz[2] - w.#xyz[2])
    );
  }

  static distanceMinkowski(v, w, p) {
    return (
      abs(v.#xyz[0] - w.#xyz[0]) ** p +
      abs(v.#xyz[1] - w.#xyz[1]) ** p +
      abs(v.#xyz[2] - w.#xyz[2]) ** p
    ) ** (1 / p);
  }

  static distanceSq(v, w) {
    return (
      (v.#xyz[0] - w.#xyz[0]) ** 2 +
      (v.#xyz[1] - w.#xyz[1]) ** 2 +
      (v.#xyz[2] - w.#xyz[2]) ** 2
    );
  }

  static dot(v, w) {
    return (
      v.#xyz[0] * w.#xyz[0] +
      v.#xyz[1] * w.#xyz[1] +
      v.#xyz[2] * w.#xyz[2]
    );
  }

  static fromCylindricalCoords(r, phi, z) {
    return new Vec3(
      r * cos(phi),
      r * sin(phi),
      z
    );
  }

  static fromSphericalCoords(r, theta, phi) {
    return new Vec3(
      r * sin(theta) * cos(phi),
      r * sin(theta) * sin(phi),
      r * cos(theta)
    );
  }

  static immutable(x = 0, y = 0, z = 0) {
    const data = new Float64Array(10);
    data[0] = x;
    data[1] = y;
    data[2] = z;
    const xySqSum = (
      x ** 2 +
      y ** 2
    );
    data[4] = atan2(sqrt(
      y ** 2 +
      z ** 2
    ), x);
    data[5] = atan2(sqrt(
      z ** 2 +
      x ** 2
    ), y);
    data[6] = atan2(sqrt(
      xySqSum
    ), z);
    const magnitudeSq = (
      xySqSum +
      z ** 2
    );
    data[8] = sqrt(magnitudeSq);
    data[9] = magnitudeSq;
    const isInfinite = (
      x === +Infinity ||
      x === -Infinity ||
      y === +Infinity ||
      y === -Infinity ||
      z === +Infinity ||
      z === -Infinity
    );
    const _isNaN = (
      isNaN(x) &&
      isNaN(y) &&
      isNaN(z)
    );
    const isZero = (
      x === 0 &&
      y === 0 &&
      z === 0
    );
    const xyz = Object.freeze([...data.slice(0, 3)]);
    return {
      get angleX() { return data[4]; },
      get angleY() { return data[5]; },
      get angleZ() { return data[6]; },
      get b() { return data[2]; },
      get g() { return data[1]; },
      get isInfinite() { return isInfinite; },
      get isNaN() { return _isNaN; },
      get isZero() { return isZero; },
      get magnitude() { return data[8]; },
      get magnitudeSq() { return data[10]; },
      get r() { return data[0]; },
      get rgb() { return xyz; },
      get x() { return data[0]; },
      get xyz() { return xyz; },
      get y() { return data[1]; },
      get z() { return data[2]; }
    };
  }

  static isInfinite(v) {
    const x = v.#xyz[0];
    const y = v.#xyz[1];
    const z = v.#xyz[2];
    return (
      x === +Infinity ||
      x === -Infinity ||
      y === +Infinity ||
      y === -Infinity ||
      z === +Infinity ||
      z === -Infinity
    );
  }

  static isNaN(v) {
    return (
      isNaN(v.#xyz[0]) ||
      isNaN(v.#xyz[1]) ||
      isNaN(v.#xyz[2])
    );
  }

  static isZero(v) {
    return (
      v.#xyz[0] === 0 &&
      v.#xyz[1] === 0 &&
      v.#xyz[2] === 0
    );
  }

  static lerp(v, w, t) {
    if (t > 1) t = 1;
    else if (t < 0) t = 0;
    const vX = v.#xyz[0];
    const vY = v.#xyz[1];
    const vZ = v.#xyz[2];
    return new Vec3(
      vX + (w.#xyz[0] - vX) * t,
      vY + (w.#xyz[1] - vY) * t,
      vZ + (w.#xyz[2] - vZ) * t
    );
  }

  static negate(v) {
    return new Vec3(
      -v.#xyz[0],
      -v.#xyz[1],
      -v.#xyz[2]
    );
  }

  static normalize(v) {
    const m = v.#magnitude;
    return new Vec3(
      v.#xyz[0] / m,
      v.#xyz[1] / m,
      v.#xyz[2] / m
    );
  }

  static project(v, w) {
    const vM = v.#magnitude;
    const wM = w.#magnitude;
    const wX = w.#xyz[0];
    const wY = w.#xyz[1];
    const wZ = w.#xyz[2];
    const f = vM * cos(acos((
      v.#xyz[0] * wX +
      v.#xyz[1] * wY +
      v.#xyz[2] * wZ
    ) / (vM * wM)));
    return new Vec3(
      wX / wM * f,
      wY / wM * f,
      wZ / wM * f
    );
  }

  static random() {
    let x1;
    let x2;
    do {
      x1 = random() * 2 - 1;
      x2 = random() * 2 - 1;
    } while (x1 ** 2 + x2 ** 2 >= 1);
    const f = sqrt((1 - x1 ** 2 - x2 ** 2));
    return new Vec3(
      2 * x1 * f,
      2 * x2 * f,
      1 - 2 * (x1 ** 2 + x2 ** 2)
    );
  }

  static satisfyEquality(v, w) {
    return (
      v.#xyz[0] === w.#xyz[0] &&
      v.#xyz[1] === w.#xyz[1] &&
      v.#xyz[2] === w.#xyz[2]
    );
  }

  static satisfyOpposition(v, w) {
    return (
      v.#xyz[0] === -w.#xyz[0] &&
      v.#xyz[1] === -w.#xyz[1] &&
      v.#xyz[2] === -w.#xyz[2]
    );
  }

  static scale(v, c) {
    return new Vec3(
      v.#xyz[0] * c,
      v.#xyz[1] * c,
      v.#xyz[2] * c
    );
  }

  static subtract(v, w) {
    return new Vec3(
      v.#xyz[0] - w.#xyz[0],
      v.#xyz[1] - w.#xyz[1],
      v.#xyz[2] - w.#xyz[2]
    );
  }

  static zero() {
    return new Vec3();
  }

  get angleX() {
    return atan2(sqrt(
      this.#xyz[1] ** 2 +
      this.#xyz[2] ** 2
    ), this.#xyz[0]);
  }

  get angleY() {
    return atan2(sqrt(
      this.#xyz[2] ** 2 +
      this.#xyz[0] ** 2
    ), this.#xyz[1]);
  }

  get angleZ() {
    return atan2(sqrt(
      this.#xyz[0] ** 2 +
      this.#xyz[1] ** 2
    ), this.#xyz[2]);
  }

  get b() {
    return this.#xyz[2];
  }

  get g() {
    return this.#xyz[1];
  }

  get magnitude() {
    return this.#magnitude;
  }

  get magnitudeSq() {
    return this.#magnitude ** 2;
  }

  get r() {
    return this.#xyz[0];
  }

  get rgb() {
    return [...this.#xyz];
  }

  get x() {
    return this.#xyz[0];
  }

  get xyz() {
    return [...this.#xyz];
  }

  get y() {
    return this.#xyz[1];
  }

  get z() {
    return this.#xyz[2];
  }

  set b(b) {
    this.#xyz[2] = b;
    this.#computeMagnitude();
  }

  set g(g) {
    this.#xyz[1] = g;
    this.#computeMagnitude();
  }

  set magnitude(m) {
    const M = this.#magnitude;
    this.#xyz[0] = this.#xyz[0] / M * m;
    this.#xyz[1] = this.#xyz[1] / M * m;
    this.#xyz[2] = this.#xyz[2] / M * m;
    this.#computeMagnitude();
  }

  set r(r) {
    this.#xyz[0] = r;
    this.#computeMagnitude();
  }

  set rgb(rgb) {
    this.#xyz[0] = rgb[0];
    this.#xyz[1] = rgb[1];
    this.#xyz[2] = rgb[2];
    this.#computeMagnitude();
  }

  set x(x) {
    this.#xyz[0] = x;
    this.#computeMagnitude();
  }

  set xyz(xyz) {
    this.#xyz[0] = xyz[0];
    this.#xyz[1] = xyz[1];
    this.#xyz[2] = xyz[2];
    this.#computeMagnitude();
  }

  set y(y) {
    this.#xyz[1] = y;
    this.#computeMagnitude();
  }

  set z(z) {
    this.#xyz[2] = z;
    this.#computeMagnitude();
  }

  add(v) {
    this.#xyz[0] += v.#xyz[0];
    this.#xyz[1] += v.#xyz[1];
    this.#xyz[2] += v.#xyz[2];
    this.#computeMagnitude();
    return this;
  }

  angleBetween(v) {
    return acos((
      this.#xyz[0] * v.#xyz[0] +
      this.#xyz[1] * v.#xyz[1] +
      this.#xyz[2] * v.#xyz[2]
    ) / (this.#magnitude * v.#magnitude));
  }

  clamp(min, max) {
    const m = this.#magnitude;
    if (m > max) {
      this.#xyz[0] = this.#xyz[0] / m * max;
      this.#xyz[1] = this.#xyz[1] / m * max;
      this.#xyz[2] = this.#xyz[2] / m * max;
      this.#computeMagnitude();
    } else if (m < min) {
      this.#xyz[0] = this.#xyz[0] / m * min;
      this.#xyz[1] = this.#xyz[1] / m * min;
      this.#xyz[2] = this.#xyz[2] / m * min;
      this.#computeMagnitude();
    }
    return this;
  }

  clone() {
    return new Vec3(
      this.#xyz[0],
      this.#xyz[1],
      this.#xyz[2]
    );
  }

  copy(v) {
    this.#xyz[0] = v.#xyz[0];
    this.#xyz[1] = v.#xyz[1];
    this.#xyz[2] = v.#xyz[2];
    this.#computeMagnitude();
    return this;
  }

  cross(v) {
    const x = this.#xyz[0];
    const y = this.#xyz[1];
    const z = this.#xyz[2];
    const vX = v.#xyz[0];
    const vY = v.#xyz[1];
    const vZ = v.#xyz[2];
    this.#xyz[0] = y * vZ - z * vY;
    this.#xyz[1] = z * vX - x * vZ;
    this.#xyz[2] = x * vY - y * vX;
    this.#computeMagnitude();
    return this;
  }

  distance(v) {
    return sqrt(
      (this.#xyz[0] - v.#xyz[0]) ** 2 +
      (this.#xyz[1] - v.#xyz[1]) ** 2 +
      (this.#xyz[2] - v.#xyz[2]) ** 2
    );
  }

  distanceSq(v) {
    return (
      (this.#xyz[0] - v.#xyz[0]) ** 2 +
      (this.#xyz[1] - v.#xyz[1]) ** 2 +
      (this.#xyz[2] - v.#xyz[2]) ** 2
    );
  }

  dot(v) {
    return (
      this.#xyz[0] * v.#xyz[0] +
      this.#xyz[1] * v.#xyz[1] +
      this.#xyz[2] * v.#xyz[2]
    );
  }

  isInfinite() {
    const x = this.#xyz[0];
    const y = this.#xyz[1];
    const z = this.#xyz[2];
    return (
      x === +Infinity ||
      x === -Infinity ||
      y === +Infinity ||
      y === -Infinity ||
      z === +Infinity ||
      z === -Infinity
    );
  }

  isNaN() {
    return (
      isNaN(this.#xyz[0]) ||
      isNaN(this.#xyz[1]) ||
      isNaN(this.#xyz[2])
    );
  }

  isZero() {
    return (
      this.#xyz[0] === 0 &&
      this.#xyz[1] === 0 &&
      this.#xyz[2] === 0
    );
  }

  limitMax(max) {
    const m = this.#magnitude;
    if (m > max) {
      this.#xyz[0] = this.#xyz[0] / m * max;
      this.#xyz[1] = this.#xyz[1] / m * max;
      this.#xyz[2] = this.#xyz[2] / m * max;
      this.#computeMagnitude();
    }
    return this;
  }

  limitMin(min) {
    const m = this.#magnitude;
    if (m < min) {
      this.#xyz[0] = this.#xyz[0] / m * min;
      this.#xyz[1] = this.#xyz[1] / m * min;
      this.#xyz[2] = this.#xyz[2] / m * min;
      this.#computeMagnitude();
    }
    return this;
  }

  lookAt(v) {
    const m = this.#magnitude;
    const vM = v.#magnitude;
    this.#xyz[0] = v.#xyz[0] / vM * m;
    this.#xyz[1] = v.#xyz[1] / vM * m;
    this.#xyz[2] = v.#xyz[2] / vM * m;
    this.#computeMagnitude();
    return this;
  }

  negate() {
    this.#xyz[0] *= -1;
    this.#xyz[1] *= -1;
    this.#xyz[2] *= -1;
    this.#computeMagnitude();
    return this;
  }

  normalize() {
    const m = this.#magnitude;
    this.#xyz[0] /= m;
    this.#xyz[1] /= m;
    this.#xyz[2] /= m;
    this.#computeMagnitude();
    return this;
  }

  project(v) {
    const m = this.#magnitude;
    const vM = v.#magnitude;
    const vX = v.#xyz[0];
    const vY = v.#xyz[1];
    const vZ = v.#xyz[2];
    const f = m * cos(acos((
      this.#xyz[0] * vX +
      this.#xyz[1] * vY +
      this.#xyz[2] * vZ
    ) / (m * vM)));
    this.#xyz[0] = vX / vM * f;
    this.#xyz[1] = vY / vM * f;
    this.#xyz[2] = vZ / vM * f;
    this.#computeMagnitude();
    return this;
  }

  random() {
    let x1;
    let x2;
    do {
      x1 = random() * 2 - 1;
      x2 = random() * 2 - 1;
    } while (x1 ** 2 + x2 ** 2 >= 1);
    const f = sqrt((1 - x1 ** 2 - x2 ** 2));
    const m = this.#magnitude;
    this.#xyz[0] = m * 2 * x1 * f;
    this.#xyz[1] = m * 2 * x2 * f;
    this.#xyz[2] = m * (1 - 2 * (x1 ** 2 + x2 ** 2));
    this.#computeMagnitude();
    return this;
  }

  rotateX(phi) {
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const y = this.#xyz[1];
    const z = this.#xyz[2];
    this.#xyz[1] = y * cosPhi - z * sinPhi;
    this.#xyz[2] = y * sinPhi + z * cosPhi;
    this.#computeMagnitude();
    return this;
  }

  rotateY(phi) {
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const x = this.#xyz[0];
    const z = this.#xyz[2];
    this.#xyz[0] = x * cosPhi + z * sinPhi;
    this.#xyz[2] = x * sinPhi + z * cosPhi;
    this.#computeMagnitude();
    return this;
  }

  rotateZ(phi) {
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const x = this.#xyz[0];
    const y = this.#xyz[1];
    this.#xyz[0] = x * cosPhi - y * sinPhi;
    this.#xyz[1] = x * sinPhi + y * cosPhi;
    this.#computeMagnitude();
    return this;
  }

  satisfyEquality(v) {
    return (
      this.#xyz[0] === v.#xyz[0] &&
      this.#xyz[1] === v.#xyz[1] &&
      this.#xyz[2] === v.#xyz[2]
    );
  }

  satisfyOpposition(v) {
    return (
      this.#xyz[0] === -v.#xyz[0] &&
      this.#xyz[1] === -v.#xyz[1] &&
      this.#xyz[2] === -v.#xyz[2]
    );
  }

  scale(c) {
    this.#xyz[0] *= c;
    this.#xyz[1] *= c;
    this.#xyz[2] *= c;
    this.#computeMagnitude();
    return this;
  }

  subtract(v) {
    this.#xyz[0] -= v.#xyz[0];
    this.#xyz[1] -= v.#xyz[1];
    this.#xyz[2] -= v.#xyz[2];
    this.#computeMagnitude();
    return this;
  }

  zero() {
    this.#xyz[0] = 0;
    this.#xyz[1] = 0;
    this.#xyz[2] = 0;
    this.#computeMagnitude();
    return this;
  }

  *[Symbol.iterator]() {
    yield this.#xyz[0];
    yield this.#xyz[1];
    yield this.#xyz[2];
  }
}

// #region Vec4

class Vec4 {
  #magnitude = 0;
  #prevXYZW = new Float64Array([0, 0, 0, 0]);
  #xyzw = new Float64Array(4);

  #computeMagnitude(
    x = this.#xyzw[0],
    y = this.#xyzw[1],
    z = this.#xyzw[2],
    w = this.#xyzw[3]
  ) {
    if (
      x !== this.#prevXYZW[0] ||
      y !== this.#prevXYZW[1] ||
      z !== this.#prevXYZW[2] ||
      w !== this.#prevXYZW[3]
    ) {
      this.#magnitude = sqrt(
        x ** 2 +
        y ** 2 +
        z ** 2 +
        w ** 2
      );
      this.#prevXYZW[0] = x;
      this.#prevXYZW[1] = y;
      this.#prevXYZW[2] = z;
      this.#prevXYZW[3] = w;
    }
  }

  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.#xyzw[0] = x;
    this.#xyzw[1] = y;
    this.#xyzw[2] = z;
    this.#xyzw[3] = w;
    this.#computeMagnitude(x, y, z, w);
  }

  static add(v, w) {
    return new Vec4(
      v.#xyzw[0] + w.#xyzw[0],
      v.#xyzw[1] + w.#xyzw[1],
      v.#xyzw[2] + w.#xyzw[2],
      v.#xyzw[3] + w.#xyzw[3]
    );
  }

  static angleBetween(v, w) {
    return acos((
      v.#xyzw[0] * w.#xyzw[0] +
      v.#xyzw[1] * w.#xyzw[1] +
      v.#xyzw[2] * w.#xyzw[2] +
      v.#xyzw[3] * w.#xyzw[3]
    ) / (v.#magnitude * w.#magnitude));
  }

  static distance(v, w) {
    return sqrt(
      (v.#xyzw[0] - w.#xyzw[0]) ** 2 +
      (v.#xyzw[1] - w.#xyzw[1]) ** 2 +
      (v.#xyzw[2] - w.#xyzw[2]) ** 2 +
      (v.#xyzw[3] - w.#xyzw[3]) ** 2
    );
  }

  static distanceChebyshev(v, w) {
    const absX = abs(v.#xyzw[0] - w.#xyzw[0]);
    const absY = abs(v.#xyzw[1] - w.#xyzw[1]);
    const absZ = abs(v.#xyzw[2] - w.#xyzw[2]);
    const absW = abs(v.#xyzw[3] - w.#xyzw[3]);
    return absX >= absY && absX >= absZ && absX >= absW ?
      absX :
      absY >= absZ && absY >= absW ?
        absY :
        absZ >= absW ?
          absZ :
          absW;
  }

  static distanceManhattan(v, w) {
    return (
      abs(v.#xyzw[0] - w.#xyzw[0]) +
      abs(v.#xyzw[1] - w.#xyzw[1]) +
      abs(v.#xyzw[2] - w.#xyzw[2]) +
      abs(v.#xyzw[3] - w.#xyzw[3])
    );
  }

  static distanceMinkowski(v, w, p) {
    return (
      abs(v.#xyzw[0] - w.#xyzw[0]) ** p +
      abs(v.#xyzw[1] - w.#xyzw[1]) ** p +
      abs(v.#xyzw[2] - w.#xyzw[2]) ** p +
      abs(v.#xyzw[3] - w.#xyzw[3]) ** p
    ) ** (1 / p);
  }

  static distanceSq(v, w) {
    return (
      (v.#xyzw[0] - w.#xyzw[0]) ** 2 +
      (v.#xyzw[1] - w.#xyzw[1]) ** 2 +
      (v.#xyzw[2] - w.#xyzw[2]) ** 2 +
      (v.#xyzw[3] - w.#xyzw[3]) ** 2
    );
  }

  static dot(v, w) {
    return (
      v.#xyzw[0] * w.#xyzw[0] +
      v.#xyzw[1] * w.#xyzw[1] +
      v.#xyzw[2] * w.#xyzw[2] +
      v.#xyzw[3] * w.#xyzw[3]
    );
  }

  static immutable(x = 0, y = 0, z = 0, w = 0) {
    const data = new Float64Array(10);
    data[0] = x;
    data[1] = y;
    data[2] = z;
    data[3] = w;
    const xyzSqSum = (
      x ** 2 +
      y ** 2 +
      z ** 2
    );
    data[4] = atan2(sqrt(
      y ** 2 +
      z ** 2 +
      w ** 2
    ), x);
    data[5] = atan2(sqrt(
      z ** 2 +
      w ** 2 +
      x ** 2
    ), y);
    data[6] = atan2(sqrt(
      w ** 2 +
      x ** 2 +
      y ** 2
    ), z);
    data[7] = atan2(sqrt(
      xyzSqSum
    ), w);
    const magnitudeSq = (
      xyzSqSum +
      w ** 2
    );
    data[8] = sqrt(magnitudeSq);
    data[9] = magnitudeSq;
    const isInfinite = (
      x === +Infinity ||
      x === -Infinity ||
      y === +Infinity ||
      y === -Infinity ||
      z === +Infinity ||
      z === -Infinity ||
      w === +Infinity ||
      w === -Infinity
    );
    const _isNaN = (
      isNaN(x) &&
      isNaN(y) &&
      isNaN(z) &&
      isNaN(w)
    );
    const isZero = (
      x === 0 &&
      y === 0 &&
      z === 0 &&
      w === 0
    );
    const xyzw = Object.freeze([...data.slice(0, 4)]);
    return {
      get a() { return data[3]; },
      get angleW() { return data[7] },
      get angleX() { return data[4]; },
      get angleY() { return data[5]; },
      get angleZ() { return data[6]; },
      get b() { return data[2]; },
      get g() { return data[1]; },
      get isInfinite() { return isInfinite; },
      get isNaN() { return _isNaN; },
      get isZero() { return isZero; },
      get magnitude() { return data[8]; },
      get magnitudeSq() { return data[10]; },
      get r() { return data[0]; },
      get rgba() { return xyzw; },
      get w() { return data[3]; },
      get x() { return data[0]; },
      get xyzw() { return xyzw; },
      get y() { return data[1]; },
      get z() { return data[2]; }
    };
  }

  static isInfinite(v) {
    const x = v.#xyzw[0];
    const y = v.#xyzw[1];
    const z = v.#xyzw[2];
    const w = v.#xyzw[3];
    return (
      x === +Infinity ||
      x === -Infinity ||
      y === +Infinity ||
      y === -Infinity ||
      z === +Infinity ||
      z === -Infinity ||
      w === +Infinity ||
      w === -Infinity
    );
  }

  static isNaN(v) {
    return (
      isNaN(v.#xyzw[0]) ||
      isNaN(v.#xyzw[1]) ||
      isNaN(v.#xyzw[2]) ||
      isNaN(v.#xyzw[3])
    );
  }

  static isZero(v) {
    return (
      v.#xyzw[0] === 0 &&
      v.#xyzw[1] === 0 &&
      v.#xyzw[2] === 0 &&
      v.#xyzw[3] === 0
    );
  }

  static lerp(v, w, t) {
    if (t > 1) t = 1;
    else if (t < 0) t = 0;
    const vX = v.#xyzw[0];
    const vY = v.#xyzw[1];
    const vZ = v.#xyzw[2];
    const vW = v.#xyzw[3];
    return new Vec4(
      vX + (w.#xyzw[0] - vX) * t,
      vY + (w.#xyzw[1] - vY) * t,
      vZ + (w.#xyzw[2] - vZ) * t,
      vW + (w.#xyzw[3] - vW) * t
    );
  }

  static negate(v) {
    return new Vec4(
      -v.#xyzw[0],
      -v.#xyzw[1],
      -v.#xyzw[2],
      -v.#xyzw[3]
    );
  }

  static normalize(v) {
    const m = v.#magnitude;
    return new Vec4(
      v.#xyzw[0] / m,
      v.#xyzw[1] / m,
      v.#xyzw[2] / m,
      v.#xyzw[3] / m
    );
  }

  static project(v, w) {
    const vM = v.#magnitude;
    const wM = w.#magnitude;
    const wX = w.#xyzw[0];
    const wY = w.#xyzw[1];
    const wZ = w.#xyzw[2];
    const wW = w.#xyzw[3];
    const f = vM * cos(acos((
      v.#xyzw[0] * wX +
      v.#xyzw[1] * wY +
      v.#xyzw[2] * wZ +
      v.#xyzw[3] * wW
    ) / (vM * wM)));
    return new Vec4(
      wX / wM * f,
      wY / wM * f,
      wZ / wM * f,
      wW / wM * f
    );
  }

  static random() {
    let x1;
    let x2;
    let x3;
    let x4;
    do {
      x1 = random() * 2 - 1;
      x2 = random() * 2 - 1;
      x3 = random() * 2 - 1;
      x4 = random() * 2 - 1;
    } while (x1 ** 2 + x2 ** 2 >= 1 || x3 ** 2 + x4 ** 2 >= 1);
    const f = sqrt((1 - x1 ** 2 - x2 ** 2) / (x3 ** 2 + x4 ** 2));
    return new Vec4(
      x1,
      x2,
      x3 * f,
      x4 * f
    );
  }

  static satisfyEquality(v, w) {
    return (
      v.#xyzw[0] === w.#xyzw[0] &&
      v.#xyzw[1] === w.#xyzw[1] &&
      v.#xyzw[2] === w.#xyzw[2] &&
      v.#xyzw[3] === w.#xyzw[3]
    );
  }

  static satisfyOpposition(v, w) {
    return (
      v.#xyzw[0] === -w.#xyzw[0] &&
      v.#xyzw[1] === -w.#xyzw[1] &&
      v.#xyzw[2] === -w.#xyzw[2] &&
      v.#xyzw[3] === -w.#xyzw[3]
    );
  }

  static scale(v, c) {
    return new Vec4(
      v.#xyzw[0] * c,
      v.#xyzw[1] * c,
      v.#xyzw[2] * c,
      v.#xyzw[3] * c
    );
  }

  static subtract(v, w) {
    return new Vec4(
      v.#xyzw[0] - w.#xyzw[0],
      v.#xyzw[1] - w.#xyzw[1],
      v.#xyzw[2] - w.#xyzw[2],
      v.#xyzw[3] - w.#xyzw[3]
    );
  }

  static zero() {
    return new Vec4();
  }

  get a() {
    return this.#xyzw[3];
  }

  get angleW() {
    return atan2(sqrt(
      this.#xyzw[0] ** 2 +
      this.#xyzw[1] ** 2 +
      this.#xyzw[2] ** 2
    ), this.#xyzw[3]);
  }

  get angleX() {
    return atan2(sqrt(
      this.#xyzw[1] ** 2 +
      this.#xyzw[2] ** 2 +
      this.#xyzw[3] ** 2
    ), this.#xyzw[0]);
  }

  get angleY() {
    return atan2(sqrt(
      this.#xyzw[2] ** 2 +
      this.#xyzw[3] ** 2 +
      this.#xyzw[0] ** 2
    ), this.#xyzw[1]);
  }

  get angleZ() {
    return atan2(sqrt(
      this.#xyzw[3] ** 2 +
      this.#xyzw[0] ** 2 +
      this.#xyzw[1] ** 2
    ), this.#xyzw[2]);
  }

  get b() {
    return this.#xyzw[2];
  }

  get g() {
    return this.#xyzw[1];
  }

  get magnitude() {
    return this.#magnitude;
  }

  get magnitudeSq() {
    return this.#magnitude ** 2;
  }

  get r() {
    return this.#xyzw[0];
  }

  get rgba() {
    return [...this.#xyzw];
  }

  get w() {
    return this.#xyzw[3];
  }

  get x() {
    return this.#xyzw[0];
  }

  get xyzw() {
    return [...this.#xyzw];
  }

  get y() {
    return this.#xyzw[1];
  }

  get z() {
    return this.#xyzw[2];
  }

  set a(a) {
    this.#xyzw[3] = a;
    this.#computeMagnitude();
  }

  set b(b) {
    this.#xyzw[2] = b;
    this.#computeMagnitude();
  }

  set g(g) {
    this.#xyzw[1] = g;
    this.#computeMagnitude();
  }

  set magnitude(m) {
    const M = this.#magnitude;
    this.#xyzw[0] = this.#xyzw[0] / M * m;
    this.#xyzw[1] = this.#xyzw[1] / M * m;
    this.#xyzw[2] = this.#xyzw[2] / M * m;
    this.#xyzw[3] = this.#xyzw[3] / M * m;
    this.#computeMagnitude();
  }

  set r(r) {
    this.#xyzw[0] = r;
    this.#computeMagnitude();
  }

  set rgba(rgba) {
    this.#xyzw[0] = rgba[0];
    this.#xyzw[1] = rgba[1];
    this.#xyzw[2] = rgba[2];
    this.#xyzw[3] = rgba[3];
    this.#computeMagnitude();
  }

  set w(w) {
    this.#xyzw[3] = w;
    this.#computeMagnitude();
  }

  set x(x) {
    this.#xyzw[0] = x;
    this.#computeMagnitude();
  }

  set xyzw(xyzw) {
    this.#xyzw[0] = xyzw[0];
    this.#xyzw[1] = xyzw[1];
    this.#xyzw[2] = xyzw[2];
    this.#xyzw[3] = xyzw[3];
    this.#computeMagnitude();
  }

  set y(y) {
    this.#xyzw[1] = y;
    this.#computeMagnitude();
  }

  set z(z) {
    this.#xyzw[2] = z;
    this.#computeMagnitude();
  }

  add(v) {
    this.#xyzw[0] += v.#xyzw[0];
    this.#xyzw[1] += v.#xyzw[1];
    this.#xyzw[2] += v.#xyzw[2];
    this.#xyzw[3] += v.#xyzw[3];
    this.#computeMagnitude();
    return this;
  }

  angleBetween(v) {
    return acos((
      this.#xyzw[0] * v.#xyzw[0] +
      this.#xyzw[1] * v.#xyzw[1] +
      this.#xyzw[2] * v.#xyzw[2] +
      this.#xyzw[3] * v.#xyzw[3]
    ) / (this.#magnitude * v.#magnitude));
  }

  clamp(min, max) {
    const m = this.#magnitude;
    if (m > max) {
      this.#xyzw[0] = this.#xyzw[0] / m * max;
      this.#xyzw[1] = this.#xyzw[1] / m * max;
      this.#xyzw[2] = this.#xyzw[2] / m * max;
      this.#xyzw[3] = this.#xyzw[3] / m * max;
      this.#computeMagnitude();
    } else if (m < min) {
      this.#xyzw[0] = this.#xyzw[0] / m * min;
      this.#xyzw[1] = this.#xyzw[1] / m * min;
      this.#xyzw[2] = this.#xyzw[2] / m * min;
      this.#xyzw[3] = this.#xyzw[3] / m * min;
      this.#computeMagnitude();
    }
    return this;
  }

  clone() {
    return new Vec4(
      this.#xyzw[0],
      this.#xyzw[1],
      this.#xyzw[2],
      this.#xyzw[3]
    );
  }

  copy(v) {
    this.#xyzw[0] = v.#xyzw[0];
    this.#xyzw[1] = v.#xyzw[1];
    this.#xyzw[2] = v.#xyzw[2];
    this.#xyzw[3] = v.#xyzw[3];
    this.#computeMagnitude();
    return this;
  }

  distance(v) {
    return sqrt(
      (this.#xyzw[0] - v.#xyzw[0]) ** 2 +
      (this.#xyzw[1] - v.#xyzw[1]) ** 2 +
      (this.#xyzw[2] - v.#xyzw[2]) ** 2 +
      (this.#xyzw[3] - v.#xyzw[3]) ** 2
    );
  }

  distanceSq(v) {
    return (
      (this.#xyzw[0] - v.#xyzw[0]) ** 2 +
      (this.#xyzw[1] - v.#xyzw[1]) ** 2 +
      (this.#xyzw[2] - v.#xyzw[2]) ** 2 +
      (this.#xyzw[3] - v.#xyzw[3]) ** 2
    );
  }

  dot(v) {
    return (
      this.#xyzw[0] * v.#xyzw[0] +
      this.#xyzw[1] * v.#xyzw[1] +
      this.#xyzw[2] * v.#xyzw[2] +
      this.#xyzw[3] * v.#xyzw[3]
    );
  }

  isInfinite() {
    const x = this.#xyzw[0];
    const y = this.#xyzw[1];
    const z = this.#xyzw[2];
    const w = this.#xyzw[3];
    return (
      x === +Infinity ||
      x === -Infinity ||
      y === +Infinity ||
      y === -Infinity ||
      z === +Infinity ||
      z === -Infinity ||
      w === +Infinity ||
      w === -Infinity
    );
  }

  isNaN() {
    return (
      isNaN(this.#xyzw[0]) ||
      isNaN(this.#xyzw[1]) ||
      isNaN(this.#xyzw[2]) ||
      isNaN(this.#xyzw[3])
    );
  }

  isZero() {
    return (
      this.#xyzw[0] === 0 &&
      this.#xyzw[1] === 0 &&
      this.#xyzw[2] === 0 &&
      this.#xyzw[3] === 0
    );
  }

  limitMax(max) {
    const m = this.#magnitude;
    if (m > max) {
      this.#xyzw[0] = this.#xyzw[0] / m * max;
      this.#xyzw[1] = this.#xyzw[1] / m * max;
      this.#xyzw[2] = this.#xyzw[2] / m * max;
      this.#xyzw[3] = this.#xyzw[3] / m * max;
      this.#computeMagnitude();
    }
    return this;
  }

  limitMin(min) {
    const m = this.#magnitude;
    if (m < min) {
      this.#xyzw[0] = this.#xyzw[0] / m * min;
      this.#xyzw[1] = this.#xyzw[1] / m * min;
      this.#xyzw[2] = this.#xyzw[2] / m * min;
      this.#xyzw[3] = this.#xyzw[3] / m * min;
      this.#computeMagnitude();
    }
    return this;
  }

  lookAt(v) {
    const m = this.#magnitude;
    const vM = v.#magnitude;
    this.#xyzw[0] = v.#xyzw[0] / vM * m;
    this.#xyzw[1] = v.#xyzw[1] / vM * m;
    this.#xyzw[2] = v.#xyzw[2] / vM * m;
    this.#xyzw[3] = v.#xyzw[3] / vM * m;
    this.#computeMagnitude();
    return this;
  }

  negate() {
    this.#xyzw[0] *= -1;
    this.#xyzw[1] *= -1;
    this.#xyzw[2] *= -1;
    this.#xyzw[3] *= -1;
    this.#computeMagnitude();
    return this;
  }

  normalize() {
    const m = this.#magnitude;
    this.#xyzw[0] /= m;
    this.#xyzw[1] /= m;
    this.#xyzw[2] /= m;
    this.#xyzw[3] /= m;
    this.#computeMagnitude();
    return this;
  }

  project(v) {
    const m = this.#magnitude;
    const vM = v.#magnitude;
    const vX = v.#xyzw[0];
    const vY = v.#xyzw[1];
    const vZ = v.#xyzw[2];
    const vW = v.#xyzw[3];
    const f = m * cos(acos((
      this.#xyzw[0] * vX +
      this.#xyzw[1] * vY +
      this.#xyzw[2] * vZ +
      this.#xyzw[3] * vW
    ) / (m * vM)));
    this.#xyzw[0] = vX / vM * f;
    this.#xyzw[1] = vY / vM * f;
    this.#xyzw[2] = vZ / vM * f;
    this.#xyzw[3] = vW / vM * f;
    this.#computeMagnitude();
    return this;
  }

  random() {
    let x1;
    let x2;
    let x3;
    let x4;
    do {
      x1 = random() * 2 - 1;
      x2 = random() * 2 - 1;
      x3 = random() * 2 - 1;
      x4 = random() * 2 - 1;
    } while (x1 ** 2 + x2 ** 2 >= 1 || x3 ** 2 + x4 ** 2 >= 1);
    const f = sqrt((1 - x1 ** 2 - x2 ** 2) / (x3 ** 2 + x4 ** 2));
    const m = this.#magnitude;
    this.#xyzw[0] = m * x1;
    this.#xyzw[1] = m * x2;
    this.#xyzw[2] = m * x3 * f;
    this.#xyzw[3] = m * x4 * f;
    this.#computeMagnitude();
    return this;
  }

  satisfyEquality(v) {
    return (
      this.#xyzw[0] === v.#xyzw[0] &&
      this.#xyzw[1] === v.#xyzw[1] &&
      this.#xyzw[2] === v.#xyzw[2] &&
      this.#xyzw[3] === v.#xyzw[3]
    );
  }

  satisfyOpposition(v) {
    return (
      this.#xyzw[0] === -v.#xyzw[0] &&
      this.#xyzw[1] === -v.#xyzw[1] &&
      this.#xyzw[2] === -v.#xyzw[2] &&
      this.#xyzw[3] === -v.#xyzw[3]
    );
  }

  scale(c) {
    this.#xyzw[0] *= c;
    this.#xyzw[1] *= c;
    this.#xyzw[2] *= c;
    this.#xyzw[3] *= c;
    this.#computeMagnitude();
    return this;
  }

  subtract(v) {
    this.#xyzw[0] -= v.#xyzw[0];
    this.#xyzw[1] -= v.#xyzw[1];
    this.#xyzw[2] -= v.#xyzw[2];
    this.#xyzw[3] -= v.#xyzw[3];
    this.#computeMagnitude();
    return this;
  }

  zero() {
    this.#xyzw[0] = 0;
    this.#xyzw[1] = 0;
    this.#xyzw[2] = 0;
    this.#xyzw[3] = 0;
    this.#computeMagnitude();
    return this;
  }

  *[Symbol.iterator]() {
    yield this.#xyzw[0];
    yield this.#xyzw[1];
    yield this.#xyzw[2];
    yield this.#xyzw[3];
  }
}

export { Vec2, Vec3, Vec4 };
