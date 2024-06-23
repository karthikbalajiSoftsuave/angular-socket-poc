import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ProgressButtonComponent } from '../../components/progress-button/progress-button.component';
import { IThesis, ThesisService } from '../../service/thesis.service';


@Component({
  selector: 'app-create-thesis-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    ProgressButtonComponent,
    MatInputModule,
    CommonModule
  ],
  providers: [

  ],
  templateUrl: './create-thesis-dialog.component.html',
  styleUrl: './create-thesis-dialog.component.scss'
})

export class CreateThesisDialogComponent implements OnInit {

  public thesisForm!: FormGroup;
  public cancelBtnName: string = "Cancel";
  public defaultValue!: IThesis;
  public formLoading: boolean = false;
  public fileName!: string;
  @ViewChild('fileupload') fileUploadRef!: ElementRef<HTMLInputElement>;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateThesisDialogComponent>,
    public thesisService: ThesisService,
    @Inject(MAT_DIALOG_DATA) public data: IThesis
  ) { }

  ngOnInit(): void {
    this.thesisForm = this.formBuilder.group({
      name: new FormControl(this.data?.name || '', [Validators.required, Validators.pattern(this.thesisService?.regex.whitespace)]),
      author: new FormControl(this.data?.author || '', [Validators.required, Validators.pattern(this.thesisService?.regex.whitespace)]),
      file: new FormControl(this.data?.file || '', [Validators.required]),
    })
  }

  public save() {
    this.thesisForm?.markAllAsTouched();
    if (Object.values(this.thesisForm?.controls)?.every((field) => !field?.errors)) {
      this.formLoading = true;
      this.thesisService?.[this.data ? "updateThesis" : "createThesis"]({
        ...this.thesisForm.value,
        ...(this.data && { _id: this?.data?._id })
      }).subscribe({
        next: (data) => {
          console.log("data", data);
          this.dialogRef.close();
        },
        error: (err) => {

        },
        complete: () => {
          this.formLoading = false;
        }
      });


    }
  }

  public cancelEdit(): void {
    this.dialogRef.close()
  }

  public handleOnFileChange(event: any): void {
    this.thesisForm.get("file")?.setValue(event);
    this.fileName = event?.target?.files[0]?.name
    console.log("Event", event?.target?.files[0])
  }

  public handleOnOpenFile(): void {
    this.fileUploadRef.nativeElement.click();
  }
}