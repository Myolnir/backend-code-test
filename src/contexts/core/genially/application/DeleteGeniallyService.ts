import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import {logger} from "../../../../api/shared/logger";
import {BaseGeniallyService} from "./BaseGeniallyService";

export default class DeleteGeniallyService extends BaseGeniallyService{

  constructor(private readonly geniallyRepository: GeniallyRepository) {
    super();
  }

  public async execute(id: string): Promise<Genially> {
    logger.info(`Deleting genially id ${id}`, id);
    const notDeletedGenially: any = await this.geniallyRepository.find(id);
    super.checkIfGeniallyExists(notDeletedGenially, id);
    const deletedGenially: Genially = new Genially(notDeletedGenially._id, notDeletedGenially._name, notDeletedGenially._description);
    deletedGenially.deletedAt = new Date();
    await this.geniallyRepository.delete(id);
    await this.geniallyRepository.save(deletedGenially);
    return await this.geniallyRepository.find(id);
  }

}
