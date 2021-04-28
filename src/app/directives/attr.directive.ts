import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAttr]'
})
export class AttrDirective implements OnInit{

  @Input() defaultColor: string = "transparent"
  // now the directive itself will accept the value
  @Input('appAttr') colo: string;
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.eleRef.nativeElement.style.backGroundColor = "green"
    //this.renderer.setStyle(this.eleRef.nativeElement, "background-color", "blue");
  }

  @HostListener('mouseenter', ['$event']) mouseOver(eventData: Event) {
    this.renderer.setStyle(this.eleRef.nativeElement, "background-color", "red");
    this.backgroundColor = "red"
  }

  @HostListener('mouseleave', ['$event']) mouseLeave(eventData: Event) {
    this.renderer.setStyle(this.eleRef.nativeElement, "background-color", "transparent");
  }

}
