import { IPlant } from "./plant.model";

export interface IStoragePlant {
  [id: string]: {
    data: IPlant,
    notificationId: string;
  }
}