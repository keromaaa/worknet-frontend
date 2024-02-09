import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogLayoutComponent } from '../dialog-layout/dialog-layout.component';
import { CreateReviewRequest } from '../../../types/user';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-review-dialog',
  standalone: true,
  templateUrl: './create-review-dialog.component.html',
  styleUrl: './create-review-dialog.component.css',
  imports: [
    CommonModule,
    DialogLayoutComponent,
    StarRatingComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CreateReviewDialogComponent {
  rating: number | null = null;
  reviewForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
  });

  constructor(
    private dialogRef: DialogRef<CreateReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private auth: AuthService
  ) {}

  onSubmit = async () => {
    this.reviewForm.markAllAsTouched();
    this.reviewForm.get('title')?.markAsDirty();
    this.reviewForm.get('content')?.markAsDirty();

    if (this.rating && this.reviewForm.valid) {
      const params: CreateReviewRequest = {
        ...this.reviewForm.value,
        companyId: this.data.companyId,
        rating: this.rating,
      };

      await this.auth.addReview(params);
      this.dialogRef.close();
    }
  };

  changeRating = (rating: number) => {
    this.rating = rating;
  };

  displayTitleError = (): boolean => {
    const titleControl = this.reviewForm.get('title');

    if (
      titleControl?.touched &&
      titleControl?.dirty &&
      titleControl?.errors?.['required']
    )
      return true;

    return false;
  };

  displayContentError = (): boolean => {
    const contentControl = this.reviewForm.get('content');

    if (
      contentControl?.touched &&
      contentControl?.dirty &&
      contentControl?.errors?.['required']
    )
      return true;

    return false;
  };
}
