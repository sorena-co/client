import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Post} from './post.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'post-create-dialog',
  templateUrl: 'post-create-dialog.html',
})
export class PostCreateDialogComponent {
  post: Post = new Post();
  files: string[] = [];
  imageUrl: any = '';

  constructor(
    public dialogRef: MatDialogRef<PostCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post) {
    this.post.title = 'asd';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i].name);
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (ev) => {
          this.imageUrl = reader.result;
        };
      }
    }
  }

}
