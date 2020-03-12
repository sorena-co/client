import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../security/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {Post} from '../entity/post/post.model';
import {PostCreateDialogComponent} from '../entity/post/post-create-dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLogin: boolean;
  post: Post;

  constructor(
    private tokenService: TokenStorageService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PostCreateDialogComponent, {
      width: '80%',
      height: '500px',
      direction: 'rtl',
      data: this.post
    });

    dialogRef.afterClosed().subscribe(result => {
      this.post = result;
    });
  }

}


