import { Router } from 'express'
import {createGeniallyController, deleteGeniallyController} from "../controllers/useCases";

const geniallyRouter: Router = Router();

geniallyRouter.post('/',
    (req, res) => createGeniallyController.execute(req, res));
geniallyRouter.delete('/:id',
    (req, res) => deleteGeniallyController.execute(req, res));

export {geniallyRouter}
