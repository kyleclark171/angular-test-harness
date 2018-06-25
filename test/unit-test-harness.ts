import { Type, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProviderProvider } from './provider-provider';
import { ModuleProvider } from './module-provider';

enum TestType {
    Service,
    Component
}

export class UnitTestHarness {

    setUpComponentTest<T>(targetComponentType: Type<T>): ComponentFixture<T> {
        this.configureTestingModule(targetComponentType, TestType.Component)
            .compileComponents();

        return TestBed.createComponent(targetComponentType);
    }

    setUpServiceTest<T>(targetServiceType: Type<T>): T {
        this.configureTestingModule(targetServiceType, TestType.Service);
        return TestBed.get(targetServiceType);
    }

    resolveSpy<T>(targetServiceType: Type<T>): any {
        const svc = TestBed.get(targetServiceType);
        if (svc._isSpy === undefined || !svc._isSpy()) {
            throw new Error('No spy is configured for service type: ' + targetServiceType);
        }
        return svc;
    }

    resolveService<T>(targetServiceType: Type<T>): T {
        return TestBed.get(targetServiceType);
    }

    configureTestingModule<T>(targetType: Type<T>, testType: TestType ): typeof TestBed {
        return TestBed.configureTestingModule({
            imports: ModuleProvider.getModules(),
            providers: ProviderProvider.getProviders(targetType),
            schemas: [ NO_ERRORS_SCHEMA ],
            declarations: testType === TestType.Component ? [targetType] : undefined
        });
    }
}
