import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IThesis } from '../../service/thesis.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateThesisDialogComponent } from '../../dialogs/create-thesis-dialog/create-thesis-dialog.component';
import { ProgressButtonComponent } from '../progress-button/progress-button.component';


@Component({
  selector: 'app-thesis-list',
  standalone: true,
  imports: [
    CommonModule,
    ProgressButtonComponent
  ],
  templateUrl: './thesis-list.component.html',
  styleUrl: './thesis-list.component.scss'
})
export class ThesisListComponent {
  public thesisList: IThesis[] = [];
  constructor(
    public router: Router,
    public matDialog: MatDialog
  ) {

  }

  public handleOnReview(thesis: IThesis): void {
    this.router.navigate([`/thesis`])
  }

  public handleOnCreateThesis(): void {
    console.log("handleOnCreateThesis")
    this.matDialog.open(CreateThesisDialogComponent,{
      width:"50%"
    })
  }

}
