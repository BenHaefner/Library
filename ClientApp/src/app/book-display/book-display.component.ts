import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnInit {

  name = new FormControl('');

  constructor() { }

  ngOnInit() {
  }

}
