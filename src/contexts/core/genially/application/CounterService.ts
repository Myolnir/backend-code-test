import {CreationEvent} from "../domain/CreationEvent";
import {logger} from "../../../../api/shared/logger";
export class CounterService implements CreationEvent {

    constructor() {
    }

    static count = 0;
    static increaseCount() {
        this.count += 1;
    }
    static getCount() {
        return this.count;
    }

    async count(): Promise<void> {
        CounterService.increaseCount();
        logger.info(`A new genially has been created, currently we have ${CounterService.getCount()} geniallys created`);
    }

}
