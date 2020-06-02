import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import {logger} from "../../../../api/shared/logger";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  private geniallys: Array<Genially> = [];

  async save(genially: Genially): Promise<void> {
    logger.info('Saving genially', genially);
    this.geniallys.push(genially);
  }

  async find(id: string): Promise<Genially> {
    logger.info('Finding genially', id);
    logger.info('geniallys find', this.geniallys ? {geniallys: this.geniallys} : {})
    return this.geniallys.find((genially) => genially.id === id);
  }

  async delete(id: string): Promise<void> {
    const geniallyToDelete: Genially = this.geniallys.find((genially) => genially.id === id);
    if (geniallyToDelete) {
      geniallyToDelete.deletedAt = new Date();
      geniallyToDelete.modifiedAt = new Date();
      await this.save(geniallyToDelete)
    }
  }
}
