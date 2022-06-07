export class TimeUtils {
  static getFormattedTimeForTraining(time: number) {
    if (time < 0) {
      return undefined;
    }

    const mins = Math.floor(time / 60);
    const secs = time % 60;

    let res = '';
    if (mins > 0) {
      res += `${mins} мин. `;
    }

    if (res === '' || secs > 0) {
      res += `${secs} сек. `;
    }

    return res;
  }
}
