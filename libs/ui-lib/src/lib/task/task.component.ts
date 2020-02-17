import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'task-item',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  title: string;
  @Input() task: any;
  @Output() onPinTask: EventEmitter<any> = new EventEmitter();
  @Output() onArchiveTask: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onPin(id) {
    this.onPinTask.emit(id);
  }

  onArchive(id) {
    this.onArchiveTask.emit(id);
  }

}

export interface Task {
  id: string;
  title: string;
  state: string;
}