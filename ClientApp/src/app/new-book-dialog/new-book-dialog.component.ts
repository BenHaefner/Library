import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LibraryService } from '../library.service';
import { Book } from '../models/book';
import { Wrapper } from './wrapper';
import { Author } from '../models/author';

@Component({
  selector: 'app-new-book-dialog',
  templateUrl: './new-book-dialog.component.html',
  styleUrls: ['./new-book-dialog.component.css']
})
export class NewBookDialogComponent implements OnInit {

  public bookForm = this.fb.group({
    title: ['', Validators.required],
    authors: this.fb.array([
      this.fb.control('')
    ]),
    isbn: [''],
    thumbnail: [''],
    read: [false]
  })

  public get authors() {
    return this.bookForm.get('authors') as FormArray;
  }

  constructor(
    private libraryService: LibraryService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewBookDialogComponent>) {
    dialogRef.disableClose = true;
  }

  public ngOnInit() {
  }

  public onNvmClick(): void {
    let wrapper: Wrapper = {
      hasBook: false
    }
    this.dialogRef.close(wrapper);
  }

  public onOkClick(): void {
    let authorList: Author[] = [];

    this.authors.controls.forEach(author => {
      if (author.value != null && author.value.length > 0) {
        let newAuthor: Author = {
          name: author.value
        }
        authorList.push(newAuthor);
      }
    })

    let book: Book = {
      title: this.bookForm.get("title").value,
      authors: authorList,
      isbn: this.bookForm.get("isbn").value,
      thumbnail: this.bookForm.get("thumbnail").value,
      read: false,
    };

    let wrapper: Wrapper = {
      hasBook: true,
      book: book
    }

    this.dialogRef.close(wrapper);
  }

  public removeAuthor(index: number): void {
    this.authors.controls.splice(index, 1);
  }

  public addAuthor(): void {
    this.authors.controls.push(this.fb.control(''));
  }
}
