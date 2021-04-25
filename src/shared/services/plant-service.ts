import { AxiosResponse } from "axios";
import { IPlant, IStoragePlant } from "../models";
import HttpService from "./http.service";

import { IGenericService } from '../interfaces';
import StorageService from "./storage-service";
import { StorageKeyEnum } from "../enums";
import { format } from 'date-fns';
import { DateUtils } from "../utils";
import { Guid } from 'guid-typescript';

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

  async savePlant(plant: IPlant) {
    try {
      console.log(plant);
      const oldPlants = await this.getStoragePlants();
      const newPlant: IStoragePlant = {
        [Guid.create().toString()]: {
          data: plant
        }
      }

      await StorageService.setItem(StorageKeyEnum.PLANTS,
        JSON.stringify({
          ...oldPlants,
          ...newPlant,
        })
      );
    } catch (error) {
      throw new Error(error);
      
    }
  }

  private async getStoragePlants(): Promise<IStoragePlant> {
    try {
      const data = await StorageService.getItem(StorageKeyEnum.PLANTS);
      return data ? (JSON.parse(data) as IStoragePlant): {};
    } catch (error) {
      throw new Error(error);
      
    }
  }

  async loadPlant(): Promise<IPlant[]> {
    try {
      const plants = await this.getStoragePlants();

      const plansSorted = Object
        .keys(plants)
        .map((plant) => {
          return {
            ...plants[plant].data,
            hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
          }
        })
        .sort((a, b) => DateUtils
          .getDifferenceTime(
            new Date(a.dateTimeNotification), 
            new Date(b.dateTimeNotification))
          )

      return plansSorted;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new PlantService();