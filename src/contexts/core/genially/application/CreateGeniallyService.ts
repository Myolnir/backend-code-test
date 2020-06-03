import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import {logger} from "../../../../api/shared/logger";
import {BaseGeniallyService} from "./BaseGeniallyService";

type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export default class CreateGeniallyService extends BaseGeniallyService{
  constructor(private readonly repository: GeniallyRepository) {
    super();
  }

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    logger.debug("Genially create service", req);
    const { id, name, description } = req;
    const genially = new Genially(id, name, description);
    await this.repository.save(genially);
    return genially;
  }
}
