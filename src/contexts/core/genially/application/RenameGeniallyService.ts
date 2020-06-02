import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import {logger} from "../../../../api/shared/logger";
import GeniallyNotExist from "../domain/GeniallyNotExist";

export default class RenameGeniallyService {

  constructor(private readonly geniallyRepository: GeniallyRepository) {}

  public async execute(id: string, name: string): Promise<Genially> {
    logger.info(`Updating genially id ${id}`, {id, name});
    const geniallyToUpdate: Genially = await this.geniallyRepository.find(id);
    const modifiedGenially = new Genially(geniallyToUpdate.id, name, geniallyToUpdate.description);
    modifiedGenially.modifiedAt = new Date();
    await this.geniallyRepository.save(modifiedGenially);
    const dbGenially: Genially = await this.geniallyRepository.find(modifiedGenially.id);
    if (dbGenially){
      return dbGenially;
    } else {
      logger.error(`Genially ${id} does not exists`, {id});
      throw new GeniallyNotExist(id);
    }
  }
}
