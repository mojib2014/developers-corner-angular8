import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GlobalModalState } from "./global-modal.state";
import { GlobalModalOptions } from "./global-modal-options";
import { SharedModule } from "../../shared.module";

@Injectable({
  providedIn: SharedModule,
})
export class GlobalModalService {
  constructor(
    private modalService: NgbModal,
    private state: GlobalModalState
  ) {}

  public show(options: GlobalModalOptions): void {
    this.state.options = options;
    this.state.modal = this.modalService.open(this.state.template, {
      centered: true,
      size: "lg",
    });
  }
}
