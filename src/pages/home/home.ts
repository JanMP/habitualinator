import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HabitsProvider } from '../../providers/habits/habits';
import { HabitListItemComponent } from '../../components/habit-list-item/habit-list-item';
import { EditHabitPage } from '../edit-habit/edit-habit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  habitList = []

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public habits: HabitsProvider
  ) {
    this.habitList = ["a", "b", "c"];
  }

  ngOnInit() {
    this.habits.getHabits().subscribe((v) => this.habitList = v);
  }

  add() {
    let modal = this.modalCtrl.create(EditHabitPage, {newHabit : true});
    modal.present()
  }

  toggleDoneToday(id : string) {
    this.habits.toggleDoneToday(id);
  }

  delete(id : string) {
    this.habits.deleteHabit(id);
  }

  edit(id : string) {
    let modal = this.modalCtrl.create(EditHabitPage, {id});
    modal.present()
  }

}
