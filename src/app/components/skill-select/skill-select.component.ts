import { ChangeDetectorRef, Component, Input, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-skill-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-select.component.html',
  styleUrl: './skill-select.component.css',
})
export class SkillSelectComponent {
  @Input() skills: string[] | null = null;
  @Input() isCurrentUser: boolean = false;

  addingSkill: boolean = false;
  newSkill: string = '';

  constructor(private auth: AuthService, private zone: NgZone) {}

  onSubmit = async () => {
    await this.auth.addSkill(this.newSkill);

    this.zone.run(() => {
      this.skills = this.skills || [];
      this.skills.push(this.newSkill);
      this.closeInput();
    });
  };

  closeInput = () => {
    this.addingSkill = false;
    this.newSkill = '';
  };

  deleteSkill = async (skill: string) => {
    await this.auth.deleteSkill(skill);
    this.zone.run(() => {
      this.skills = this.skills || [];
      const index = this.skills.indexOf(skill);
      if (index !== -1) {
        this.skills.splice(index, 1);
      }
      this.closeInput();
    });
  };
}
