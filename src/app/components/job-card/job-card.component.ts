import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from '../../../types/post';

@Component({
  selector: 'app-job-card',
  standalone: true,
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
  imports: [CommonModule, RouterLink],
})
export class JobCardComponent {
  @Input() post: Post | null = null;
  @Input() companyName: string | null = null;
}
