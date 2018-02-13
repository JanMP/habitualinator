import { async, TestBed, inject } from "@angular/core/testing";
import { IonicModule, NavController } from "ionic-angular";

import { Platform } from "ionic-angular";
import { NativeStorage } from "@ionic-native/native-storage";

import { HabitsProvider } from "./habits";

describe("Service: HabitsProvider", () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [HabitsProvider, Platform, NativeStorage]
      });
    })
  );

  let service;

  beforeEach(
    inject([HabitsProvider], s => {
      service = s;
    })
  );

  it("should have an array habits", () => {
    expect(Array.isArray(service.habits)).toBe(true);
  });

  it("should have a method subscribe()", () => {
    expect(typeof service.subscribe).toBe("function");
  });
});
