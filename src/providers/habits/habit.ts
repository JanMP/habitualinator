export interface HabitData {
  id: string;
  title: string;
  description: string;
  datesDone: Set<string>;
}

export class Habit implements HabitData {
  id: string;
  title: string;
  description: string;
  datesDone: Set<string>;

  constructor(
    title: string,
    description: string,
    datesDone: Set<string> = new Set([])
  ) {
    this.title = title;
    this.description = description;
    this.datesDone = datesDone;
    this.id = Math.random()
      .toString()
      .slice(2);
  }

  private dateId(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  }

  public doneToday(): boolean {
    return this.doneOnDate(new Date());
  }

  public doneOnDate(date: Date): boolean {
    return this.datesDone.has(this.dateId(date));
  }

  public setDoneToday(done: boolean) {
    this.setDoneOnDate(new Date(), done);
  }

  public setDoneOnDate(date: Date, done: boolean) {
    if (done) {
      this.datesDone.add(this.dateId(date));
    } else {
      this.datesDone.delete(this.dateId(date));
    }
  }

  public toggleDoneToday() {
    this.toggleDoneOnDate(new Date());
  }

  public toggleDoneOnDate(date: Date) {
    if (this.datesDone.has(this.dateId(date))) {
      this.datesDone.delete(this.dateId(date));
    } else {
      this.datesDone.add(this.dateId(date));
    }
  }
}
