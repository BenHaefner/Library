import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Book } from '../models/book';
import { MatDialog } from '@angular/material/dialog';
import { NewBookDialogComponent } from '../new-book-dialog/new-book-dialog.component';
import { Wrapper } from '../models/wrapper';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  /**
   * An array of Book objects to contain the books that exist
   * within the library.
   */
  public books: Book[]

  /**
   * A function that works as the constructor for LibraryComponent.
   * 
   * @param dialog A MatDialog used to open dialogs.
   * @param libraryService A LibraryService to do http requests for the Library.
   */
  constructor(
    public dialog: MatDialog,
    private libraryService: LibraryService) { }

  public ngOnInit() {
    this.getLibrary()
  }

  /**
   * A function to retrieve the books saved in the library database, 
   * and save those books in the books variable.
   */
  private getLibrary(): void {
    this.libraryService.getLibrary().subscribe(books => this.books = books);
  }

  /**
   * A function to remove a book from the saved array of books.
   * 
   * @param book A Book object to be removed from the saved array of books.
   */
  public removeBook(book: Book): void {
    this.books = this.books.filter(b => b !== book);
  }

  /**
   * A function to open a dialog box in order to create a new book to be
   * added to the book library.
   */
  public openDialog(): void {
    // Set dialog to be opened to be a NewBookDialogComponent,
    // set the width to 300px, and send no data.
    const dialogRef = this.dialog.open(NewBookDialogComponent, {
      width: '300px',
      data: {}
    });
    // Create a wrapper to contain data returned from dialog
    var wrapper: Wrapper;
    // After the close of the dialog, if the wrapper returned has a 
    // book, add that book to the library, then update the library.
    dialogRef.afterClosed().subscribe(result => {
      wrapper = result as Wrapper;
      if (wrapper.hasBook) {
        this.libraryService.addBook(wrapper.book).subscribe(() => this.getLibrary())
      }
    });


  }
}
