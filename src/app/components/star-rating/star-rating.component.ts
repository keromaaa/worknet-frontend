import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() rated!: boolean;
  @Output() onSelect = new EventEmitter<number>();
  hoveredIndex: number | null = null;

  onStarHover(index: number): void {
    if (!this.rated) this.hoveredIndex = index;
  }

  onStarLeave(): void {
    if (!this.rated) this.hoveredIndex = null;
  }

  onStarClick(index: number): void {
    if (!this.rated) {
      this.rating = index + 1;
      this.onSelect.emit(this.rating);
    }
  }
}
