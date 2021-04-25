interface IFrequency {
  times: number;
  repeat_every: string;
}

export interface IPlant {
  id: string;
  identification: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: IFrequency
  dateTimeNotification: Date;
  hour: string;
}