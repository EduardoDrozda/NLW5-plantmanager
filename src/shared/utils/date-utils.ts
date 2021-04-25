import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale'; 

export class DateUtils {

  private static MILLISECONDS = 1000;

  static getDifferenceTime(date1: Date, date2: Date): number {
    return this
      .getMilliseconds(date1) / this.MILLISECONDS
      - this.getMilliseconds(date2) / this.MILLISECONDS
  }

  private static getMilliseconds(date: Date): number {
    return Math.floor(date.getTime());
  }

  static getDistanceBeetweenDates(date1: Date, date2: Date) {
    return formatDistance(
      date1.getTime(),
      date2.getTime(),
      { locale: pt }
    )
  }
}