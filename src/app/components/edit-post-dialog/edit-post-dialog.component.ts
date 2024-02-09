import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogLayoutComponent } from '../dialog-layout/dialog-layout.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Lokacija } from '../../../types/user';
import axios from 'axios';
import { LocationResponse, Post } from '../../../types/post';
import { MyConfig } from '../../app.config';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post-dialog',
  standalone: true,
  templateUrl: './edit-post-dialog.component.html',
  styleUrl: './edit-post-dialog.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogLayoutComponent,
  ],
})
export class EditPostDialogComponent {
  defaultDate: Date = new Date(this.data.post.date);

  locations: Lokacija[] | undefined;

  editPostForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.post.title),
    content: new FormControl(this.data.post.content),
    date: new FormControl(new Date(this.defaultDate)),
    location: new FormControl(this.data.post.location),
  });

  constructor(
    private dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.data.post);
    this.getLocations();
  }

  onSubmit = async () => {
    await this.postService.edit(this.data.post.id, this.editPostForm.value);
    this.dialogRef.close();
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
}
