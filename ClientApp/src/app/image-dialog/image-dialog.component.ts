import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../book';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {

  public thumbnailForm = this.fb.group({
    thumbnail: ['']
  })

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }

  public ngOnInit() {
  }

  public onNvmClick(): void {
    this.dialogRef.close(this.data.thumbnail);
  }

  public onOkClick(url: string): void {
    this.dialogRef.close(this.thumbnailForm.get("thumbnail").value);
  }
}
