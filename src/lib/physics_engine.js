class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        const magn = this.magnitude();
        if (magn > 0) {
            this.x = this.x / magn;
            this.y = this.y / magn;
        }
    }

    static add(vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }
    static sub(vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }
    static mul(vector1, vector2) {
        return new Vector(vector1.x * vector2.x, vector1.y * vector2.y);
    }
    static scalar_mul(vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    }

}


export class Ball {
    constructor(cx, cy, r) {
        this.radius = r;
        this.coords = new Vector(cx, cy);
        this.last_coords = new Vector(cx, cy);
        this.acceleration = new Vector(0.0, 3699.792541346783*9.81);  // Conversion de mètre vers pixel pour 9.81
        this.mass = (4.0/3.0)*Math.PI*Math.pow(this.radius*0.00027028542514872584, 3) * 1000;  // volume * masse volumique et le rayon en pixel est converti en metre
        this.drag = false;
    }   

    update_coords(dt) {
        if (!this.drag) {
        const temp = Vector.sub(this.coords, this.last_coords);
        this.last_coords = this.coords;
        this.coords = Vector.add(Vector.add(this.coords, temp), Vector.scalar_mul(this.acceleration, dt * dt));  // this.coords + temp + this.acceleration * dt * dt
        };
    }
    apply_constraints(canvasWidth, canvasHeigth) {

        // Autres contraintes ici

        // Contraintes de la taille de l'écran, prioritaires
        if (this.coords.y - this.radius < 0) {
            this.coords.y = 0 + this.radius;
        }
        else if (this.coords.y + this.radius > canvasHeigth) {
            this.coords.y = canvasHeigth - this.radius;
        }
        if (this.coords.x - this.radius < 0) {
            this.coords.x = 0 + this.radius;
        }
        else if (this.coords.x + this.radius > canvasWidth) {
            this.coords.x = canvasWidth - this.radius;
        }
    }
    static checks_collision(ball1, ball2) {
        const x_distance = ball1.coords.x - ball2.coords.x;
        const y_distance = ball1.coords.y - ball2.coords.y;
        const distance2 = x_distance * x_distance + y_distance * y_distance;
        const radius_sum2 = (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius);
    return distance2 <= radius_sum2;
}
    static responds_collision(ball1, ball2) {
        let center_to_center = Vector.sub(ball1.coords, ball2.coords);
        const dist = center_to_center.magnitude();
        const delta = (ball1.radius + ball2.radius) - dist;
        if (delta > 0) {
            center_to_center.normalize();
            ball1.coords = Vector.add(ball1.coords, Vector.scalar_mul(center_to_center, delta * (ball2.mass / (ball1.mass + ball2.mass))));
            ball2.coords = Vector.sub(ball2.coords, Vector.scalar_mul(center_to_center, delta * (ball1.mass / (ball1.mass + ball2.mass))));
        }
    }
}

