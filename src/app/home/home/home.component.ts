import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MDNAnswers } from "src/app/shared/models/questions.model";
import { NotificationService } from "src/app/shared/services/notification.service";
import { QuestionsService } from "src/app/shared/services/questions.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  displayAnswers: boolean = false;
  answers: MDNAnswers[] = [];
  sub!: Subscription;

  constructor(
    private questionService: QuestionsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  onSubmit(value: { displayAnswers: boolean; tags: string; question: string }) {
    this.displayAnswers = value.displayAnswers;

    this.fetchAnswersFromMdnAndStackoverflow(value.tags, value.question);
  }

  newQuestion() {
    this.displayAnswers = false;
  }

  fetchAnswersFromMdnAndStackoverflow(tags: string, question: string) {
    this.sub = this.questionService
      .fetchResourceFromStackOverFlow(tags, question)
      .subscribe({
        next: ({ items }) => (this.answers = items),
        error: (err) =>
          this.notificationService.error("Something went wrong ", err),
      });
  }

  ngOnDestroy(): void {
    console.log("Destroying home component");

    if (this.sub) this.sub.unsubscribe();
  }
}
