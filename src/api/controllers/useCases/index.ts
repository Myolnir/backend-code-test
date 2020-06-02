import CreateGeniallyService from "../../../contexts/core/genially/application/CreateGeniallyService";
import {CreateGeniallyController} from "./createGenially/CreateGeniallyController";
import InMemoryGeniallyRepository from "../../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import DeleteGeniallyService from "../../../contexts/core/genially/application/DeleteGeniallyService";
import {DeleteGeniallyController} from "./deleteGenially/DeleteGeniallyController";

const geniallyRepository = new InMemoryGeniallyRepository();
const deleteGeniallyService = new DeleteGeniallyService(geniallyRepository);
const deleteGeniallyController = new DeleteGeniallyController(deleteGeniallyService);
const createGeniallyService = new CreateGeniallyService(geniallyRepository);
const createGeniallyController = new CreateGeniallyController(createGeniallyService);

export { createGeniallyController, deleteGeniallyController };
