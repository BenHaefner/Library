import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../models/book';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {

  /**
   * A form to contain the data entered for the thumbnail url
   */
  public thumbnailForm = this.fb.group({
    thumbnail: ['']
  })

  /**
   * A function that works as the constructor for ImageDialogComponent.
   * 
   * @param fb A FormBuilder to easily build forms.
   * @param dialogRef A MatDialogReference which references the open dialog. 
   * @param data An object of type any which holds data passed to the dialog.
   */
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }

  public ngOnInit() {
  }

  /**
   * A function to exit the dialog box, and cancel any edits 
   * being made.
   */
  public onNvmClick(): void {
    this.dialogRef.close(this.data.thumbnail);
  }

  /**
   * A function ot exit the dialog, and follow through with any
   * edits being made.
   */
  public onOkClick(url: string): void {
    this.dialogRef.close(this.thumbnailForm.get("thumbnail").value);
  }
}
