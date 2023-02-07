import { Component, OnInit, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Question } from "src/app/shared/models/questions.model";
import { QuestionsService } from "src/app/shared/services/questions.service";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  @Input() questions: Question[] = [];

  updatedQuestion: Question;

  constructor(
    private modalService: NgbModal,
    private questionService: QuestionsService
  ) {}

  ngOnInit() {}

  open(content, question) {
    this.updatedQuestion = question;
    this.updatedQuestion.userId = question.user.id;
    this.updatedQuestion.role = question.user.type;
    this.modalService
      .open(content, { ariaLabelledBy: "Question Update" })
      .result.then((result) => console.log(result));
  }

  onSubmit() {
    console.log("submited", this.updatedQuestion);
    this.questionService
      .update(this.updatedQuestion)
      .subscribe((data) => console.log(data));
  }

  onRemove(id: number) {
    this.questions = this.questions.filter((q) => q.id != id);
    this.questionService.delete(id).subscribe((data) => console.log(data));
  }
}
