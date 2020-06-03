import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import {logger} from "../../../../api/shared/logger";
import {BaseGeniallyService} from "./BaseGeniallyService";

export default class RenameGeniallyService extends BaseGeniallyService {

  constructor(private readonly geniallyRepository: GeniallyRepository) {
    super();
  }

  public async execute(id: string, name: string): Promise<Genially> {
    logger.info(`Updating genially id ${id}`, {id, name});
    const geniallyToUpdate: Genially = await this.geniallyRepository.find(id);
    super.checkIfGeniallyExists(geniallyToUpdate, id);
    const modifiedGenially = new Genially(geniallyToUpdate.id, name, geniallyToUpdate.description);
    modifiedGenially.modifiedAt = new Date();
    await this.geniallyRepository.delete(id);
    await this.geniallyRepository.save(modifiedGenially);
    return await this.geniallyRepository.find(modifiedGenially.id);
  }
}
