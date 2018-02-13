// import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { Platform } from "ionic-angular";
import { NativeStorage } from "@ionic-native/native-storage";
import { PartialObserver } from "rxjs/Observer";
import { Habit, HabitData } from "./habit"


export const mockHabits = ["alpha", "beta", "gamma"].map(str => {
  return new Habit(str, `description of ${str}`);
});

@Injectable()
export class HabitsProvider {
  habits: Habit[];
  habitsSubject: BehaviorSubject<Habit[]>;

  constructor(public platform: Platform, private nativeStorage: NativeStorage) {
    this.habits = mockHabits;
    this.habitsSubject = new BehaviorSubject(this.habits);
    this.platform.ready().then(() => this.getStore());
  }

  setStore() {
    let data = this.habits.map(habit => {
      return {
        title: habit.title,
        description: habit.description,
        datesDone: Array.from(habit.datesDone)
      };
    });
    let json = JSON.stringify(data);
    this.nativeStorage.setItem("habits", json).then(
      () => {
        console.log("Stored habits");
      },
      error => {
        this.addHabit("Error storing habits", error.toString());
        console.error("Error storing item", error);
      }
    );
  }

  getStore() {
    this.nativeStorage.getItem("habits").then(
      json => {
        this.habits = JSON.parse(json).map(
          e => new Habit(e.title, e.description, new Set(e.datesDone))
        );
        this.habitsSubject.next(this.habits);
      },
      error => {
        this.addHabit("Error retrieving data", error.toString());
        console.error("Error retrieving data", error);
      }
    );
  }

  updateHabits() {
    this.habitsSubject.next(this.habits);
    this.setStore();
  }

  // got to work on this typing...
  subscribe(observer) {
    return this.habitsSubject.subscribe(observer);
  }

  getHabit(id: string): Habit {
    let habit = this.habits.find(habit => habit.id === id);
    return habit;
  }

  addHabit(title: string, description: string) {
    this.habits.push(new Habit(title, description));
    this.updateHabits();
  }

  toggleDoneToday(id: string) {
    let index = this.habits.findIndex(habit => habit.id === id);
    this.habits[index].toggleDoneToday();
    this.updateHabits();
  }

  deleteHabit(id: string) {
    this.habits = this.habits.filter(habit => habit.id !== id);
    this.updateHabits();
  }

  setHabit(habit: HabitData) {
    let index = this.habits.findIndex(e => e.id === habit.id);
    this.habits[index].title = habit.title;
    this.habits[index].description = habit.description;
    this.habits[index].datesDone = habit.datesDone;
    this.updateHabits();
  }
}
