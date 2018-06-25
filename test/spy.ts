export class Spy {
    // method for type-checking spy
    _isSpy(): boolean { return true; }

    protected createSpy(fakeBehavior: Function = null): jasmine.Spy {
        const spy = jasmine.createSpy();
        if (fakeBehavior) { spy.and.callFake(fakeBehavior); }
        return spy;
    }
}
