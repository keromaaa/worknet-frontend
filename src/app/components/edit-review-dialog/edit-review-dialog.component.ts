import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogLayoutComponent } from '../dialog-layout/dialog-layout.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { EditReviewRequest, Review } from '../../../types/user';

@Component({
  selector: 'app-edit-review-dialog',
  standalone: true,
  templateUrl: './edit-review-dialog.component.html',
  styleUrl: './edit-review-dialog.component.css',
  imports: [
    CommonModule,
    DialogLayoutComponent,
    StarRatingComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EditReviewDialogComponent {
  rating: number | null = null;

  constructor(
    private dialogRef: DialogRef<EditReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private auth: AuthService
  ) {}

  reviewForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.review.title),
    content: new FormControl(this.data.review.content),
  });

  ngOnInit() {
    this.rating = this.data.review.rating as number;
  }

  onSubmit = async () => {
    const params: EditReviewRequest = {
      ...this.reviewForm.value,
      rating: this.data.review.rating,
    };

    await this.auth.editReview(this.data.review.id as number, params);
    this.dialogRef.close();
  };

  changeRating = (rating: number) => {
    this.rating = rating;
  };
}
