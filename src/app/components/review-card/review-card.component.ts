import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { Review } from '../../../types/user';
import { MoreSvgComponent } from '../more-svg/more-svg.component';
import {
  NgClickOutsideDirective,
  NgClickOutsideExcludeDirective,
} from 'ng-click-outside2';
import { MatDialog } from '@angular/material/dialog';
import { EditReviewDialogComponent } from '../edit-review-dialog/edit-review-dialog.component';
import { ConfirmDeleteReviewDialogComponent } from '../confirm-delete-review-dialog/confirm-delete-review-dialog.component';

@Component({
  selector: 'app-review-card',
  standalone: true,
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
  imports: [
    CommonModule,
    StarRatingComponent,
    MoreSvgComponent,
    NgClickOutsideDirective,
    NgClickOutsideExcludeDirective,
  ],
})
export class ReviewCardComponent {
  @Input() review!: Review;
  @Input() menuIconVisible!: boolean;
  @Input() companyName: string = '';
  @Output() afterChange = new EventEmitter();
  menuVisible: boolean = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.review);
  }

  openEditDialog = () => {
    const dialogRef = this.dialog.open(EditReviewDialogComponent, {
      data: { review: this.review },
    });

    dialogRef.afterClosed().subscribe(() => this.afterChange.emit());
  };

  openDeleteModal = () => {
    const dialogRef = this.dialog.open(ConfirmDeleteReviewDialogComponent, {
      data: { reviewId: this.review.id },
    });

    dialogRef.afterClosed().subscribe(() => this.afterChange.emit());
  };
}
