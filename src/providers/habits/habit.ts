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
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
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

  public streak(date: Date): number {
    const s: (d: Date, count: number) => number = (d, count) => {
      if (this.doneOnDate(d)) {
        return s(new Date(d.valueOf() - 24 * 60 * 60 * 1000), count + 1);
      } else {
        return count;
      }
    };
    return s(date, 0);
  }

  public currentStreak() : number {
    return this.streak(new Date())
  }

  public longestStreak() : number {
    let result = 0;
    for (let dateId of Array.from(this.datesDone)) {
      let [year, month, day] = dateId.split("-")
      let streak = this.streak(new Date(Number(year), Number(month), Number(day)))
      if(streak > result) result = streak;
    }
    return result;
  }
}
