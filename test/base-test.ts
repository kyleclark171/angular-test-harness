import { UnitTestHarness } from '@cot/test/unit-test-harness';
import { Type } from '@angular/core';
import { async } from '@angular/core/testing';

export class BaseTest<T> {

    protected target: T;
    protected harness: UnitTestHarness;

    constructor(protected targetType: Type<T>) {
        this.harness = new UnitTestHarness();
    }

    run() {
        describe(this.constructor.name, () => {
            beforeEach(async(() => {
                this.setUpTest();
            }));

            it('should create target', async(() => {
                expect(this.target).toBeDefined();
            }));

            this.describeTests();
        });
    }

    // abstract
    protected setUpTest() { }

    // abstract
    protected describeTests() { }
}
