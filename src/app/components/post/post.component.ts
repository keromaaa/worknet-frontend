import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../page-layout/page-layout.component';
import { Post } from '../../../types/post';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Observable, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';
import { ConfirmDeletePostDialogComponent } from '../confirm-delete-post-dialog/confirm-delete-post-dialog.component';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  imports: [CommonModule, PageLayoutComponent, RouterLink],
})
export class PostComponent {
  post: Post | void | null = null;

  isCurrentUser: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: PostService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getPost();

    if (!this.isCurrentUser) this.service.addView(this.post?.id ?? 0);
  }

  getPost = async () => {
    const id = this.route.snapshot.params['id'];
    await this.auth.verifyToken();
    const userId = await this.auth.getId();
    this.post = await this.service.get(id);
    if (this.post?.companyId === userId) {
      this.isCurrentUser = true;
    } else this.isCurrentUser = false;
    console.log(this.isCurrentUser);
  };

  openEditModal = () => {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      data: { post: this.post },
    });
    dialogRef.afterClosed().subscribe(() => this.getPost());
  };

  openDeleteModal = () => {
    this.dialog.open(ConfirmDeletePostDialogComponent, {
      data: { id: this.post?.id },
    });
  };
}
