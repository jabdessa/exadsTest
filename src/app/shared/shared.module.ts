import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Shared modules
// ****************************************************************************
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengCustomModule } from './primeng';

/** Modules array definition. */
const MODULES = [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatProgressSpinnerModule,
    PrimengCustomModule
];

// Shared components, directives and services.
// ****************************************************************************

/** Components array definition. */
const COMPONENTS = [];
const DIRECTIVES = [];
const SERVICES = []

/**
 * Crosscutting shared module for the baseProjectSPA application.
 */
@NgModule({
    imports: [
        ...MODULES
    ],
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
    exports: [
        ...MODULES,
        ...COMPONENTS,
        ...DIRECTIVES,
    ]
})
export class SharedModule {

    /**
     * Module's `forRoot` static method definition.
     * @returns ModuleWithProviders
     */
    static forRoot(): ModuleWithProviders<SharedModule> {

        return {
            ngModule: SharedModule,
            providers: [
                ...SERVICES
            ]
        };

    } // forRoot
}
