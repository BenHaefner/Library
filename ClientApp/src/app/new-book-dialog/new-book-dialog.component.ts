import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LibraryService } from '../library.service';
import { Book } from '../book';

@Component({
  selector: 'app-new-book-dialog',
  templateUrl: './new-book-dialog.component.html',
  styleUrls: ['./new-book-dialog.component.css']
})
export class NewBookDialogComponent implements OnInit {

  public bookForm = this.fb.group({
    title: ['', Validators.required],
    author: [''],
    isbn: [''],
    thumbnail: [''],
    read: [false]
  })

  constructor(
    private libraryService: LibraryService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewBookDialogComponent>) { 
      dialogRef.disableClose = true;
    }

  public ngOnInit() {
  }

  public onNvmClick(): void {
    this.dialogRef.close();
  }

  public onOkClick(): void {
    let book: Book = {
      title: this.bookForm.get("title").value,
      author: this.bookForm.get("author").value,
      isbn: this.bookForm.get("isbn").value,
      thumbnail: this.bookForm.get("thumbnail").value,
      read: false,
    };

    this.dialogRef.close(this.libraryService.addBook(book).subscribe());
  }
}
