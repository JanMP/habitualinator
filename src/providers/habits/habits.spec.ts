// import { async, TestBed } from "@angular/core/testing";
// import { IonicModule, NavController } from "ionic-angular";

import { HabitsProvider } from "./habits";

describe("Service: HabitsProvider", () => {
  let service;

  beforeEach(() => {
    service = new HabitsProvider();
  });

  it('should have an array habits', () => {
    expect(Array.isArray(service.habits)).toBe(true);
  });

  it('should have a method getHabits()' , () => {
    expect(typeof service.getHabits).toBe('function');
  });
});
