interface CalculatorInterface {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
    modulus(a: number, b: number): number;
    power(a: number, b: number): number;
}

class Calculator implements CalculatorInterface {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number {
        return a / b;
    }

    modulus(a: number, b: number): number {
        return a % b;
    }

    power(a: number, b: number): number {
        return Math.pow(a, b);
    }
}

export default Calculator;
