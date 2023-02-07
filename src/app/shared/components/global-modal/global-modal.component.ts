import { Component } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

// import { GlobalModalOptions } from "./global-modal-options";
// import { GlobalModalState } from "./global-modal.state";

@Component({
  selector: "app-global-modal",
  templateUrl: "./global-modal.component.html",
})
export class GlobalModalComponent {
  closeResult = "";
  // @Input() title: string = "";
  // @Input() onOpenModal: (content: any) => void;
  // options!: GlobalModalOptions;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
