import { Router } from 'express'
import {createGeniallyController, deleteGeniallyController, renameGeniallyController} from "../controllers/useCases";

const geniallyRouter: Router = Router();

geniallyRouter.post('/',
    (req, res) => createGeniallyController.execute(req, res));
geniallyRouter.delete('/:id',
    (req, res) => deleteGeniallyController.execute(req, res));
geniallyRouter.patch('/:id',
    (req, res) => renameGeniallyController.execute(req, res));

export {geniallyRouter}
