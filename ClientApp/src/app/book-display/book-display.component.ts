import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, Validators, Form } from '@angular/forms';
import { Book } from '../book';
import { LibraryService } from '../library.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Author } from '../author';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnInit, OnChanges {

  public bookForm = this.fb.group({
    title: ['', Validators.required],
    authors: this.fb.array([]),
    isbn: [''],
    read: [false]
  })

  get authors() {
    return this.bookForm.get('authors') as FormArray;
  }

  @Input() public book: Book;

  @Input() public readonly: boolean;

  @Output() public remove = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private libraryService: LibraryService) { }

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

  public onSubmit() {
    this.book.title = this.bookForm.get("title").value;
    this.updateAuthors();
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
  private representAuthors(): void {
    if (this.book.authors.length > 0) {
      this.book.authors.forEach(author => {
        this.authors.push(this.fb.control(author.name))
      });
    }
    else {
      this.authors.push(this.fb.control(''))
    }
  }

  private updateAuthors(): void {
    if (this.authors.controls.length >= this.book.authors.length) {
      for (let index = 0; index < this.authors.controls.length; index++) {
        if (this.book.authors[index] != null) {
          this.book.authors[index].name = this.authors.controls[index].value;
        } else {
          let newAuthor: Author = {
            name: this.authors.controls[index].value
          };
          this.book.authors.push(newAuthor);
        }
      }
    } else {
      for (let index = 0; index < this.book.authors.length; index++) {
        if (this.authors.controls[index] != null) {
          this.book.authors[index].name = this.authors.controls[index].value;
        } else {
          this.book.authors.splice(index, 1)
        }
      }
    }
  }
}
