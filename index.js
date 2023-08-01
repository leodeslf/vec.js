const { PI, sin, cos, acos, atan2, sqrt, random, abs } = Math;

class Vec2 {
  #x;
  #y;

  constructor(x = 0, y = 0) {
    this.#x = x;
    this.#y = y;
  }

  static add(v, w) {
    return new Vec2(
      v.#x + w.#x,
      v.#y + w.#y
    );
  }

  static angleBetween(v, w) {
    return atan2(
      v.#x * w.#y - v.#y * w.#x,
      v.#x * w.#x + v.#y * w.#y
    );
  }

  static distance(v, w) {
    return sqrt(
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2
    );
  }

  static distanceChebyshev(v, w) {
    const absX = abs(v.#x - w.#x);
    const absY = abs(v.#y - w.#y);
    return absX >= absY ?
      absX :
      absY;
  }

  static distanceManhattan(v, w) {
    return (
      abs(v.#x - w.#x) +
      abs(v.#y - w.#y)
    );
  }

  static distanceMinkowski(v, w, p) {
    return (
      abs(v.#x - w.#x) ** p +
      abs(v.#y - w.#y) ** p
    ) ** (1 / p);
  }

  static distanceSq(v, w) {
    return (
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2
    );
  }

  static dot(v, w) {
    return (
      v.#x * w.#x +
      v.#y * w.#y
    );
  }

  static fromPolarCoords(r, theta) {
    return new Vec2(
      r * cos(theta),
      r * sin(theta)
    );
  }

  static isInfinite(v) {
    return (
      v.#x === Infinity || v.#x === -Infinity ||
      v.#y === Infinity || v.#y === -Infinity
    );
  }

  static isNaN(v) {
    return (
      isNaN(v.#x) ||
      isNaN(v.#y)
    );
  }

  static isZero(v) {
    return (
      v.#x === 0 &&
      v.#y === 0
    );
  }

  static lerp(v, w, t) {
    if (t > 1) t = 1;
    else if (t < 0) t = 0;
    return new Vec2(
      v.#x + (w.#x - v.#x) * t,
      v.#y + (w.#y - v.#y) * t
    );
  }

  static negate(v) {
    return new Vec2(
      -v.#x,
      -v.#y
    );
  }

  static normalize(v) {
    const m = v.magnitude;
    return new Vec2(
      v.#x / m,
      v.#y / m
    );
  }

  static project(v, w) {
    const m2 = w.magnitude;
    const f = v.magnitude * cos(atan2(
      v.#x * w.#y - v.#y * w.#x,
      v.#x * w.#x + v.#y * w.#y
    ));
    return new Vec2(
      w.#x / m2 * f,
      w.#y / m2 * f
    );
  }

  static random() {
    const phi = random() * PI * 2;
    return new Vec2(
      cos(phi),
      sin(phi)
    );
  }

  static satisfyEquality(v, w) {
    return (
      v.#x === w.#x &&
      v.#y === w.#y
    );
  }

  static satisfyOpposition(v, w) {
    return (
      v.#x === -w.#x &&
      v.#y === -w.#y
    );
  }

  static scale(v, c) {
    return new Vec2(
      v.#x * c,
      v.#y * c
    );
  }

  static subtract(v, w) {
    return new Vec2(
      v.#x - w.#x,
      v.#y - w.#y
    );
  }

  get angleX() {
    return atan2(
      this.#y,
      this.#x
    ) + (this.#y < 0 ? 2 * PI : 0);
  }

  get angleY() {
    return -atan2(
      this.#x,
      this.#y
    ) + (this.#x > 0 ? 2 * PI : 0);
  }

  get magnitude() {
    return sqrt(
      this.#x ** 2 +
      this.#y ** 2
    );
  }

  get magnitudeSq() {
    return (
      this.#x ** 2 +
      this.#y ** 2
    );
  }

  get x() {
    return this.#x;
  }

  get xy() {
    return [
      this.#x,
      this.#y
    ];
  }

  get y() {
    return this.#y;
  }

  set angleX(phi) {
    const m = this.magnitude;
    this.#x = m * cos(phi);
    this.#y = m * sin(phi);
  }

  set angleY(phi) {
    const m = this.magnitude;
    this.#x = m * -sin(phi);
    this.#y = m * cos(phi);
  }

  set magnitude(m) {
    const M = this.magnitude;
    this.#x = this.#x / M * m;
    this.#y = this.#y / M * m;
  }

  set x(x) {
    this.#x = x;
  }

  set xy(xy) {
    this.x = xy[0];
    this.y = xy[1];
  }

  set y(y) {
    this.#y = y;
  }

  add(v) {
    this.#x += v.#x;
    this.#y += v.#y;
    return this;
  }

  angleBetween(v) {
    return atan2(
      this.#x * v.#y - this.#y * v.#x,
      this.#x * v.#x + this.#y * v.#y
    );
  }

  clamp(min, max) {
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
    } else if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
    }
    return this;
  }

  clone() {
    return new Vec2(
      this.#x,
      this.#y
    );
  }

  copy(v) {
    this.#x = v.#x;
    this.#y = v.#y;
    return this;
  }

  distance(v) {
    return sqrt(
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2
    );
  }

  distanceSq(v) {
    return (
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2
    );
  }

  dot(v) {
    return (
      this.#x * v.#x +
      this.#y * v.#y
    );
  }

  isInfinite() {
    return (
      this.#x === Infinity || this.#x === -Infinity ||
      this.#y === Infinity || this.#y === -Infinity
    );
  }

  isNaN() {
    return (
      isNaN(this.#x) ||
      isNaN(this.#y)
    );
  }

  isZero() {
    return (
      this.#x === 0 &&
      this.#y === 0
    );
  }

  limitMax(max) {
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
    }
    return this;
  }

  limitMin(min) {
    const m = this.magnitude;
    if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
    }
    return this;
  }

  lookAt(v) {
    const m = this.magnitude;
    const mV = v.magnitude;
    this.#x = v.#x / mV * m;
    this.#y = v.#y / mV * m;
    return this;
  }

  negate() {
    this.#x *= -1;
    this.#y *= -1;
    return this;
  }

  normalize() {
    const m = this.magnitude;
    this.#x /= m;
    this.#y /= m;
    return this;
  }

  project(v) {
    const mV = v.magnitude;
    const f = this.magnitude * cos(atan2(
      this.#x * v.#y - this.#y * v.#x,
      this.#x * v.#x + this.#y * v.#y
    ));
    this.#x = v.#x / mV * f;
    this.#y = v.#y / mV * f;
    return this;
  }

  random() {
    const phi = random() * PI * 2;
    const m = this.magnitude;
    this.#x = m * cos(phi);
    this.#y = m * sin(phi);
    return this;
  }

  rotateZ(phi) {
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const x = this.#x;
    this.#x = this.#x * cosPhi - this.#y * sinPhi;
    this.#y = x * sinPhi + this.#y * cosPhi;
    return this;
  }

  satisfyEquality(v) {
    return (
      this.#x === v.#x &&
      this.#y === v.#y
    );
  }

  satisfyOpposition(v) {
    return (
      this.#x === -v.#x &&
      this.#y === -v.#y
    );
  }

  scale(c) {
    this.#x *= c;
    this.#y *= c;
    return this;
  }

  subtract(v) {
    this.#x -= v.#x;
    this.#y -= v.#y;
    return this;
  }

  turnLeft() {
    const x = this.#x;
    this.#x = -this.#y;
    this.#y = x;
    return this;
  }

  turnRight() {
    const x = this.#x;
    this.#x = this.#y;
    this.#y = -x;
    return this;
  }

  zero() {
    this.#x = 0;
    this.#y = 0;
    return this;
  }

  *[Symbol.iterator]() {
    yield this.#x;
    yield this.#y;
  }
}

class Vec3 {
  #x;
  #y;
  #z;

  constructor(x = 0, y = 0, z = 0) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
  }

  static add(v, w) {
    return new Vec3(
      v.#x + w.#x,
      v.#y + w.#y,
      v.#z + w.#z
    );
  }

  static angleBetween(v, w) {
    return acos((
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z
    ) / (v.magnitude * w.magnitude));
  }

  static cross(v, w) {
    return new Vec3(
      v.#y * w.#z - v.#z * w.#y,
      v.#z * w.#x - v.#x * w.#z,
      v.#x * w.#y - v.#y * w.#x
    );
  }

  static distance(v, w) {
    return sqrt(
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2 +
      (v.#z - w.#z) ** 2
    );
  }

  static distanceChebyshev(v, w) {
    const absX = abs(v.#x - w.#x);
    const absY = abs(v.#y - w.#y);
    const absZ = abs(v.#z - w.#z);
    return absX >= absY && absX >= absZ ?
      absX :
      absY >= absZ ?
        absY :
        absZ;
  }

  static distanceManhattan(v, w) {
    return (
      abs(v.#x - w.#x) +
      abs(v.#y - w.#y) +
      abs(v.#z - w.#z)
    );
  }

  static distanceMinkowski(v, w, p) {
    return (
      abs(v.#x - w.#x) ** p +
      abs(v.#y - w.#y) ** p +
      abs(v.#z - w.#z) ** p
    ) ** (1 / p);
  }

  static distanceSq(v, w) {
    return (
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2 +
      (v.#z - w.#z) ** 2
    );
  }

  static dot(v, w) {
    return (
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z
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

  static isInfinite(v) {
    return (
      v.#x === Infinity || v.#x === -Infinity ||
      v.#y === Infinity || v.#y === -Infinity ||
      v.#z === Infinity || v.#z === -Infinity
    );
  }

  static isNaN(v) {
    return (
      isNaN(v.#x) ||
      isNaN(v.#y) ||
      isNaN(v.#z)
    );
  }

  static isZero(v) {
    return (
      v.#x === 0 &&
      v.#y === 0 &&
      v.#z === 0
    );
  }

  static lerp(v, w, t) {
    if (t > 1) t = 1;
    else if (t < 0) t = 0;
    return new Vec3(
      v.#x + (w.#x - v.#x) * t,
      v.#y + (w.#y - v.#y) * t,
      v.#z + (w.#z - v.#z) * t
    );
  }

  static negate(v) {
    return new Vec3(
      -v.#x,
      -v.#y,
      -v.#z
    );
  }

  static normalize(v) {
    const m = v.magnitude;
    return new Vec3(
      v.#x / m,
      v.#y / m,
      v.#z / m
    );
  }

  static project(v, w) {
    const m1 = v.magnitude;
    const m2 = w.magnitude;
    const f = m1 * cos(acos((
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z
    ) / (m1 * m2)));
    return new Vec3(
      w.#x / m2 * f,
      w.#y / m2 * f,
      w.#z / m2 * f
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
      v.#x === w.#x &&
      v.#y === w.#y &&
      v.#z === w.#z
    );
  }

  static satisfyOpposition(v, w) {
    return (
      v.#x === -w.#x &&
      v.#y === -w.#y &&
      v.#z === -w.#z
    );
  }

  static scale(v, c) {
    return new Vec3(
      v.#x * c,
      v.#y * c,
      v.#z * c
    );
  }

  static subtract(v, w) {
    return new Vec3(
      v.#x - w.#x,
      v.#y - w.#y,
      v.#z - w.#z
    );
  }

  get angleX() {
    return atan2(
      sqrt(
        this.#y ** 2 +
        this.#z ** 2
      ),
      this.#x
    );
  }

  get angleY() {
    return atan2(
      sqrt(
        this.#z ** 2 +
        this.#x ** 2
      ),
      this.#y
    );
  }

  get angleZ() {
    return atan2(
      sqrt(
        this.#x ** 2 +
        this.#y ** 2
      ),
      this.#z
    );
  }

  get b() {
    return this.#z;
  }

  get g() {
    return this.#y;
  }

  get magnitude() {
    return sqrt(
      this.#x ** 2 +
      this.#y ** 2 +
      this.#z ** 2
    );
  }

  get magnitudeSq() {
    return (
      this.#x ** 2 +
      this.#y ** 2 +
      this.#z ** 2
    );
  }

  get r() {
    return this.#x;
  }

  get rgb() {
    return [
      this.#x,
      this.#y,
      this.#z
    ];
  }

  get x() {
    return this.#x;
  }

  get xyz() {
    return [
      this.#x,
      this.#y,
      this.#z
    ];
  }

  get y() {
    return this.#y;
  }

  get z() {
    return this.#z;
  }

  set b(b) {
    this.#z = b;
  }

  set g(g) {
    this.#y = g;
  }

  set magnitude(m) {
    const M = this.magnitude;
    this.#x = this.#x / M * m;
    this.#y = this.#y / M * m;
    this.#z = this.#z / M * m;
  }

  set r(r) {
    this.#x = r;
  }

  set rgb(rgb) {
    this.x = rgb[0];
    this.y = rgb[1];
    this.z = rgb[2];
  }

  set x(x) {
    this.#x = x;
  }

  set xyz(xyz) {
    this.x = xyz[0];
    this.y = xyz[1];
    this.z = xyz[2];
  }

  set y(y) {
    this.#y = y;
  }

  set z(z) {
    this.#z = z;
  }

  add(v) {
    this.#x += v.#x;
    this.#y += v.#y;
    this.#z += v.#z;
    return this;
  }

  angleBetween(v) {
    return acos((
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z
    ) / (this.magnitude * v.magnitude));
  }

  clamp(min, max) {
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
      this.#z = this.#z / m * max;
    } else if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
      this.#z = this.#z / m * min;
    }
    return this;
  }

  clone() {
    return new Vec3(
      this.#x,
      this.#y,
      this.#z
    );
  }

  copy(v) {
    this.#x = v.#x;
    this.#y = v.#y;
    this.#z = v.#z;
    return this;
  }

  cross(v) {
    const x = this.#x;
    const y = this.#y;
    this.#x = this.#y * v.#z - this.#z * v.#y;
    this.#y = this.#z * v.#x - x * v.#z;
    this.#z = x * v.#y - y * v.#x;
    return this;
  }

  distance(v) {
    return sqrt(
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2 +
      (this.#z - v.#z) ** 2
    );
  }

  distanceSq(v) {
    return (
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2 +
      (this.#z - v.#z) ** 2
    );
  }

  dot(v) {
    return (
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z
    );
  }

  isInfinite() {
    return (
      this.#x === Infinity || this.#x === -Infinity ||
      this.#y === Infinity || this.#y === -Infinity ||
      this.#z === Infinity || this.#z === -Infinity
    );
  }

  isNaN() {
    return (
      isNaN(this.#x) ||
      isNaN(this.#y) ||
      isNaN(this.#z)
    );
  }

  isZero() {
    return (
      this.#x === 0 &&
      this.#y === 0 &&
      this.#z === 0
    );
  }

  limitMax(max) {
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
      this.#z = this.#z / m * max;
    }
    return this;
  }

  limitMin(min) {
    const m = this.magnitude;
    if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
      this.#z = this.#z / m * min;
    }
    return this;
  }

  lookAt(v) {
    const m = this.magnitude;
    const mV = v.magnitude;
    this.#x = v.#x / mV * m;
    this.#y = v.#y / mV * m;
    this.#z = v.#z / mV * m;
    return this;
  }

  negate() {
    this.#x *= -1;
    this.#y *= -1;
    this.#z *= -1;
    return this;
  }

  normalize() {
    const m = this.magnitude;
    this.#x /= m;
    this.#y /= m;
    this.#z /= m;
    return this;
  }

  project(v) {
    const m = this.magnitude;
    const mV = v.magnitude;
    const f = m * cos(acos((
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z
    ) / (m * mV)));
    this.#x = v.#x / mV * f;
    this.#y = v.#y / mV * f;
    this.#z = v.#z / mV * f;
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
    const m = this.magnitude;
    this.#x = m * 2 * x1 * f;
    this.#y = m * 2 * x2 * f;
    this.#z = m * (1 - 2 * (x1 ** 2 + x2 ** 2));
    return this;
  }

  rotateX(phi) {
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const y = this.#y;
    this.#y = this.#y * cosPhi - this.#z * sinPhi;
    this.#z = y * sinPhi + this.#z * cosPhi;
    return this;
  }

  rotateY(phi) {
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const x = this.#x;
    this.#x = this.#x * cosPhi + this.#z * sinPhi;
    this.#z = x * sinPhi + this.#z * cosPhi;
    return this;
  }

  rotateZ(phi) {
    const cosPhi = cos(phi);
    const sinPhi = sin(phi);
    const x = this.#x;
    this.#x = this.#x * cosPhi - this.#y * sinPhi;
    this.#y = x * sinPhi + this.#y * cosPhi;
    return this;
  }

  satisfyEquality(v) {
    return (
      this.#x === v.#x &&
      this.#y === v.#y &&
      this.#z === v.#z
    );
  }

  satisfyOpposition(v) {
    return (
      this.#x === -v.#x &&
      this.#y === -v.#y &&
      this.#z === -v.#z
    );
  }

  scale(c) {
    this.#x *= c;
    this.#y *= c;
    this.#z *= c;
    return this;
  }

  subtract(v) {
    this.#x -= v.#x;
    this.#y -= v.#y;
    this.#z -= v.#z;
    return this;
  }

  zero() {
    this.#x = 0;
    this.#y = 0;
    this.#z = 0;
    return this;
  }

  *[Symbol.iterator]() {
    yield this.#x;
    yield this.#y;
    yield this.#z;
  }
}

class Vec4 {
  #x;
  #y;
  #z;
  #w;

  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
    this.#w = w;
  }

  static add(v, w) {
    return new Vec4(
      v.#x + w.#x,
      v.#y + w.#y,
      v.#z + w.#z,
      v.#w + w.#w
    );
  }

  static angleBetween(v, w) {
    return acos((
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z +
      v.#w * w.#w
    ) / (v.magnitude * w.magnitude));
  }

  static distance(v, w) {
    return sqrt(
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2 +
      (v.#z - w.#z) ** 2 +
      (v.#w - w.#w) ** 2
    );
  }

  static distanceChebyshev(v, w) {
    const absX = abs(v.#x - w.#x);
    const absY = abs(v.#y - w.#y);
    const absZ = abs(v.#z - w.#z);
    const absW = abs(v.#w - w.#w);
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
      abs(v.#x - w.#x) +
      abs(v.#y - w.#y) +
      abs(v.#z - w.#z) +
      abs(v.#w - w.#w)
    );
  }

  static distanceMinkowski(v, w, p) {
    return (
      abs(v.#x - w.#x) ** p +
      abs(v.#y - w.#y) ** p +
      abs(v.#z - w.#z) ** p +
      abs(v.#w - w.#w) ** p
    ) ** (1 / p);
  }

  static distanceSq(v, w) {
    return (
      (v.#x - w.#x) ** 2 +
      (v.#y - w.#y) ** 2 +
      (v.#z - w.#z) ** 2 +
      (v.#w - w.#w) ** 2
    );
  }

  static dot(v, w) {
    return (
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z +
      v.#w * w.#w
    );
  }

  static isInfinite(v) {
    return (
      v.#x === Infinity || v.#x === -Infinity ||
      v.#y === Infinity || v.#y === -Infinity ||
      v.#z === Infinity || v.#z === -Infinity ||
      v.#w === Infinity || v.#w === -Infinity
    );
  }

  static isNaN(v) {
    return (
      isNaN(v.#x) ||
      isNaN(v.#y) ||
      isNaN(v.#z) ||
      isNaN(v.#w)
    );
  }

  static isZero(v) {
    return (
      v.#x === 0 &&
      v.#y === 0 &&
      v.#z === 0 &&
      v.#w === 0
    );
  }

  static lerp(v, w, t) {
    if (t > 1) t = 1;
    else if (t < 0) t = 0;
    return new Vec4(
      v.#x + (w.#x - v.#x) * t,
      v.#y + (w.#y - v.#y) * t,
      v.#z + (w.#z - v.#z) * t,
      v.#w + (w.#w - v.#w) * t
    );
  }

  static negate(v) {
    return new Vec4(
      -v.#x,
      -v.#y,
      -v.#z,
      -v.#w
    );
  }

  static normalize(v) {
    const m = v.magnitude;
    return new Vec4(
      v.#x / m,
      v.#y / m,
      v.#z / m,
      v.#w / m
    );
  }

  static project(v, w) {
    const m1 = v.magnitude;
    const m2 = w.magnitude;
    const f = m1 * cos(acos((
      v.#x * w.#x +
      v.#y * w.#y +
      v.#z * w.#z +
      v.#w * w.#w
    ) / (m1 * m2)));
    return new Vec4(
      w.#x / m2 * f,
      w.#y / m2 * f,
      w.#z / m2 * f,
      w.#w / m2 * f
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
      v.#x === w.#x &&
      v.#y === w.#y &&
      v.#z === w.#z &&
      v.#w === w.#w
    );
  }

  static satisfyOpposition(v, w) {
    return (
      v.#x === -w.#x &&
      v.#y === -w.#y &&
      v.#z === -w.#z &&
      v.#w === -w.#w
    );
  }

  static scale(v, c) {
    return new Vec4(
      v.#x * c,
      v.#y * c,
      v.#z * c,
      v.#w * c
    );
  }

  static subtract(v, w) {
    return new Vec4(
      v.#x - w.#x,
      v.#y - w.#y,
      v.#z - w.#z,
      v.#w - w.#w
    );
  }

  get a() {
    return this.#w;
  }

  get angleW() {
    return atan2(
      sqrt(
        this.#x ** 2 +
        this.#y ** 2 +
        this.#z ** 2
      ),
      this.#w
    );
  }

  get angleX() {
    return atan2(
      sqrt(
        this.#y ** 2 +
        this.#z ** 2 +
        this.#w ** 2
      ),
      this.#x
    );
  }

  get angleY() {
    return atan2(
      sqrt(
        this.#z ** 2 +
        this.#w ** 2 +
        this.#x ** 2
      ),
      this.#y
    );
  }

  get angleZ() {
    return atan2(
      sqrt(
        this.#w ** 2 +
        this.#x ** 2 +
        this.#y ** 2
      ),
      this.#z
    );
  }

  get b() {
    return this.#z;
  }

  get g() {
    return this.#y;
  }

  get magnitude() {
    return sqrt(
      this.#x ** 2 +
      this.#y ** 2 +
      this.#z ** 2 +
      this.#w ** 2
    );
  }

  get magnitudeSq() {
    return (
      this.#x ** 2 +
      this.#y ** 2 +
      this.#z ** 2 +
      this.#w ** 2
    );
  }

  get r() {
    return this.#x;
  }

  get rgba() {
    return [
      this.#x,
      this.#y,
      this.#z,
      this.#w
    ];
  }

  get w() {
    return this.#w;
  }

  get x() {
    return this.#x;
  }

  get xyzw() {
    return [
      this.#x,
      this.#y,
      this.#z,
      this.#w
    ];
  }

  get y() {
    return this.#y;
  }

  get z() {
    return this.#z;
  }

  set a(a) {
    this.#w = a;
  }

  set b(b) {
    this.#z = b;
  }

  set g(g) {
    this.#y = g;
  }

  set magnitude(m) {
    const M = this.magnitude;
    this.#x = this.#x / M * m;
    this.#y = this.#y / M * m;
    this.#z = this.#z / M * m;
    this.#w = this.#w / M * m;
  }

  set r(r) {
    this.#x = r;
  }

  set rgba(rgba) {
    this.x = rgba[0];
    this.y = rgba[1];
    this.z = rgba[2];
    this.w = rgba[3];
  }

  set w(w) {
    this.#w = w;
  }

  set x(x) {
    this.#x = x;
  }

  set xyzw(xyzw) {
    this.x = xyzw[0];
    this.y = xyzw[1];
    this.z = xyzw[2];
    this.w = xyzw[3];
  }

  set y(y) {
    this.#y = y;
  }

  set z(z) {
    this.#z = z;
  }

  add(v) {
    this.#x += v.#x;
    this.#y += v.#y;
    this.#z += v.#z;
    this.#w += v.#w;
    return this;
  }

  angleBetween(v) {
    return acos((
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z +
      this.#w * v.#w
    ) / (this.magnitude * v.magnitude));
  }

  clamp(min, max) {
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
      this.#z = this.#z / m * max;
      this.#w = this.#w / m * max;
    } else if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
      this.#z = this.#z / m * min;
      this.#w = this.#w / m * min;
    }
    return this;
  }

  clone() {
    return new Vec4(
      this.#x,
      this.#y,
      this.#z,
      this.#w
    );
  }

  copy(v) {
    this.#x = v.#x;
    this.#y = v.#y;
    this.#z = v.#z;
    this.#w = v.#w;
    return this;
  }

  distance(v) {
    return sqrt(
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2 +
      (this.#z - v.#z) ** 2 +
      (this.#w - v.#w) ** 2
    );
  }

  distanceSq(v) {
    return (
      (this.#x - v.#x) ** 2 +
      (this.#y - v.#y) ** 2 +
      (this.#z - v.#z) ** 2 +
      (this.#w - v.#w) ** 2
    );
  }

  dot(v) {
    return (
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z +
      this.#w * v.#w
    );
  }

  isInfinite() {
    return (
      this.#x === Infinity || this.#x === -Infinity ||
      this.#y === Infinity || this.#y === -Infinity ||
      this.#z === Infinity || this.#z === -Infinity ||
      this.#w === Infinity || this.#w === -Infinity
    );
  }

  isNaN() {
    return (
      isNaN(this.#x) ||
      isNaN(this.#y) ||
      isNaN(this.#z) ||
      isNaN(this.#w)
    );
  }

  isZero() {
    return (
      this.#x === 0 &&
      this.#y === 0 &&
      this.#z === 0 &&
      this.#w === 0
    );
  }

  limitMax(max) {
    const m = this.magnitude;
    if (m > max) {
      this.#x = this.#x / m * max;
      this.#y = this.#y / m * max;
      this.#z = this.#z / m * max;
      this.#w = this.#w / m * max;
    }
    return this;
  }

  limitMin(min) {
    const m = this.magnitude;
    if (m < min) {
      this.#x = this.#x / m * min;
      this.#y = this.#y / m * min;
      this.#z = this.#z / m * min;
      this.#w = this.#w / m * min;
    }
    return this;
  }

  lookAt(v) {
    const m = this.magnitude;
    const mV = v.magnitude;
    this.#x = v.#x / mV * m;
    this.#y = v.#y / mV * m;
    this.#z = v.#z / mV * m;
    this.#w = v.#w / mV * m;
    return this;
  }

  negate() {
    this.#x *= -1;
    this.#y *= -1;
    this.#z *= -1;
    this.#w *= -1;
    return this;
  }

  normalize() {
    const m = this.magnitude;
    this.#x /= m;
    this.#y /= m;
    this.#z /= m;
    this.#w /= m;
    return this;
  }

  project(v) {
    const m = this.magnitude;
    const mV = v.magnitude;
    const f = m * cos(acos((
      this.#x * v.#x +
      this.#y * v.#y +
      this.#z * v.#z +
      this.#w * v.#w
    ) / (m * mV)));
    this.#x = v.#x / mV * f;
    this.#y = v.#y / mV * f;
    this.#z = v.#z / mV * f;
    this.#w = v.#w / mV * f;
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
    const m = this.magnitude;
    this.#x = m * x1;
    this.#y = m * x2;
    this.#z = m * x3 * f;
    this.#w = m * x4 * f;
    return this;
  }

  satisfyEquality(v) {
    return (
      this.#x === v.#x &&
      this.#y === v.#y &&
      this.#z === v.#z &&
      this.#w === v.#w
    );
  }

  satisfyOpposition(v) {
    return (
      this.#x === -v.#x &&
      this.#y === -v.#y &&
      this.#z === -v.#z &&
      this.#w === -v.#w
    );
  }

  scale(c) {
    this.#x *= c;
    this.#y *= c;
    this.#z *= c;
    this.#w *= c;
    return this;
  }

  subtract(v) {
    this.#x -= v.#x;
    this.#y -= v.#y;
    this.#z -= v.#z;
    this.#w -= v.#w;
    return this;
  }

  zero() {
    this.#x = 0;
    this.#y = 0;
    this.#z = 0;
    this.#w = 0;
    return this;
  }

  *[Symbol.iterator]() {
    yield this.#x;
    yield this.#y;
    yield this.#z;
    yield this.#w;
  }
}

export { Vec2, Vec3, Vec4 };
