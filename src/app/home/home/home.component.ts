import { Component, OnInit } from "@angular/core";
import { MDNAnswers } from "src/app/shared/models/questions.model";
import { QuestionsService } from "src/app/shared/services/questions.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  displayAnswers: boolean = false;
  answers: MDNAnswers[] = [];

  constructor(private questionService: QuestionsService) {}

  ngOnInit() {}

  onSubmit(value: { displayAnswers: boolean; tags: string; question: string }) {
    this.displayAnswers = value.displayAnswers;

    this.fetchAnswersFromMdnAndStackoverflow(value.tags, value.question);
  }

  newQuestion() {
    this.displayAnswers = false;
  }

  fetchAnswersFromMdnAndStackoverflow(tags: string, question: string) {
    this.questionService
      .fetchResourceFromStackOverFlow(tags, question)
      .subscribe((data) => (this.answers = data.items));
  }
}
