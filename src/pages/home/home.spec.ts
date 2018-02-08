import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';

import { HomePage } from './home';
import { HabitsProvider } from '../../providers/habits/habits';

describe('Page: HomePage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      providers: [
       NavController,
       HabitsProvider
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

});
