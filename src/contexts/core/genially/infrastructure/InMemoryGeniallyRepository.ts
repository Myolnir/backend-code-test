import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import {logger} from "../../../../api/shared/logger";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  private geniallys: Genially[];

  async save(genially: Genially): Promise<void> {
    logger.info('Saving genially', genially);
    await this.delete(genially.id);
    this.geniallys.push(genially);
  }

  async find(id: string): Promise<Genially> {
    return this.geniallys.find((genially) => genially.id === id);
  }

  async delete(id: string): Promise<void> {
    logger.info('geniallys', this.geniallys ? {geniallys: this.geniallys} : {})
    this.geniallys = this.geniallys ? this.geniallys.filter((genially) => genially.id !== id) : [];
  }
}
