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

  questionToUpdate: Question;

  constructor(
    private modalService: NgbModal,
    private questionService: QuestionsService
  ) {}

  ngOnInit() {}

  open(content, question: Question) {
    this.questionToUpdate = question;
    this.questionToUpdate.role = question.user.type;
    console.log(question);

    this.modalService
      .open(content, { ariaLabelledBy: "Question Update" })
      .result.then((result) => console.log(result));
  }

  onSubmit() {
    this.questionService
      .update(this.questionToUpdate)
      .subscribe((data) => console.log(data));
  }

  onRemove(id: number) {
    this.questions = this.questions.filter((q) => q.id != id);
    this.questionService.delete(id).subscribe((data) => console.log(data));
  }
}
