import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { UsersModule } from "./users/users.module";
import { AppRoutingModule } from "./app-routing.module";
import { AuthInterceptor } from "./shared/http-interceptors/auth-interceptor";
import { HomeModule } from "./home/home.module";
import { QuestionsModule } from "./questions/questions.module";
import { QuestionsService } from "./shared/services/questions.service";
import { NotificationComponent } from "./notification/notification.component";
import { NotificationService } from "./shared/services/notification.service";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [AppComponent, NotificationComponent],
  imports: [
    BrowserModule,
    UsersModule,
    HomeModule,
    QuestionsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    QuestionsService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
