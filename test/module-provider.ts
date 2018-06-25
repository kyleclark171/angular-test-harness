import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material';

export class ModuleProvider {
    static getModules(): any[] {
        return [
            RouterTestingModule,
            MatTableModule
        ];
    }
}
