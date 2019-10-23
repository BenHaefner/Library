import { Component, OnInit } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  Books: Book[] = [
    { title: "Flowers for Algernon", author: "Daniel Keyes" },
    { title: "Citizen: An American Lyric", author: "Claudia Rankine" }
  ]
  
  constructor() { }

  ngOnInit() {
  }

}
