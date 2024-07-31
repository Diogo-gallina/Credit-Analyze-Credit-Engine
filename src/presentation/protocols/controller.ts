import { Request } from './requestInterface';

export interface Controller {
  handle(request: Request): Promise<void>;
}
