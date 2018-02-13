import { Habit, HabitData } from "./habit";

describe("Class: Habit", () => {
  let habit: Habit;

  beforeEach(() => (habit = new Habit("Title123", "Description123")));

  it("should be created", () => {
    expect(habit instanceof Habit).toBe(true);
  });

  it("should have a property title set by the constructor", () => {
    expect(habit.title).toBe("Title123");
  });

  it("should have a property description set by the constructor", () => {
    expect(habit.description).toBe("Description123");
  });

  it("should have a property id of type string", () => {
    expect(typeof habit.id).toBe("string");
  });

  it("should have a property datesDone of type Set", () => {
    expect(habit.datesDone instanceof Set).toBe(true);
  });

  it("should have a method setDoneOnDate that adds or removes an element of datesDone", () => {
    const date = new Date();
    const dateId = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    expect(habit.datesDone.has(dateId)).toBe(false);
    habit.setDoneOnDate(date, true);
    expect(habit.datesDone.has(dateId)).toBe(true);
    habit.setDoneOnDate(date, false);
    expect(habit.datesDone.has(dateId)).toBe(false);
  });

  it("should have a method toggleDoneOnDate that adds and removes elements of datesDone", () => {
    const date = new Date();
    const dateId = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    expect(habit.datesDone.has(dateId)).toBe(false);
    habit.toggleDoneOnDate(date);
    expect(habit.datesDone.has(dateId)).toBe(true);
    habit.toggleDoneOnDate(date);
    expect(habit.datesDone.has(dateId)).toBe(false);
  });

  it("should have a method doneOnDate that returns true if that date is in datesDone", () => {
    const date = new Date();
    const dateId = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    expect(habit.doneOnDate(date)).toBe(false);
    habit.datesDone.add(dateId);
    expect(habit.doneOnDate(date)).toBe(true);
  });

  it("should have a method streak, that gives the length of the streak leading to and including a given date", () => {
    for (let day = 1; day <= 20; day++) {
      let date = new Date(2001, 2, day);
      let dateId = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      habit.datesDone.add(dateId);
    }
    for(let day = 1; day <= 10; day++) {
      let date = new Date(2001, 3, day);
      let dateId = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      habit.datesDone.add(dateId)
    }
    expect(habit.doneOnDate(new Date(2001, 3, 10))).toBe(true);
    expect(habit.doneOnDate(new Date(2001, 3, 12))).toBe(false);
    expect(habit.streak(new Date(2001, 3, 10))).toBe(10);
    expect(habit.streak(new Date(2001, 3, 11))).toBe(0);
    expect(habit.streak(new Date(2001, 3, 3))).toBe(3);
  });

  it("should have a method longestStreak that returns the longest Streak", () => {
    for(let day = 1; day <= 10; day++) {
      let date = new Date(2001, 3, day);
      let dateId = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      habit.datesDone.add(dateId)
    }
    expect(habit.longestStreak()).toBe(10)
    for (let day = 1; day <= 20; day++) {
      let date = new Date(2001, 2, day);
      let dateId = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      habit.datesDone.add(dateId);
    }
    expect(habit.longestStreak()).toBe(20);
  })
});
