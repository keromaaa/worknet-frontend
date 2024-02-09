import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../page-layout/page-layout.component';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { SkillSelectComponent } from '../skill-select/skill-select.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../types/user';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { JobCardComponent } from '../job-card/job-card.component';
import { LoaderComponent } from '../loader/loader.component';
import { UserService } from '../../services/user.service';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { CreateReviewDialogComponent } from '../create-review-dialog/create-review-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [AuthService],
  imports: [
    CommonModule,
    PageLayoutComponent,
    ReviewCardComponent,
    SkillSelectComponent,
    JobCardComponent,
    LoaderComponent,
  ],
})
export class ProfileComponent {
  profile: User | null = null;
  isCurrentUser: boolean = false;
  currentUserId: number | undefined;
  isCompany: boolean = false;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];

    await this.auth.verifyToken();

    this.currentUserId = this.auth.getId();

    if (id == this.currentUserId) {
      this.profile = this.auth.getUser();
      this.isCurrentUser = true;
    } else {
      this.profile = (await this.userService.get(id)) as User;
    }

    this.isCompany = this.profile?.role === 'Company';

    console.log(this.profile);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  openEditModal = () => {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: { user: this.profile },
    });

    dialogRef.afterClosed().subscribe(() => this.ngOnInit());
  };

  openReviewModal = () => {
    const dialogRef = this.dialog.open(CreateReviewDialogComponent, {
      data: { companyId: this.profile?.id },
    });
    dialogRef.afterClosed().subscribe(() => this.ngOnInit());
  };
}
