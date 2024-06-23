import { Component } from '@angular/core';
import { IReview, SocketService } from '../../service/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-thesis-viewer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './thesis-viewer.component.html',
  styleUrl: './thesis-viewer.component.scss'
})
export class ThesisViewerComponent {
  public reviews: IReview[] = [];
  public newReview: string = '';
  public reviewer: string = '';
  public thesisId: string = 'defaultRoom';

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.joinRoom(this.thesisId);
    this.socketService.getReviews().subscribe((reviews: any) => {
      this.reviews = reviews;
    });
  }

  public addReview(): void {
    if (this.newReview.trim()) {
      const review: IReview = {
        review: this.newReview,
        createdTime: new Date(),
        updatedTime: new Date(),
        from: this.reviewer,
        thesisId: this.thesisId
      };
      this.socketService.sendReview(review);
      this.newReview = '';
    }
  }

}
