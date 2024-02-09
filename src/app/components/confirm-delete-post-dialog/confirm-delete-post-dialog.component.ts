import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogLayoutComponent } from '../dialog-layout/dialog-layout.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-confirm-delete-post-dialog',
  standalone: true,
  templateUrl: './confirm-delete-post-dialog.component.html',
  styleUrl: './confirm-delete-post-dialog.component.css',
  imports: [CommonModule, DialogLayoutComponent],
})
export class ConfirmDeletePostDialogComponent {
  constructor(
    private dialogRef: DialogRef<ConfirmDeletePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private postService: PostService
  ) {}

  closeDialog = () => {
    this.dialogRef.close();
  };

  deletePost = async () => {
    await this.postService.delete(this.data.id);
    this.closeDialog();
  };
}
