import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class HttpService<T> {

  protected api: AxiosInstance;

  private apiUrl: string;
  
  constructor(apiUrl: string) {
    this.api = axios.create({
      baseURL: 'http://192.168.0.102:3333'
    });

    this.apiUrl = apiUrl;
  }

  get(queryString?: string): Promise<AxiosResponse<T[]>> {
    
    let url = this.apiUrl;

    if (queryString) {
      url += queryString;
    }

    return this.api.get<T[]>(url);
  }

  protected buildFilters(filters: string[] = []): string {
    let filter = '?';

    filters.forEach(f => {
      filter = `${filter}${f}&`;
    })

    return filter;
  }
}