import { Component, OnInit, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { Question } from "src/app/shared/models/questions.model";
import { NotificationService } from "src/app/shared/services/notification.service";
import { QuestionsService } from "src/app/shared/services/questions.service";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  @Input() questions: Question[] = [];

  questionToUpdate: Question;

  sub!: Subscription;

  constructor(
    private modalService: NgbModal,
    private questionService: QuestionsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  open(content, question) {
    this.questionToUpdate = question;
    this.questionToUpdate.userId = question.user.id;
    this.questionToUpdate.role = question.user.type;
    console.log(question);

    this.modalService
      .open(content, { ariaLabelledBy: "Question Update" })
      .result.then((result) => console.log(result));
  }

  onSubmit() {
    this.sub = this.questionService.update(this.questionToUpdate).subscribe({
      next: (data) => console.log("Updating question", data),
      error: (err) =>
        this.notificationService.error("Something went wrong ", err),
    });
  }

  onRemove(id: number) {
    this.questions = this.questions.filter((q) => q.id != id);
    this.sub = this.questionService.delete(id).subscribe({
      next: (data) => console.log("Deleting a question", data),
      error: (err) =>
        this.notificationService.error("Something went wrong ", err),
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
