import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form-app';

  onSubmit(form:any){
    console.log(form);
  }

  countryList: country[]=[
    new country('1', 'Kenya'),
    new country('2', 'Rwanda'),
    new country('3', 'Nigeria')
  ]
}

export class country{
  id:string;
  name:string
  constructor(id:string, name:string){
    this.id = id
    this.name = name
  }
}