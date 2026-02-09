import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AddTaskBtnComponent } from '@features/tasks-board/components/add-task-btn/add-task-btn.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    AddTaskBtnComponent,

    RouterOutlet,

    MatToolbarModule,
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
