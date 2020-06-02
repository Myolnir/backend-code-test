import {CreateGeniallyController} from "./CreateGeniallyController";
import CreateGeniallyService from "../../../../contexts/core/genially/application/CreateGeniallyService";
import InMemoryGeniallyRepository from "../../../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

const geniallyRepository = new InMemoryGeniallyRepository();
const createGeniallyService = new CreateGeniallyService(geniallyRepository);
const createGeniallyController = new CreateGeniallyController(createGeniallyService);

export { createGeniallyController };
