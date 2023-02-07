import { Component, OnInit } from "@angular/core";
import { Question } from "src/app/shared/models/questions.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { QuestionsService } from "src/app/shared/services/questions.service";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"],
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];

  constructor(
    private questionsService: QuestionsService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((data) => {
      this.questionsService.getQuestionByUserId(data.id).subscribe((data) => {
        this.questions = data;
      });
    });
  }
}
