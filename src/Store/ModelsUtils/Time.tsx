export class TimeUtils {
  static getFormattedTimeForTraining(time: number) {
    const timeInSecs = Math.abs(Math.floor(time / 1000));

    const mins = Math.floor(timeInSecs / 60);
    const secs = timeInSecs % 60;

    let res = '';
    if (mins > 0) {
      res += `${mins}м.`;
    }
    if (res) {
      res += ' ';
    }

    res += `${secs}с.`;

    if (time < 0) {
      res = '-' + res;
    }
    return res;
  }
}
