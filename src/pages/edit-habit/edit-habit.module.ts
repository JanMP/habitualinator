import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditHabitPage } from './edit-habit';

@NgModule({
  declarations: [
    EditHabitPage,
  ],
  imports: [
    IonicPageModule.forChild(EditHabitPage),
  ],
})
export class EditHabitPageModule {}
