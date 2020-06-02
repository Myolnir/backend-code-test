import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import {logger} from "../../../../api/shared/logger";
import GeniallyNotExist from "../domain/GeniallyNotExist";

export default class DeleteGeniallyService {

  constructor(private readonly geniallyRepository: GeniallyRepository) {}

  public async execute(id: string): Promise<Genially> {
    logger.info(`Deleting genially id ${id}`, id);
    const notDeletedGenially: Genially = await this.geniallyRepository.find(id);
    const deletedGenially: Genially = new Genially(notDeletedGenially.id, notDeletedGenially.name, notDeletedGenially.description);
    deletedGenially.deletedAt = new Date();
    await this.geniallyRepository.save(deletedGenially);
    const genially: Genially = await this.geniallyRepository.find(id);
    if (genially){
      return genially;
    } else {
      logger.error(`Genially ${id} does not exists`, {id});
      throw new GeniallyNotExist(id);
    }
  }

}
