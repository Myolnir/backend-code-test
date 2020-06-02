import * as express from 'express'
import {BaseController} from "../../../shared/infra/http/models/BaseController";
import {logger} from "../../../shared/logger";
import DeleteGeniallyService from "../../../../contexts/core/genially/application/DeleteGeniallyService";
import Genially from "../../../../contexts/core/genially/domain/Genially";

export class DeleteGeniallyController extends BaseController{

    constructor(private readonly deleteGeniallyService: DeleteGeniallyService) {
        super();
        this.deleteGeniallyService = deleteGeniallyService;
    }

    protected async executeImpl (req: express.Request, res: express.Response): Promise<void | any> {
        logger.debug("Genially delete controller", {payload: req.body})
        try {
            const { id } = req.params;
            if (!id) {
                logger.error('There is an error on the payload params', {payload: req.body});
                return this.fail(res, new Error('Id is required'));
            }
            const dbGenially: Genially = await this.deleteGeniallyService.execute(id);
            return this.ok<any>(res, dbGenially);
        } catch (err) {
            logger.error('Error',{err});
            return this.fail(res, err.toString())
        }
    }
}
