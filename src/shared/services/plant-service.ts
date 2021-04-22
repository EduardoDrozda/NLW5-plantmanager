import { AxiosResponse } from "axios";
import { IPlant } from "../models";
import HttpService from "./http.service";

import { IGenericService } from '../interfaces';

class PlantService extends HttpService<IPlant> implements IGenericService<IPlant> {
  constructor() {
    super('plants');
  }

  getAll(filters: string[] = [
    '_sort=name',
    '_order=asc'
  ]): Promise<AxiosResponse<IPlant[]>> {
    const queryString = this.buildFilters(filters);
    return this.get(queryString);
  }
}

export default new PlantService();