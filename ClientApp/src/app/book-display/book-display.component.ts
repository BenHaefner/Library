import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from '../book';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnInit, OnChanges {

  public bookForm = this.fb.group({
    title: ['', Validators.required],
    author: [''],
    isbn: ['']
  })

  @Input() public book: Book;

  @Input() public readonly: boolean;

  constructor(private fb: FormBuilder) { }

  public ngOnInit() {
    this.bookForm.get("title").setValue(this.book.title);
    this.bookForm.get("author").setValue(this.book.author);
    this.bookForm.get("isbn").setValue(this.book.isbn);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.bookForm.get("title").setValue(this.book.title);
    this.bookForm.get("author").setValue(this.book.author);
    this.bookForm.get("isbn").setValue(this.book.isbn);
  }
  
  public onSubmit() {
    console.warn(this.bookForm.value);
  }
}
