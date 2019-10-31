import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../google.service';
import { Book } from '../models/book';
import { FormBuilder } from '@angular/forms';
import { Author } from '../models/author';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public message: string;

  /**
  * An array of objects, each of which contains the data of a book
  * returned from the Google Books API.
  */
  public searched: Object[];

  /**
   * A boolean variable to indicate whether to show a loading indicator
   */
  public showLoader = false;

  /**
   * A function that works as the constructor for SearchComponent.
   *
   * @param fb A FormBuilder to easily build forms.
   * @param googleService A GoogleService to do http requests for Google Books data.
   */
  constructor(
    private fb: FormBuilder,
    private googleService: GoogleService) {
    this.googleService.searchTermsBehavior.subscribe(() => {
      this.onParentSubmit();
    });
  }

  ngOnInit() {
    this.onParentSubmit();
  }

  /**
   * A function to covert data from Google Books to the format accepted
   * by this programs Web API.
   *
   * @param toConvert Data from Google Bookss API to be converted into
   *  a book.
   */
  private convertToBook(toConvert: any): Book {
    // Creation of book to be returned by the function, handling of null values.
    const book: Book = {
      title: toConvert.title ? toConvert.title : 'Unknown',
      authors: toConvert.authors ? this.extractAuthors(toConvert.authors) : null,
      isbn: toConvert.industryIdentifiers ? toConvert.industryIdentifiers[0].identifier : 'Unknown',
      thumbnail: toConvert.imageLinks ? toConvert.imageLinks.smallThumbnail : '',
      read: false,
    };

    return book;
  }

  /**
   * A function to handle the submitting of a search query.
   */
  public onParentSubmit() {
    this.searched = [];
    this.message = 'Searching...';
    this.showLoader = true;
    this.googleService.getSearched().subscribe(searched => {
      this.searched = searched;
      this.showLoader = false;
      if (searched.length === 0) {
        this.message = 'There doesnt seem to be anything. Use the search bar to search for a book.';
      } else {
        this.message = '';
      }
    });
  }

  /**
   * A function to convert author data from Google Books into a format accepted
   * by this programs Web API.
   *
   * @param toExtract Author data from Google Books API to be converted into
   * authors, to be inserted into a Book object.
   */
  private extractAuthors(toExtract: any): Author[] {
    // Creation of array to be returned
    const list: Array<Author> = [];
    // Iteration over every name in Google Books author data, placing
    // all data into an author object, and pusing that object to the list.
    toExtract.forEach(extractedName => {
      const item: Author = { name: extractedName };
      list.push(item);
    });
    return list;
  }
}
