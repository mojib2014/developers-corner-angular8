import { Directive, TemplateRef } from "@angular/core";
import { GlobalModalState } from "./global-modal.state";

@Directive({
  selector: "ng-template[appGlobalModal]",
})
export class GlobalModalDirective {
  constructor(modalTemplate: TemplateRef<any>, state: GlobalModalState) {
    state.template = modalTemplate;
  }
}
