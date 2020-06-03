import {config} from "../../../config";
import CreateGeniallyService from "../../../contexts/core/genially/application/CreateGeniallyService";
import {CreateGeniallyController} from "./createGenially/CreateGeniallyController";
import DeleteGeniallyService from "../../../contexts/core/genially/application/DeleteGeniallyService";
import {DeleteGeniallyController} from "./deleteGenially/DeleteGeniallyController";
import {RenameGeniallyController} from "./renameGenially/RenameGeniallyController";
import RenameGeniallyService from "../../../contexts/core/genially/application/RenameGeniallyService";
import {MongoGeniallyRepository} from "../../../contexts/core/genially/infrastructure/MongoGeniallyRepository";
import {CounterService} from "../../../contexts/core/genially/application/CounterService";


const geniallyRepository = new MongoGeniallyRepository(config);
const deleteGeniallyService = new DeleteGeniallyService(geniallyRepository);
const renameGeniallyService = new RenameGeniallyService(geniallyRepository);
const counterService = new CounterService();
const deleteGeniallyController = new DeleteGeniallyController(deleteGeniallyService);
const createGeniallyService = new CreateGeniallyService(geniallyRepository, counterService);
const createGeniallyController = new CreateGeniallyController(createGeniallyService);
const renameGeniallyController = new RenameGeniallyController(renameGeniallyService);

export { createGeniallyController, deleteGeniallyController, renameGeniallyController };
