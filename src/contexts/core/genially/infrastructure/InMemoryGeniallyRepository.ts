import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import {logger} from "../../../../api/shared/logger";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  private geniallys: Array<Genially> = [];

  async save(genially: Genially): Promise<void> {
    logger.info('Saving genially', genially);
    await this.delete(genially.id);
    this.geniallys.push(genially);
  }

  async find(id: string): Promise<Genially> {
    logger.info('Finding genially', {id});
    return this.geniallys.find((genially) => genially.id === id);
  }

  async delete(id: string): Promise<void> {
    logger.info('Deleting genially', id);
    this.geniallys = this.geniallys.filter((genially) => genially.id !== id);

  }
}
