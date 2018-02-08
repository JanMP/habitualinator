import { Component } from "@angular/core";
import { IonicPage, ViewController, NavParams } from "ionic-angular";
import {
  HabitsProvider,
  Habit,
  HabitData
} from "../../providers/habits/habits";
/**
 * Generated class for the EditHabitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-habit",
  templateUrl: "edit-habit.html"
})
export class EditHabitPage {
  habit: HabitData;
  newHabit: boolean;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public habits: HabitsProvider
  ) {
    this.newHabit = navParams.get('') || false;
    if (this.newHabit) {
      console.log('creating new habit')
      this.habit = {
        id: 'new habit',
        title: '',
        description: '',
        datesDone: new Set([])
      };
    } else {
      let id: string = navParams.get('id');
      this.habit = { ...this.habits.getHabit(id) };
    }
  }

  // ionViewDidLoad() {}

  save() {
    if (this.newHabit) {
      this.habits.adHabit(this.habit.title, this.habit.description);
    } else {
      this.habits.setHabit(this.habit);
    }
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
