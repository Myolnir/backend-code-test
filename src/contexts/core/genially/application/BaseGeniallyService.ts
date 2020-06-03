import Genially from "../domain/Genially";
import {logger} from "../../../../api/shared/logger";
import GeniallyNotExist from "../domain/GeniallyNotExist";

export abstract class BaseGeniallyService {

    /**
     * Checks if the given genially exists, if not throws a not found exception.
     * @param genially to check its existence.
     * @param id to throw the error.
     */
    public checkIfGeniallyExists(genially: Genially, id: string) {
        if (!genially) {
            logger.error(`Genially ${id} does not exists`, {id});
            throw new GeniallyNotExist(id);
        }
    }
}
