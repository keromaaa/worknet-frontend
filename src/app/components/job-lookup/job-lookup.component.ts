import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { PageLayoutComponent } from '../page-layout/page-layout.component';
import axios from 'axios';
import { MyConfig } from '../../app.config';
import { JobCardComponent } from '../job-card/job-card.component';
import {
  EmploymentType,
  EmploymentTypeResponse,
  IndustriesResponse,
  Industry,
  LocationResponse,
  Post,
  PostSearchRequest,
} from '../../../types/post';
import { Lokacija } from '../../../types/user';
import { LoaderComponent } from '../loader/loader.component';
import { NextPageSvgComponent } from '../next-page-svg/next-page-svg.component';
import { PreviousPageSvgComponent } from '../previous-page-svg/previous-page-svg.component';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-job-lookup',
  standalone: true,
  templateUrl: './job-lookup.component.html',
  styleUrl: './job-lookup.component.css',
  imports: [
    CommonModule,
    PageLayoutComponent,
    JobCardComponent,
    LoaderComponent,
    FormsModule,
    NextPageSvgComponent,
    PreviousPageSvgComponent,
  ],
})
export class JobLookupComponent {
  industries: Industry[] | undefined;
  locations: Lokacija[] | undefined;
  employmentTypes: EmploymentType[] | undefined;
  jobs: Post[] | undefined;
  loading: boolean = true;

  searchSubject = new Subject<PostSearchRequest>();

  pages: number = 0;

  jobTitle: string = '';
  company: string = '';
  industry: string = '';
  location: string = '';
  employmentType: string = '';
  popular: boolean = false;
  page: number = 1;

  constructor(private postService: PostService) {
    this.getJobs();
    this.getIndustries();
    this.getLocations();
    this.getEmploymentTypes();
  }

  async ngOnInit() {
    this.searchSubject.pipe(debounceTime(300)).subscribe(async (params) => {
      await this.performSearch(params);
    });
  }

  onSearch = () => {
    const params: PostSearchRequest = {
      jobTitle: this.jobTitle.length ? this.jobTitle : null,
      company: this.company.length ? this.company : null,
      industry: this.industry.length ? this.industry : null,
      location: this.location.length ? this.location : null,
      employmentType: this.employmentType.length ? this.employmentType : null,
      popular: this.popular,
      page: 1,
      perPage: 10,
    };

    console.log(params);

    this.page = 1;

    this.searchSubject.next(params);
  };

  performSearch = async (params: PostSearchRequest) => {
    const response = await this.postService.search(params);
    console.log(response);
    this.pages = response.totalPages;
    this.jobs = response.data;
  };

  getJobs = async () => {
    this.loading = true;

    const params: PostSearchRequest = {
      jobTitle: null,
      company: null,
      industry: null,
      location: null,
      employmentType: null,
      popular: false,
      page: 1,
      perPage: 10,
    };

    const response = await this.postService.search(params);

    console.log(response);

    this.jobs = response.data;
    this.pages = response.totalPages;

    this.loading = false;
  };

  getIndustries = async () => {
    const { data } = await axios.get<IndustriesResponse>(
      MyConfig.server_address + '/Industry/GetAll'
    );

    if (data.success) {
      this.industries = data.data;
    } else {
      console.error(data.message);
    }
  };

  getLocations = async () => {
    const { data } = await axios.get<LocationResponse>(
      MyConfig.server_address + '/Location/GetAll'
    );

    if (data.success) {
      this.locations = data.data;
    } else {
      console.error(data.message);
    }
  };

  getEmploymentTypes = async () => {
    const { data } = await axios.get<EmploymentTypeResponse>(
      MyConfig.server_address + '/EmploymentType/GetAll'
    );

    if (data.success) {
      this.employmentTypes = data.data;
    } else {
      console.error(data.message);
    }
  };

  clearFilters() {
    this.jobTitle = '';
    this.company = '';
    this.industry = '';
    this.location = '';
    this.employmentType = '';
    this.popular = false;

    this.getJobs();
  }

  handleNextPageClick = async () => {
    if (this.page < this.pages) {
      this.page++;

      const params: PostSearchRequest = {
        jobTitle: this.jobTitle.length ? this.jobTitle : null,
        company: this.company.length ? this.company : null,
        industry: this.industry.length ? this.industry : null,
        location: this.location.length ? this.location : null,
        employmentType: this.employmentType.length ? this.employmentType : null,
        popular: this.popular,
        page: this.page,
        perPage: 10,
      };

      await this.performSearch(params);
    }
  };

  handlePreviousPageClick = async () => {
    if (this.page > 1) {
      this.page--;

      const params: PostSearchRequest = {
        jobTitle: this.jobTitle.length ? this.jobTitle : null,
        company: this.company.length ? this.company : null,
        industry: this.industry.length ? this.industry : null,
        location: this.location.length ? this.location : null,
        employmentType: this.employmentType.length ? this.employmentType : null,
        popular: this.popular,
        page: this.page,
        perPage: 10,
      };

      await this.performSearch(params);
    }
  };
}
