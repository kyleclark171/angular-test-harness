import { Type } from '@angular/core';

export class ProviderProvider {

    static getProviders<T>(typeToProvideFor: Type<T>): any[] {
        return this.getCustomSpies()
                .concat(this.getPreBuiltMockProviders())
                .concat(this.getRealProviders())
                .filter(p => p.Provide !== typeToProvideFor)
                .concat(typeToProvideFor);
    }

    private static getCustomSpies(): any[] {
        return [
            // Custom Spies
            
            /*
            Example Spy Config:
            { provide: NavigationService, useClass: NavigationServiceSpy }
            */
        ];
    }

    private static getPreBuiltMockProviders(): any[] {
        return [
            // Enter types for prebuilt spies (such as a prebuilt mock HttpClient)
        ];
    }

    private static getRealProviders(): any[] {
        return [
            // Enter types for services that do not require a spy
        ];
    }
}
