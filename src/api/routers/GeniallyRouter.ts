import { Router } from 'express'
import {createGeniallyController} from "../controllers/useCases/createGenially";

const geniallyRouter: Router = Router();

geniallyRouter.post('/',
    (req, res) => createGeniallyController.execute(req, res));

export {geniallyRouter}
