import * as express from 'express'
import {BaseController} from "../../../shared/infra/http/models/BaseController";
import CreateGeniallyService from "../../../../contexts/core/genially/application/CreateGeniallyService";
import {Result} from "../../../../contexts/core/genially/domain/Result";
import Genially from "../../../../contexts/core/genially/domain/Genially";
import {logger} from "../../../shared/logger";

export class CreateGeniallyController extends BaseController{

    constructor(private readonly createGeniallyService: CreateGeniallyService) {
        super();
        this.createGeniallyService = createGeniallyService;
    }

    protected async executeImpl (req: express.Request, res: express.Response): Promise<void | any> {
        logger.debug("Genially create controller", {payload: req.body})
        try {
            const { name, description } = req.body;
            if (!name || ! description) {
                logger.error('There is an error on the payload params', {payload: req.body});
                return this.fail(res, new Error('Name and description are required'));
            }
            const geniallyOnError:  Result<Genially> = Genially.createGenially(name, description);
            if (geniallyOnError.isFailure) {
                logger.error('There is an error validating the payload', {payload: req.body});
                return this.fail(res, geniallyOnError.error);
            }
            const genially: Genially = geniallyOnError.getValue();
            const dbGenially = await this.createGeniallyService.execute(genially);
            return this.ok<any>(res, dbGenially);
        } catch (err) {
            logger.error('Error',{err});
            return this.fail(res, err.toString())
        }
    }
}
