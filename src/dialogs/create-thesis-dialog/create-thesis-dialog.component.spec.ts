import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateThesisDialogComponent } from './create-thesis-dialog.component';

describe('CreateThesisDialogComponent', () => {
  let component: CreateThesisDialogComponent;
  let fixture: ComponentFixture<CreateThesisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateThesisDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateThesisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
