import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Book } from '../models/book';
import { MatDialog } from '@angular/material/dialog';
import { NewBookDialogComponent } from '../new-book-dialog/new-book-dialog.component';
import { Wrapper } from '../new-book-dialog/wrapper';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public books: Book[]

  constructor(
    public dialog: MatDialog,
    private libraryService: LibraryService) { }

  public ngOnInit() {
    this.getLibrary()
  }

  private getLibrary(): void {
    this.libraryService.getLibrary().subscribe(books => this.books = books);
  }

  public removeBook(book: Book): void {
    this.books = this.books.filter(b => b !== book);
  }

  public openDialog(): void {

    const dialogRef = this.dialog.open(NewBookDialogComponent, {
      width: '300px',
      data: {}
    });

    var wrapper: Wrapper;

    dialogRef.afterClosed().subscribe(result => {
      wrapper = result as Wrapper;
      if (wrapper.hasBook) {
        this.libraryService.addBook(wrapper.book).subscribe(() => this.getLibrary())
      }
    });


  }
}
