import { Injectable } from '@angular/core';
import {Todo} from './item'
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todoSubject = new BehaviorSubject<Todo[]>([])

  constructor() { }
}
