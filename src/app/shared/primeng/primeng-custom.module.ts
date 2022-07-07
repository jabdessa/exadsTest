import { NgModule } from '@angular/core';


// PrimeNG imports
// Module
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

// Services
import { ConfirmationService, MessageService } from 'primeng/api';

/** PrimeNG modules array definition */
const PRIMENG_MODULES = [
    ToastModule,
    MessageModule,
    MessagesModule,
    TooltipModule
];

/** PrimeNG services array definition */
const SERVICES = [
    ConfirmationService,
    MessageService,
];

/**
 * Exposes only the specific PrimeNG modules used in the baseProjectSPA application.
 */
@NgModule({
    imports: [...PRIMENG_MODULES],
    exports: [...PRIMENG_MODULES],
    providers: [...SERVICES]
})
export class PrimengCustomModule { }
