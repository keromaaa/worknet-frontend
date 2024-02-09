import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../page-layout/page-layout.component';
import { JobCardComponent } from '../job-card/job-card.component';
import { MyConfig } from '../../app.config';
import axios from 'axios';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, JobCardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  posts: any = null;

  constructor(private postService: PostService) {}

  async ngOnInit() {
    this.posts = await this.postService.getTopPosts();
  }
}
