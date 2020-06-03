import * as express from 'express'
import {BaseController} from "../../../shared/infra/http/models/BaseController";
import {logger} from "../../../shared/logger";
import RenameGeniallyService from "../../../../contexts/core/genially/application/RenameGeniallyService";
import Genially from "../../../../contexts/core/genially/domain/Genially";

export class RenameGeniallyController extends BaseController{

    constructor(private readonly renameGeniallyService: RenameGeniallyService) {
        super();
        this.renameGeniallyService = renameGeniallyService;
    }

    protected async executeImpl (req: express.Request, res: express.Response): Promise<void | any> {
        logger.debug("Genially delete controller", {payload: req.body})
        try {
            const { id } = req.params;
            const { name } = req.body;
            if (!id || !name) {
                logger.error('There is an error on the payload params', {id, name});
                return this.fail(res, new Error('Id and name are required'));
            }
            const dbGenially: Genially = await this.renameGeniallyService.execute(id, name);
            return this.ok<any>(res, dbGenially);
        } catch (err) {
            logger.error('Error',{err});
            return this.fail(res, err.toString())
        }
    }
}
