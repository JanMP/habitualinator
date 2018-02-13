import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, ModalController } from "ionic-angular";

import { HomePage } from './home';
import { HabitListItemComponent } from "../../components/habit-list-item/habit-list-item";
import { HabitsProvider } from '../../providers/habits/habits';

import { Platform } from "ionic-angular";
import { NativeStorage } from "@ionic-native/native-storage";

import { EditHabitPage } from "../edit-habit/edit-habit";

describe('Page: HomePage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage,
        HabitListItemComponent,
        EditHabitPage,
      ],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      providers: [
       NavController,
       HabitsProvider,
       ModalController,
       NativeStorage
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof HomePage).toBe(true);
  });

  it ('should have a method add()', () => {
    expect(typeof component.add).toBe('function');
  });
});
