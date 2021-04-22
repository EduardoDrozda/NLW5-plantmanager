import { AxiosResponse } from "axios";
import { IPlantEnviroment } from "../models";
import HttpService from "./http.service";

class PlantEnviromentsService extends HttpService<IPlantEnviroment> {

  constructor() {
    super('plants_environments');
  }

  getAll(filters: string[] = [
    '_sort=title',
    '_order=asc'
  ]): Promise<AxiosResponse<IPlantEnviroment[]>> {
    const queryString = this.buildFilters(filters);
    return this.get(queryString);
  }
}

export default new PlantEnviromentsService();