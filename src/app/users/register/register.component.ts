import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      nickName: [""],
      type: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get firstName() {
    return this.registerForm.get("firstName");
  }
  get lastName() {
    return this.registerForm.get("lastName");
  }
  get nickName() {
    return this.registerForm.get("nickName");
  }
  get type() {
    return this.registerForm.get("type");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.auth
        .register(this.registerForm.value)
        .subscribe((data) => console.log(data));
      this.router.navigate(["home"]);
    }
  }
}
