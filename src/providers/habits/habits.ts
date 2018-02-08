// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface HabitData {
  id : string;
  title : string;
  description : string;
  datesDone : Set<string>
}

export class Habit implements HabitData {
  id : string;
  title : string;
  description : string;
  datesDone : Set<string>

  constructor(title : string, description: string) {
    this.title = title;
    this.description = description;
    this.datesDone = new Set([]);
    this.id = Math.random().toString().slice(2);
  }

  private dateId(date : Date) : string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
  }

  public doneToday() : boolean {
    return this.doneOnDate(new Date())
  }

  public doneOnDate(date : Date) : boolean {
    return this.datesDone.has(this.dateId(date))
  }

  public setDoneToday(done : boolean) {
    this.setDoneOnDate(new Date(), done);
  }

  public setDoneOnDate(date : Date, done : boolean) {
    if(done) {
      this.datesDone.add(this.dateId(date));
    } else {
      this.datesDone.delete(this.dateId(date));
    }
  }

  public toggleDoneToday() {
    this.toggleDoneOnDate(new Date());
  }

  public toggleDoneOnDate(date : Date) {
    if(this.datesDone.has(this.dateId(date))) {
      this.datesDone.delete(this.dateId(date));
    } else {
      this.datesDone.add(this.dateId(date));
    }
  }
}

export const mockHabits = ["alpha", "beta", "gamma"].map(str => {
  return new Habit(str, `description of ${str}`);
});

@Injectable()
export class HabitsProvider {

  habits : Habit[];
  habitsSubject : BehaviorSubject<Habit[]>

  constructor() {
    this.habits = mockHabits;
    this.habitsSubject = new BehaviorSubject(this.habits);
  }

  updateObservable() {
    this.habitsSubject.next(this.habits);
  }

  getHabits() {
    return this.habitsSubject;
  }

  getHabit(id : string) : Habit {
    let habit = this.habits.find(habit => habit.id === id);
    return habit
  }

  adHabit(title : string, description : string) {
    this.habits.push(new Habit(title, description));
    this.updateObservable();
  }

  toggleDoneToday(id : string) {
    let index = this.habits.findIndex(habit => habit.id === id)
    this.habits[index].toggleDoneToday();
    this.updateObservable();
  }

  deleteHabit(id : string) {
    this.habits = this.habits.filter(habit => habit.id !== id);
    this.updateObservable();
  }

  setHabit(habit : HabitData) {
    let index = this.habits.findIndex(e => e.id === habit.id);
    this.habits[index].title = habit.title;
    this.habits[index].description = habit.description;
    this.habits[index].datesDone = habit.datesDone;
    this.updateObservable();
  }
}
