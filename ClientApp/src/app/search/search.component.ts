import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../google.service';
import { Book } from '../book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searched: Book[];
  
  constructor(private googleService: GoogleService) { }

  ngOnInit() {
  }

  getSearched(searchTerms:string): void {
    this.googleService.getSearched(searchTerms).subscribe(searched => this.searched = searched);
  }
}
