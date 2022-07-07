export class Mensaje {
    constructor(
        public severity?: string,
        public summary?: string,
        public detail?: string,
        public id?: any,
        public key?: string,
        public life?: number,
        public sticky?: boolean,
        public closable?: boolean,
        public data?: any,
        public icon?: string,
        public contentStyleClass?: string,
        public styleClass?: string
    ) { }
}
