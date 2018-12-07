/**
 * A two-dimensional vector class for JavaScript.
 */
class vec2 {
    /**
     * Creates a two-dimensional vector pointing to X and Y.
     * @param {number} x Numeric expression.
     * @param {number} y Numeric expression.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    ////////////////////
    // STATIC METHODS //
    ////////////////////

    /**
     * Returns a Vector equals to A plus B.
     * @param {vec2} a Vector.
     * @param {number | vec2} b A numeric expression or a Vector.
     */
    static add(a, b) {
        return b instanceof vec2 ?
            new vec2(a.x + b.x, a.y + b.y) :
            new vec2(a.x + b, a.y + b);
    }

    /**
     * Creates a Vector using Polar Coordinates (radius and angle).
     * @param {number} radius Numeric expression.
     * @param {number} angle Numeric expression (angle measured in radians).
     */
    static byPolarCoords(radius, angle) {
        return new vec2(
            radius * Math.cos(angle),
            radius * Math.sin(angle)
        );
    }

    /**
     * Returns the Chebyshev Distance.
     * 
     * - "Also known as the Chessboard Distance, it is somewhat similar
     * to the Manhattan distance, but with 45 degrees rotation."
     * @param {vec2} a A Vector.
     * @param {vec2} b A Vector.
     */
    static distanceChebyshev(a, b) {
        return Math.max(
            Math.abs(a.x - b.x),
            Math.abs(a.y - b.y)
        );
    }

    /**
     * Returns the Euclidian Distance of A to B.
     * @param {vec2} a A Vector.
     * @param {vec2} b A Vector.
     */
    static distanceEuclidian(a, b) {
        const S = (a.x - b.x);
        const T = (a.y - b.y);
        return Math.sqrt(S * S + T * T);
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
     * @param {vec2} a A Vector.
     * @param {vec2} b A Vector.
     */
    static distanceManhattan(a, b) {
        return Math.sqrt(
            Math.abs(a.x - b.x) +
            Math.abs(a.y - b.y)
        );
    }

    /**
     * Returns the division of A by B.
     * @param {vec2} a A Vector.
     * @param {number | vec2} b A numeric expression or a Vector.
     */
    static divide(a, b) {
        return b instanceof vec2 ?
            new vec2(a.x / b.x, a.y / b.y) :
            new vec2(a.x / b, a.y / b);
    }

    /**
     * Returns the product of A by B.
     * @param {vec2} a A Vector.
     * @param {number | vec2} b A numeric expression or a Vector
     */
    static multiply(a, b) {
        return b instanceof vec2 ?
            new vec2(a.x * b.x, a.y * b.y) :
            new vec2(a.x * b, a.y * b);
    }

    /**
     * Returns a Vector equals to A minus B.
     * @param {vec2} a A Vector.
     * @param {number | vec2} b A numeric expression or a Vector.
     */
    static subtract(a, b) {
        return b instanceof vec2 ?
            new vec2(a.x - b.x, a.y - b.y) :
            new vec2(a.x - b, a.y - b);
    }

    //////////////////////
    // INSTANCE METHODS //
    //////////////////////

    /**
     * Adds A to 'this' Vector.
     * @param {number | vec2} a A numeric expression or a Vector.
     */
    add(a) {
        if (a instanceof vec2) {
            this.x += a.x;
            this.y += a.y;
        } else {
            this.x += a;
            this.y += a;
        }
    }

    /**
     * Copy the coordinates of A to 'this' Vector.
     * @param {vec2} a A Vector.
     */
    copy(a) {
        this.x = a.x;
        this.y = a.y;
    }

    /**
     * Divides 'this' Vector by A.
     * @param {number | vec2} a A numeric expression or a Vector.
     */
    divide(a) {
        if (a instanceof vec2) {
            this.x /= a.x;
            this.y /= a.y;
        } else {
            this.x /= a;
            this.y /= a;
        }
    }

    /**
     * Returns the angle of 'this' Vector (in radians).
     * Values between PI and -PI.
     */
    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Returns the magnitude (size) of 'this' Vector (Pythagorean theorem).
     */
    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
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
     * @param {number | vec2} a A numeric expression or a Vector.
     */
    multiply(a) {
        if (a instanceof vec2) {
            this.x *= a.x;
            this.y *= a.y;
        } else {
            this.x *= a;
            this.y *= a;
        }
    }

    /**
     * Sets to 1 'this' Vector's magnitude (Unit Vector).
     */
    normalize() {
        const MA = this.getMagnitude();
        this.x /= MA;
        this.y /= MA;
    }

    /**
     * Sets to A 'this' Vector's magnitude.
     * @param {number | vec2} a A numeric expression or a Vector.
     */
    setMagnitude(a) {
        this.normalize();
        this.multiply(a);
    }

    /**
     * Subtracts A to 'this' Vector.
     * @param {number | vec2} a A numeric expression or a Vector.
     */
    subtract(a) {
        if (a instanceof vec2) {
            this.x -= a.x;
            this.y -= a.y;
        } else {
            this.x -= a;
            this.y -= a;
        }
    }
}

/**
 * A three-dimensional vector class for JavaScript.
 */
class vec3 {
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
     * @param {vec3} a Vector.
     * @param {number | vec3} b A numeric expression or a Vector.
     */
    static add(a, b) {
        return b instanceof vec3 ?
            new vec3(a.x + b.x, a.y + b.y, a.z + b.z) :
            new vec3(a.x + b, a.y + b, a.z + b);
    }

