import { ComponentFixture } from '@angular/core/testing';
import { Type } from '@angular/core';
import { BaseTest } from './base-test';

export class BaseComponentTest<T> extends BaseTest<T> {
  fixture: ComponentFixture<T>;

  constructor(targetType: Type<T>) { super(targetType); }

  protected setUpTest() {
    this.fixture = this.harness.setUpComponentTest<T>(this.targetType as Type<T>);
    this.target = this.fixture.componentInstance;
  }
}
