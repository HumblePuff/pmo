import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  newTask: string;
  tasks: string[] = [];
  showMyContainer: boolean = false;

  addTask(v) {
    this.tasks.push(v);
    this.newTask = '';
  }



  removeTask(task: string) {
    this.tasks = this.tasks.filter(t => t !== task);
  }
  

  ngOnInit(): void {
      
  }

}
