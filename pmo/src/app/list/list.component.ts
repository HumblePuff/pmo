import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  newTask: string;
  tasks: string[] = [];
  showMyContainer: boolean = true;
  addTask(v) {
    this.tasks.push(v);
    // this.showMyContainer = false;
    this.newTask = '';
  }
  constructor(private host: ElementRef) {}
  removeTask(task: string) {
    this.tasks = this.tasks.filter(t => t !== task);
  }
  ngOnInit(): void {
  }
}