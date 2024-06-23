import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisViewerComponent } from './thesis-viewer.component';

describe('ThesisViewerComponent', () => {
  let component: ThesisViewerComponent;
  let fixture: ComponentFixture<ThesisViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThesisViewerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ThesisViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
