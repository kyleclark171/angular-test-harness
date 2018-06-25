export const expectPromise = function(promise: Promise<any> ): AsyncAssertor {
    return new AsyncAssertor(promise);
};

class AsyncAssertor {
    constructor(private promise) { }

    async toThrow(expectedError: string): Promise<void> {
        let error: string;
        try {
            await this.promise;
        } catch (e) {
            error = e;
        }
        expect(error).toBe(expectedError, 'Expected error: ' + expectedError + '\n\nBut got: ' + error);
    }

    async notToThrow(): Promise<void> {
        let error: string;
        try {
            await this.promise;
        } catch (e) {
            error = e;
        }

        expect(error).not.toBeDefined('Expected no errors, but exception was thrown: ' + error);
    }
}
