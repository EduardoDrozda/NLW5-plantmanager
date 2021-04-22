import { AxiosResponse } from "axios";

export interface IGenericService<T> {
  getAll(filters: string[]): Promise<AxiosResponse<T[]>>;
}