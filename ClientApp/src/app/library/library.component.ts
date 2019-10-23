import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  Books: Object[]
  
  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
    this.getLibrary()
  }

  getLibrary(): void {
    this.libraryService.getLibrary().subscribe(books => this.Books = books);
  }
}
