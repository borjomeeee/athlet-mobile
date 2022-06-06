export class PlaygroundClock {
  private subs: ((time: number) => void)[] = [];
  private intervalId: NodeJS.Timer | undefined;

  private last: number = Date.now();

  private ping() {
    this.last = Date.now();
    this.subs.forEach(sub => sub(this.last));
  }

  start() {
    this.ping();
    this.intervalId = setInterval(() => this.ping(), 1000);
  }

  watch(fn: (time: number) => void) {
    fn(this.last);
    this.subs.push(fn);

    return () => {
      this.subs = this.subs.filter(sub => sub !== fn);
    };
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

export const playgroundClock = new PlaygroundClock();
