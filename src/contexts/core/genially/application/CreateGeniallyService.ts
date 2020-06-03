import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import {logger} from "../../../../api/shared/logger";
import {BaseGeniallyService} from "./BaseGeniallyService";
import {CounterService} from "./CounterService";
import {CreationEvent} from "../domain/CreationEvent";
const myEmitter = require('../domain/CreationEvent');
const EventEmmiter = require('events').EventEmitter;


type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export default class CreateGeniallyService extends BaseGeniallyService{
  constructor(private readonly repository: GeniallyRepository, private readonly counter: CreationEvent) {
    super();
  }

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    logger.debug("Genially create service", req);
    const eventEmmiter = new EventEmmiter();
    const { id, name, description } = req;
    const genially = new Genially(id, name, description);
    await this.repository.save(genially);
    await this.counter.count();
    return genially;
  }
}
