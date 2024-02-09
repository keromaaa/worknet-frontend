import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../page-layout/page-layout.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SkillSelectComponent } from '../skill-select/skill-select.component';
import { AuthService } from '../../services/auth.service';
import axios from 'axios';
import {
  EmploymentType,
  EmploymentTypeResponse,
  IndustriesResponse,
  Industry,
  LocationResponse,
  PostCreateRequest,
} from '../../../types/post';
import { MyConfig } from '../../app.config';
import { Lokacija } from '../../../types/user';
import {
  dateValidator,
  industryValidator,
  locationValidator,
  typeValidator,
} from './new-post-validators';
import { Title } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
  imports: [
    CommonModule,
    PageLayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SkillSelectComponent,
  ],
  providers: [PostService],
})
export class NewPostComponent {
  locations: Lokacija[] | undefined;
  industries: Industry[] | undefined;
  employmentTypes: EmploymentType[] | undefined;

  deadlineError: string = '';

  newPostForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    location: new FormControl('', locationValidator),
    date: new FormControl(null, [Validators.required, dateValidator]),
    industry: new FormControl(null, [Validators.required, industryValidator]),
    employmentType: new FormControl(null, [Validators.required, typeValidator]),
    // link: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern('^(https?|ftp)://[^s/$.?#].[^s]*$'),
    // ]),
  });

  constructor(public postService: PostService) {
    this.getLocations();
    this.getIndustries();
    this.getEmploymentTypes();
  }

  onSubmit() {
    const form = this.newPostForm;
    if (form.valid) {
      const postRequest: PostCreateRequest = form.value;
      let response = this.postService.create(postRequest);
    } else {
      form.markAllAsTouched();
    }
  }

  onLocationSelect = () => {
    const location: Lokacija = this.newPostForm.get('location')?.value;
    console.log(location);
  };

  onIndustrySelect = () => {
    const industry: Industry = this.newPostForm.get('industry')?.value;
    console.log(industry);
  };

  onTypeSelect = () => {
    const type: EmploymentType = this.newPostForm.get('employmentType')?.value;
    console.log(type);
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

  displayTitleError = () => {
    const titleControl = this.newPostForm.get('title');

    if (titleControl?.errors?.['required'] && titleControl?.touched) {
      return true;
    }

    return false;
  };

  displayDescriptionError = () => {
    const contentControl = this.newPostForm.get('content');

    if (contentControl?.errors?.['required'] && contentControl?.touched) {
      return true;
    }

    return false;
  };

  displayLocationError = () => {
    const locationControl = this.newPostForm.get('location');

    if (locationControl?.errors?.['selected'] && locationControl?.touched) {
      return true;
    }

    return false;
  };

  displayDateError = () => {
    const dateControl = this.newPostForm.get('date');

    if (dateControl?.errors?.['required'] && dateControl?.touched) {
      this.deadlineError = 'Application deadline is required.';
      return true;
    }

    if (dateControl?.errors?.['invalid'] && dateControl?.touched) {
      this.deadlineError =
        'Application deadline has to be at least one week removed from today.';
      return true;
    }

    return false;
  };

  displayIndustryError = () => {
    const industryControl = this.newPostForm.get('industry');

    if (industryControl?.errors?.['required'] && industryControl?.touched) {
      return true;
    }

    if (industryControl?.errors?.['invalid'] && industryControl?.touched) {
      return true;
    }

    return false;
  };

  displayTypeError = () => {
    const typeControl = this.newPostForm.get('employmentType');

    if (typeControl?.errors?.['required'] && typeControl?.touched) {
      return true;
    }

    if (typeControl?.errors?.['invalid'] && typeControl?.touched) {
      return true;
    }

    return false;
  };
}
