import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appStructural]'
})
export class StructuralDirective {

  @Input() set appStructural(condition: boolean) {
    if(!condition) {
      this.vcRef.createEmbeddedView(this.templateRef)
    } else {
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
