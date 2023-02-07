import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { UsersModule } from "./users/users.module";
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./shared/http-interceptors/auth-interceptor";
import { HomeModule } from "./home/home.module";
import { QuestionsModule } from "./questions/questions.module";
import { QuestionsService } from "./shared/services/questions.service";
import { NotificationComponent } from "./notification/notification.component";
import { NotificationService } from "./shared/services/notification.service";

@NgModule({
  declarations: [AppComponent, NotificationComponent],
  imports: [
    BrowserModule,
    UsersModule,
    HomeModule,
    QuestionsModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    QuestionsService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
