import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, Validators, Form } from '@angular/forms';
import { Book } from '../models/book';
import { LibraryService } from '../library.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Author } from '../models/author';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnInit, OnChanges {

  /**
   * A form to contain any existing informantion from the 
   * book object, or any data entered by the user about that
   * book object, including a form array in order to add 
   * authors to the object.
   */
  public bookForm = this.fb.group({
    title: ['', Validators.required],
    authors: this.fb.array([]),
    isbn: [''],
    read: [false]
  })

  /**
   * A get function to easily retrieve the form array
   * "authors".
   */
  public get authors() {
    return this.bookForm.get('authors') as FormArray;
  }

  /**
   * An input from the parent component of type Book
   * that contains any saved information about the book
   * this card represents.
   */
  @Input() public book: Book;

  /**
   * An input from the parent component of type boolean
   * that represents whether the data in this card's form
   * fields should be user editable.
   */
  @Input() public readonly: boolean;

  /**
   * An output to the parent component of type EventEmitter
   * that is used to signal that the parent component should
   * update its list of books.
   */
  @Output() public remover = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    this.bookForm.get("title").setValue(this.book.title);
    this.representAuthors();
    this.bookForm.get("isbn").setValue(this.book.isbn);
    this.bookForm.get("read").setValue(this.book.read);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.bookForm.get("title").setValue(this.book.title);
    this.bookForm.get("isbn").setValue(this.book.isbn);
    this.bookForm.get("read").setValue(this.book.read);
  }

  /**
   * A function to trigger on a form submit button's submittal, to any
   * change made to the book the card represents.
   */
  public onSubmit() {
    this.book.title = this.bookForm.get("title").value;
    this.updateAuthors();
    this.book.isbn = this.bookForm.get("isbn").value;
    this.book.read = this.bookForm.get("read").value;
    this.libraryService.updateBook(this.book).subscribe(() =>
      this.openSnackBar("Saved", "Your changes have been saved."));
  }

  /**
   * A function to add the book saved in the "book" variable
   * to the library database.
   */
  public addBook() {
    this.libraryService.addBook(this.book).subscribe(() =>
      this.openSnackBar("Added", "The book has been added to the library.")
    );
  }

  /**
   * A function to remove the book daved in the "book" variable 
   * from the library database, and inform the parent component
   * to update its list of books.
   */
  public removeBook() {
    this.libraryService.deleteBook(this.book).subscribe(() => this.remover.emit());
  }

  /**
   * A function to open a dialog box to change the thumbnail URL
   * of the component.
   */
  public openDialog(): void {
    // Do not allow a dialog to open if the component is readonly
    if (!this.readonly) {
      // Set dialog to be opened to be of type ImageDialogComponent,
      // set the width to 250px, and send the current thumbnail as 
      // the data being sent to the dialog.
      const dialogRef = this.dialog.open(ImageDialogComponent, {
        width: '250px',
        data: { thumbnail: this.book.thumbnail }
      });
      // After the dialog closes, set the books thumbnail to be the result.
      dialogRef.afterClosed().subscribe(result => {
        this.book.thumbnail = result;
      });
    }
  }

  /**
   * A function to place the authors saved the "book" variables
   * "authors" array into the form array "authors", or to place 
   * an empty author box if no authors exist yet.
   */
  private representAuthors(): void {
    // In the case that the "book" variable has authors already
    if (this.book.authors != null && this.book.authors.length > 0) {
      //Interate over those authors and push them to the authors form array.
      this.book.authors.forEach(author => {
        this.authors.push(this.fb.control(author.name))
      });
    }
    // In the case there are no authors in the "book" variable, push a blank
    // control to the form array.
    else {
      this.authors.push(this.fb.control(''))
    }
  }

  // Doesnt necessarily preserve authorIds. Consider changing.
  /**
   * A function to update the "book" variables "author" array.
   */
  private updateAuthors(): void {
    // Iterate over every author in the book variable.
    this.book.authors.forEach(author => {
      // If an author doesnt exist in the new book that did exist in the old book,
      // delete that author.
      if (!this.authors.controls.some(auth => auth.value == author.name)) {
        this.book.authors = this.book.authors.filter(deleted => deleted != author);
      }
    });
    // Iterate over every author in the updated book.
    this.authors.controls.forEach(authorValue => {
      // Check if the entry is new
      var existingAuthor = this.book.authors.filter(a => a.name == authorValue.value);
      // If the entry is new then add it to the array of authors in the book variable.
      if (existingAuthor.length == 0) {
        let newAuthor: Author = {name: authorValue.value};
        this.book.authors.push(newAuthor);
      }
    });
  }

  /**
   * A function to remove controls from the form array "authors".
   * 
   * @param index The index of the control to be removed from the form array.
   */
  public removeAuthor(index: number): void {
    this.authors.controls.splice(index, 1);
  }

  /**
   * A function to add a blank control to the form array "authors".
   */
  public addAuthor(): void {
    this.authors.controls.push(this.fb.control(''));
  }

  /**
   * A function to show a snackbar based on strings feed to the function.
   * 
   * @param message The heading for the message to appear in the snack bar
   * @param subheading The subheading for the message to appear in the snack bar
   */
  private openSnackBar(message: string, subheading: string) {
    this.snackBar.open(message, subheading, {
      duration: 2500,
    });
  }
}
