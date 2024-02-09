import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { DialogLayoutComponent } from '../dialog-layout/dialog-layout.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lokacija } from '../../../types/user';
import axios from 'axios';
import { LocationResponse } from '../../../types/post';
import { MyConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogLayoutComponent,
  ],
  providers: [AuthService],
})
export class EditProfileDialogComponent {
  locations: Lokacija[] | undefined;
  isEmployee: boolean = false;

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getLocations();
    this.isEmployee = data.user.role === 'Employee';
  }

  editProfileForm: FormGroup = new FormGroup({
    about: new FormControl(this.data.user.about),
    phoneNumber: new FormControl(this.data.user.phoneNumber),
    workedAt: new FormControl(this.data.user.workedAt),
    universty: new FormControl(this.data.user.universty),
    location: new FormControl(this.data.user.location),
    owner: new FormControl(this.data.user.owner),
  });

  onSubmit = async () => {
    await this.auth.edit(this.editProfileForm.value);
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
