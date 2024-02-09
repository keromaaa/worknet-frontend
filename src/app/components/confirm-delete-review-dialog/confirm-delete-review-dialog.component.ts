import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogLayoutComponent } from '../dialog-layout/dialog-layout.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirm-delete-review-dialog',
  standalone: true,
  templateUrl: './confirm-delete-review-dialog.component.html',
  styleUrl: './confirm-delete-review-dialog.component.css',
  imports: [CommonModule, DialogLayoutComponent],
})
export class ConfirmDeleteReviewDialogComponent {
  constructor(
    private dialogRef: DialogRef<ConfirmDeleteReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private auth: AuthService
  ) {}

  closeDialog = () => {
    this.dialogRef.close();
  };

  deletePost = async () => {
    await this.auth.deleteReview(this.data.reviewId);
    this.closeDialog();
  };
}
