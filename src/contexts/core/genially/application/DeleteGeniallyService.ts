import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import {logger} from "../../../../api/shared/logger";
import GeniallyNotExist from "../domain/GeniallyNotExist";

export default class DeleteGeniallyService {

  constructor(private readonly geniallyRepository: GeniallyRepository) {}

  public async execute(id: string): Promise<Genially> {
    logger.info(`Deleting genially id ${id}`, id);
    await this.geniallyRepository.delete(id);
    const deletedGenially: Genially = await this.geniallyRepository.find(id);
    if (deletedGenially){
      return deletedGenially;
    } else {
      throw new GeniallyNotExist(id);
    }
  }

}
