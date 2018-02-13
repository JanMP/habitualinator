import { Component, Input, Output, EventEmitter } from "@angular/core";
import { AlertController } from 'ionic-angular';
import { Habit } from "../../providers/habits/habit";

@Component({
  selector: "habit-list-item",
  templateUrl: "habit-list-item.html"
})
export class HabitListItemComponent {
  @Input() habit: Habit;

  @Output() done: EventEmitter<string> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Output() edit: EventEmitter<string> = new EventEmitter();

  constructor(public alertCtrl : AlertController) {}

  handleDelete(item) {
    let confirm = this.alertCtrl.create({
      title : 'Really delete this habit?',
      message : 'Deleting a habit can not be undone.',
      buttons : [
        { text: 'Cancel' },
        {
          text: 'Ok',
          handler: () => {
            item.close()
            this.delete.emit(this.habit.id);
          }
        }
      ]
    });
    confirm.present();
  }
}
