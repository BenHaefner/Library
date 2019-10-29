import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../google.service';
import { LibraryService } from '../library.service';
import { Book } from '../models/book';
import { FormBuilder } from '@angular/forms';
import { Author } from '../models/author';


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
      authors: toConvert.authors ? this.extractAuthors(toConvert.authors) : null,
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

  private extractAuthors(toExtract: any): Author[] {
    var list: Array<Author> = [];
    toExtract.forEach(extractedName => {
      let item: Author = {name: extractedName};
      list.push(item);
    });
    return list;
  }

}