    /**
     * Returns the Chebyshev Distance.
     * 
     * - "Also known as the Chessboard Distance, it is somewhat similar
     * to the Manhattan distance, but with 45 degrees rotation."
     * @param {vec3} a A Vector.
     * @param {vec3} b A Vector.
     * @returns {number}
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
     * @param {vec3} a A Vector.
     * @param {vec3} b A Vector.
     */
    static distanceEuclidian(a, b) {
        const S = (a.x - b.x);
        const T = (a.y - b.y);
        const P = (a.z - b.z);
        return Math.sqrt(S * S + T * T + P * P);
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
     * @param {vec3} a A Vector.
     * @param {vec3} b A Vector.
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
     * @param {vec3} a A Vector.
     * @param {number | vec3} b A numeric expression or a Vector.
     */
    static divide(a, b) {
        return b instanceof vec3 ?
            new vec3(a.x / b.x, a.y / b.y, a.z / b.z) :
            new vec3(a.x / b, a.y / b, a.z / b);
    }

    /**
     * Returns the product of A by B.
     * @param {vec3} a A Vector.
     * @param {number | vec3} b A numeric expression or a Vector
     */
    static multiply(a, b) {
        return b instanceof vec3 ?
            new vec3(a.x * b.x, a.y * b.y, a.z * b.z) :
            new vec3(a.x * b, a.y * b, a.z * b);
    }

    /**
     * Returns a Vector equals to A minus B.
     * @param {vec3} a A Vector.
     * @param {number | vec3} b A numeric expression or a Vector.
     */
    static subtract(a, b) {
        return b instanceof vec3 ?
            new vec3(a.x - b.x, a.y - b.y, a.z - b.z) :
            new vec3(a.x - b, a.y - b, a.z - b);
    }

    //////////////////////
    // INSTANCE METHODS //
    //////////////////////

    /**
     * Adds A to 'this' Vector.
     * @param {number | vec3} a A numeric expression or a Vector.
     */
    add(a) {
        if (a instanceof vec3) {
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
        } else {
            this.x += a;
            this.y += a;
            this.z += a;
        }
    }

    /**
     * Copy the coordinates of A to 'this' Vector.
     * @param {vec3} a A Vector.
     */
    copy(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
    }

    /**
     * Divides 'this' Vector by A.
     * @param {number | vec3} a A numeric expression or a Vector.
     */
    divide(a) {
        if (a instanceof vec3) {
            this.x /= a.x;
            this.y /= a.y;
            this.z /= a.z;
        } else {
            this.x /= a;
            this.y /= a;
            this.z /= a;
        }
    }

    /**
     * Returns the angle of 'this' Vector (in radians).
     * Values between PI and -PI.
     */
    /* getAngle() {
        return Math.atan2(this.y, this.x);
    } */

    /**
     * Returns the magnitude (size) of 'this' Vector (Pythagorean theorem).
     */
    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
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
     * @param {number | vec3} a A numeric expression or a Vector.
     */
    multiply(a) {
        if (a instanceof vec3) {
            this.x *= a.x;
            this.y *= a.y;
            this.z *= a.z;
        } else {
            this.x *= a;
            this.y *= a;
            this.z *= a;
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
     * @param {number | vec3} a A numeric expression or a Vector.
     */
    setMagnitude(a) {
        this.normalize();
        this.multiply(a);
    }

    /**
     * Subtracts A to 'this' Vector.
     * @param {number | vec3} a A numeric expression or a Vector.
     */
    subtract(a) {
        if (a instanceof vec3) {
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
        } else {
            this.x -= a;
            this.y -= a;
            this.z -= a;
        }
    }
}

/**
 * A four-dimensional vector class for JavaScript.
 */
class vec4 {
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
     * @param {vec4} a Vector.
     * @param {number | vec4} b A numeric expression or a Vector.
     */
    static add(a, b) {
        return b instanceof vec4 ?
            new vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w) :
            new vec4(a.x + b, a.y + b, a.z + b, a.w + b);
    }

    /**
     * Returns the Chebyshev Distance.
     * 
     * - "Also known as the Chessboard Distance, it is somewhat similar
     * to the Manhattan distance, but with 45 degrees rotation."
     * @param {vec4} a A Vector.
     * @param {vec4} b A Vector.
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
     * @param {vec4} a A Vector.
     * @param {vec4} b A Vector.
     */
    static distanceEuclidian(a, b) {
        const S = (a.x - b.x);
        const T = (a.y - b.y);
        const P = (a.z - b.z);
        const Q = (a.w - b.w);
        return Math.sqrt(S * S + T * T + P * P + Q * Q);
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
     * @param {vec4} a A Vector.
     * @param {vec4} b A Vector.
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
     * @param {vec4} a A Vector.
     * @param {number | vec4} b A numeric expression or a Vector.
     */
    static divide(a, b) {
        return b instanceof vec4 ?
            new vec4(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w) :
            new vec4(a.x / b, a.y / b, a.z / b, a.w / b);
    }

    /**
     * Returns the product of A by B.
     * @param {vec4} a A Vector.
     * @param {number | vec4} b A numeric expression or a Vector
     */
    static multiply(a, b) {
        return b instanceof vec4 ?
            new vec4(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w) :
            new vec4(a.x * b, a.y * b, a.z * b, a.w * b);
    }

    /**
     * Returns a Vector equals to A minus B.
     * @param {vec4} a A Vector.
     * @param {number | vec4} b A numeric expression or a Vector.
     */
    static subtract(a, b) {
        return b instanceof vec4 ?
            new vec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w) :
            new vec4(a.x - b, a.y - b, a.z - b, a.w - b);
    }

    //////////////////////
    // INSTANCE METHODS //
    //////////////////////

    /**
     * Adds A to 'this' Vector.
     * @param {number | vec4} a A numeric expression or a Vector.
     */
    add(a) {
        if (a instanceof vec4) {
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
            this.w += a.w;
        } else {
            this.x += a;
            this.y += a;
            this.z += a;
            this.w += a;
        }
    }

    /**
     * Copy the coordinates of A to 'this' Vector.
     * @param {vec4} a A Vector.
     */
    copy(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w;
    }

    /**
     * Divides 'this' Vector by A.
     * @param {number | vec4} a A numeric expression or a Vector.
     */
    divide(a) {
        if (a instanceof vec4) {
            this.x /= a.x;
            this.y /= a.y;
            this.z /= a.z;
            this.w /= a.w;
        } else {
            this.x /= a;
            this.y /= a;
            this.z /= a;
            this.w /= a;
        }
    }

    /**
     * Returns the angle of 'this' Vector (in radians).
     * Values between PI and -PI.
     */
    /* getAngle() {
        return Math.atan2(this.y, this.x);
    } */

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
     * @param {number | vec4} a A numeric expression or a Vector.
     */
    multiply(a) {
        if (a instanceof vec4) {
            this.x *= a.x;
            this.y *= a.y;
            this.z *= a.z;
            this.w *= a.w;
        } else {
            this.x *= a;
            this.y *= a;
            this.z *= a;
            this.w *= a;

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
     * @param {number | vec4} a A numeric expression or a Vector.
     */
    setMagnitude(a) {
        this.normalize();
        this.multiply(a);
    }

    /**
     * Subtracts A to 'this' Vector.
     * @param {number | vec4} a A numeric expression or a Vector.
     */
    subtract(a) {
        if (a instanceof vec4) {
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
            this.w -= a.w;
        } else {
            this.x -= a;
            this.y -= a;
            this.z -= a;
            this.w -= a;
        }
    }
}

/**
 * NOTE:
 * 
 * Why vec2, vec3 and vec4 instead of a single Vector class?
 * (more code).
 * 
 * To avoid multiple blocks with several conditions per method.
 * (more ops-per-sec).
 */
