import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LibraryService } from '../library.service';
import { Book } from '../models/book';
import { Wrapper } from '../models/wrapper';
import { Author } from '../models/author';

@Component({
  selector: 'app-new-book-dialog',
  templateUrl: './new-book-dialog.component.html',
  styleUrls: ['./new-book-dialog.component.css']
})
export class NewBookDialogComponent implements OnInit {

  /**
   * A form to contain any data entered for the newly created book. 
   * Includes a form array so more than one author entry may be made.
   */
  public bookForm = this.fb.group({
    title: ['', Validators.required],
    authors: this.fb.array([
      this.fb.control('')
    ]),
    isbn: [''],
    thumbnail: [''],
    read: [false]
  })

  /**
   * Get method to easily retrieve authors data form array from bookForm.
   */
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

  /**
   * A function to exit the dialog box, and cancel any edits 
   * being made.
   */
  public onNvmClick(): void {
    // Create a wrapper that indicates to the parent no book was created.
    let wrapper: Wrapper = {
      hasBook: false
    }
    // Close the dialof and send wrapper to the parent.
    this.dialogRef.close(wrapper);
  }

  /**
   * A function ot exit the dialog, and follow through with any
   * edits being made.
   */
  public onOkClick(): void {
    // Create list of Authors to be added to the book to be added
    let authorList: Author[] = [];
    // Iteration over form array controls to check if there is any
    // data to be added to the authorList.
    this.authors.controls.forEach(author => {
      if (author.value != null && author.value.length > 0) {
        let newAuthor: Author = {
          name: author.value
        }
        authorList.push(newAuthor);
      }
    })
    // Create a book to be added from the specified data.
    let book: Book = {
      title: this.bookForm.get("title").value,
      authors: authorList,
      isbn: this.bookForm.get("isbn").value,
      thumbnail: this.bookForm.get("thumbnail").value,
      read: false,
    };
    // Create a wrapper containing a book, and an indicator to the parent
    // that a book has been created and is in this wrapper .
    let wrapper: Wrapper = {
      hasBook: true,
      book: book
    }
    // Close this dialog and send wrapper to the parent.
    this.dialogRef.close(wrapper);
  }

  /**
   * A function to remove a form control from the form array "authors".
   * 
   * @param index The index of the form control to be removed from
   * the form array.
   */
  public removeAuthor(index: number): void {
    this.authors.controls.splice(index, 1);
  }

  /**
   * A function to add a form control to the form array "authors".
   */
  public addAuthor(): void {
    this.authors.controls.push(this.fb.control(''));
  }
}
