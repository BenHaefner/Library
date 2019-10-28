import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from '../book';
import { LibraryService } from '../library.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnInit, OnChanges {

  public bookForm = this.fb.group({
    title: ['', Validators.required],
    author: [''],
    isbn: [''],
    read: [false]
  })

  @Input() public book: Book;

  @Input() public readonly: boolean;

  @Output() public remove = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private libraryService: LibraryService) { }

  public ngOnInit() {
    this.bookForm.get("title").setValue(this.book.title);
    this.bookForm.get("author").setValue(this.representAuthors());
    this.bookForm.get("isbn").setValue(this.book.isbn);
    this.bookForm.get("read").setValue(this.book.read);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.bookForm.get("title").setValue(this.book.title);
    this.bookForm.get("author").setValue(this.representAuthors());
    this.bookForm.get("isbn").setValue(this.book.isbn);
    this.bookForm.get("read").setValue(this.book.read);
  }

  public onSubmit() {
    this.book.title = this.bookForm.get("title").value;
    this.book.authors = this.bookForm.get("author").value;
    this.book.isbn = this.bookForm.get("isbn").value;
    this.book.read = this.bookForm.get("read").value;
    this.libraryService.updateBook(this.book).subscribe();
  }

  public addBook() {
    this.libraryService.addBook(this.book).subscribe();
  }

  public removeBook() {
    this.libraryService.deleteBook(this.book).subscribe(() => this.remove.emit());
  }

  public openDialog(): void {

    if (!this.readonly) {
      const dialogRef = this.dialog.open(ImageDialogComponent, {
        width: '250px',
        data: { thumbnail: this.book.thumbnail }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.book.thumbnail = result;
      });
    }
  }

  // TODO: Remove when better representation is available
  private representAuthors(): String {
    var listOfAuthors: string = ''
    if (this.book.authors != null) {
      this.book.authors.forEach(author => {
        listOfAuthors = listOfAuthors + ' ' + author.name;
      });
    }
    return listOfAuthors;
  }
}
