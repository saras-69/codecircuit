
/**
 * A simple pedometer algorithm that uses accelerometer data
 * to detect steps. This is a basic implementation.
 */

export default class Pedometer {
    constructor(callback) {
        this.stepCount = 0;
        this.callback = callback;
        this.isRunning = false;

        // Configuration parameters
        this.threshold = 1.2;     // Acceleration threshold to register a step
        this.cooldownPeriod = 400; // Cooldown in ms to prevent counting multiple steps
        this.lastStepTime = 0;

        // Smoothing values
        this.smoothedAccel = 0;
        this.alpha = 0.8;         // Low-pass filter coefficient

        // Binding the accelerometer handler
        this.handleAcceleration = this.handleAcceleration.bind(this);
    }

    start() {
        if (this.isRunning) return;

        // Check if the Accelerometer API is available
        if (typeof DeviceMotionEvent !== 'undefined') {
            window.addEventListener('devicemotion', this.handleAcceleration);
            this.isRunning = true;
            console.log('Pedometer started');
        } else {
            console.error('Accelerometer not available');
        }
    }

    stop() {
        if (!this.isRunning) return;

        window.removeEventListener('devicemotion', this.handleAcceleration);
        this.isRunning = false;
        console.log('Pedometer stopped');
    }

    handleAcceleration(event) {
        const now = Date.now();

        // Extract acceleration data
        const accel = event.accelerationIncludingGravity;

        // Skip if no acceleration data
        if (!accel || accel.x === null) return;

        // Calculate the magnitude of acceleration
        const magnitude = Math.sqrt(
            accel.x * accel.x +
            accel.y * accel.y +
            accel.z * accel.z
        );

        // Apply low-pass filter to smooth the signal
        this.smoothedAccel = this.alpha * this.smoothedAccel + (1 - this.alpha) * magnitude;

        // Detect step when acceleration crosses the threshold
        if (magnitude - this.smoothedAccel > this.threshold) {
            // Check if enough time has passed since the last step
            if (now - this.lastStepTime > this.cooldownPeriod) {
                this.stepCount++;
                this.lastStepTime = now;

                // Notify callback about the new step
                if (this.callback) {
                    this.callback(this.stepCount);
                }
            }
        }
    }

    getStepCount() {
        return this.stepCount;
    }

    reset() {
        this.stepCount = 0;
        this.lastStepTime = 0;
        this.smoothedAccel = 0;
    }
}