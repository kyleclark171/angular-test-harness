import { Spy } from '@cot/test/spy';

export class LoggerServiceSpy extends Spy {
    // methods to spy on
    readonly print: jasmine.Spy;

    constructor() {
        super();
        this.print = this.createSpy();
    }
}
