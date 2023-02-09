import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { UsersComponent } from "./users/users.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UsersService } from "./users.service";
import { UsersRoutingModule } from "./users-routing.module";
import { AuthService } from "../shared/services/auth.service";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
  declarations: [
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [SharedModule, UsersRoutingModule],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
