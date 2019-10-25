import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from '../book';
import { LibraryService } from '../library.service';

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

  constructor(
    private fb: FormBuilder, 
    private libraryService: LibraryService) { }

  public ngOnInit() {
    this.bookForm.get("title").setValue(this.book.title);
    this.bookForm.get("author").setValue(this.book.author);
    this.bookForm.get("isbn").setValue(this.book.isbn);
    this.bookForm.get("read").setValue(this.book.read);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.bookForm.get("title").setValue(this.book.title);
    this.bookForm.get("author").setValue(this.book.author);
    this.bookForm.get("isbn").setValue(this.book.isbn);
    this.bookForm.get("read").setValue(this.book.read);
  }
  
  public onSubmit() {
    this.book.title = this.bookForm.get("title").value;
    this.book.author = this.bookForm.get("author").value;
    this.book.isbn = this.bookForm.get("isbn").value;
    this.book.read = this.bookForm.get("read").value;
    this.libraryService.updateBook(this.book).subscribe();
  }

  public addBook() {
    this.libraryService.addBook(this.book).subscribe();
  }
  
}
