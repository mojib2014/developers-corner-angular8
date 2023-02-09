import { Component, OnInit } from "@angular/core";
import { AuthService } from "./shared/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Developers Corner | Home Page";

  constructor(private auth: AuthService) {}
  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
