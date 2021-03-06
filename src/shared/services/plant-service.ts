import { AxiosResponse } from "axios";
import { IPlant, IStoragePlant } from "../models";
import HttpService from "./http.service";

import { IGenericService } from '../interfaces';
import StorageService from "./storage-service";
import { StorageKeyEnum } from "../enums";
import { format } from 'date-fns';
import { DateUtils } from "../utils";
import { Guid } from 'guid-typescript';
import NotificationService from "./notification-service";

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
      const oldPlants = await this.getStoragePlants();
      const id = Guid.create().toString();

      const notificationId = await this.setNotificationTime(plant);

      const newPlant: IStoragePlant = {
        [id]: {
          data: {
            ...plant,
            identification: id,
          },
          notificationId
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

  async getStoragePlants(): Promise<IStoragePlant> {
    try {
      const data = await StorageService.getItem(StorageKeyEnum.PLANTS);
      return data ? (JSON.parse(data) as IStoragePlant): {};
    } catch (error) {
      throw new Error(error);
      
    }
  }

  private async setNotificationTime(plant: IPlant) {
    const { times, repeat_every } = plant.frequency;

    return await NotificationService.setNotification({
      times,
      repeat_every,
      timeNotification: plant.dateTimeNotification,
      content: {
        title: 'Heeey 🌱',
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        data: {
          plant
        }
      }
    })
  }

  async setStoragePlants(plants: IStoragePlant): Promise<void> {
    await StorageService.setItem(
      StorageKeyEnum.PLANTS,
      JSON.stringify(plants)
    );
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