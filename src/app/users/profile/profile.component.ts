import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/shared/models/users.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { UsersService } from "../users.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private userService: UsersService,
    private auth: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((data) => (this.user = data));
  }

  open(user: User) {
    this.user.password = "";
    this.modalService
      .open(user, { ariaLabelledBy: "modal-basic-title" })
      .result.then((result) => console.log(result));
  }

  onSubmit() {
    this.userService.update(this.user).subscribe((data) => console.log(data));
  }

  onRemove(id: number) {
    this.userService.delete(id).subscribe((data) => console.log(data));
    this.auth.logout();
    this.router.navigate(["register"]);
  }
}
