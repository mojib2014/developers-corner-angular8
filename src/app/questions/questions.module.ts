import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { QuestionsRoutingModule } from "./questions-routing.module";
import { QuestionsComponent } from "./questions/questions.component";
import { QuestionComponent } from "./question/question.component";

@NgModule({
  declarations: [QuestionsComponent, QuestionComponent],
  imports: [SharedModule, QuestionsRoutingModule],
  providers: [],
})
export class QuestionsModule {}
