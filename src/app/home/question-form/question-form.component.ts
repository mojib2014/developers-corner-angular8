import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { displayAnswersEvent } from "src/app/shared/models/questions.model";

import { AuthService } from "src/app/shared/services/auth.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { QuestionsService } from "src/app/shared/services/questions.service";

@Component({
  selector: "app-question-form",
  templateUrl: "./question-form.component.html",
  styleUrls: ["./question-form.component.css"],
})
export class QuestionFormComponent implements OnInit {
  questionForm!: FormGroup;
  displayAnswers: boolean = false;
  currentUserId: number = 0;
  @Output() displayAnswersEvent = new EventEmitter<displayAnswersEvent>();

  authSub!: Subscription;
  questionSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private questionService: QuestionsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.questionForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      role: ["", [Validators.required]],
      tags: ["", Validators.required],
      question: ["", Validators.required],
      userId: [],
    });

    this.authSub = this.auth
      .getCurrentUser()
      .subscribe((data) => (this.currentUserId = data.id));
  }

  get username() {
    return this.questionForm.get("username");
  }
  get role() {
    return this.questionForm.get("role");
  }
  get tags() {
    return this.questionForm.get("tags");
  }
  get question() {
    return this.questionForm.get("question");
  }

  dataEvent() {
    this.displayAnswers = true;

    const event = {
      displayAnswers: this.displayAnswers,
      tags: this.tags.value,
      question: this.question.value,
    };
    this.displayAnswersEvent.emit(event);
  }

  onSubmit() {
    this.questionForm.patchValue({ userId: this.currentUserId });

    this.questionSub = this.questionService
      .create(this.questionForm.value)
      .subscribe({
        next: (data) => console.log("saving a question:", data),
        error: (err) =>
          this.notificationService.error("Error saving question", err),
      });

    this.dataEvent();
  }

  ngOnDestroy(): void {
    console.log("destroying question-form-component");
    this.authSub.unsubscribe();
    if (this.questionSub) this.questionSub.unsubscribe();
  }
}
