import { ComponentFixture } from '@angular/core/testing';
import { Type } from '@angular/core';
import { BaseTest } from '@cot/test/base-test';

export class BaseServiceTest<T> extends BaseTest<T> {
    protected setUpTest() {
        this.target = this.harness.setUpServiceTest<T>(this.targetType);
    }
}
