import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home/home.component";
import { QuestionFormComponent } from "./question-form/question-form.component";

@NgModule({
  declarations: [HomeComponent, QuestionFormComponent],
  imports: [SharedModule, HomeRoutingModule],
  providers: [],
})
export class HomeModule {}
