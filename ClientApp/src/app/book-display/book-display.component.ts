import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from '../book';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnInit, OnChanges {


  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: [''],
    isbn: ['']
  })

  @Input() public book: Book;

  readonly = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.bookForm.get("title").setValue(this.book.title);
    this.bookForm.get("author").setValue(this.book.author);
    this.bookForm.get("isbn").setValue(this.book.isbn);
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  
  onSubmit() {
    console.warn(this.bookForm.value);
  }


  
}
