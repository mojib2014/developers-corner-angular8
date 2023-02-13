import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { User } from "src/app/shared/models/users.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { UsersService } from "../users.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: User;

  userSub!: Subscription;
  authSub!: Subscription;

  constructor(
    private userService: UsersService,
    private auth: AuthService,
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.authSub = this.auth.getCurrentUser().subscribe({
      next: (data) => (this.user = data),
      error: (err) =>
        this.notificationService.error("Error getting current user", err),
    });
  }

  open(user: User) {
    this.user.password = "";
    console.log(this.user);

    this.modalService
      .open(user, { ariaLabelledBy: "modal-basic-title" })
      .result.then((result) => console.log(result));
  }

  onSubmit() {
    this.userSub = this.userService.update(this.user).subscribe({
      next: (data) => console.log("deleting a user:", data),
      error: (err) =>
        this.notificationService.error("Error updating a user", err),
    });
  }

  onRemove(id: number) {
    this.userSub = this.userService.delete(id).subscribe({
      next: (data) => console.log("deleting a user:", data),
      error: (err) =>
        this.notificationService.error("Error deleting a user", err()),
    });
    this.auth.logout();
    this.router.navigate(["register"]);
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
