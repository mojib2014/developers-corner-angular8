import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { displayAnswersEvent } from "src/app/shared/models/questions.model";

import { AuthService } from "src/app/shared/services/auth.service";
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

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private questionService: QuestionsService
  ) {}

  ngOnInit() {
    this.questionForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      role: ["", [Validators.required]],
      tags: ["", Validators.required],
      question: ["", Validators.required],
      userId: [],
    });

    this.auth
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

    this.questionService
      .create(this.questionForm.value)
      .subscribe((data) => console.log("saved question", data));

    this.dataEvent();
  }
}
