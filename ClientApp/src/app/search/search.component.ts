import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../google.service';
import { LibraryService } from '../library.service';
import { Book } from '../book';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchForm = this.fb.group({
    search: ['']
  })

  public searched: Object[];

  constructor(
    private fb: FormBuilder,
    private googleService: GoogleService,
    private libraryService: LibraryService) { }

  ngOnInit() {
  }
  
  private convertToBook(toConvert: any): Book {
    let book: Book = {
      title: toConvert.title ? toConvert.title : "Unknown",
      author: toConvert.authors ? toConvert.authors[0] : "Unknown",
      isbn: toConvert.industryIdentifiers ? toConvert.industryIdentifiers[0].identifier : "Unknown",
      thumbnail: toConvert.imageLinks ? toConvert.imageLinks.smallThumbnail : "",
      read: false,
    };

    return book;
  }

  public onSubmit() {
    this.googleService.getSearched(this.searchForm.get("search").value).subscribe(
      searched => this.searched = searched
    );
  }

}
