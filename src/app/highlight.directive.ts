import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit,AfterViewInit,OnChanges{

  @Input() customStyleClass:string = 'test'

  constructor(private element:ElementRef) {
    console.log(this.element.nativeElement.classList)
  }
  ngAfterViewInit(): void {
    if(this.customStyleClass){
      this.element.nativeElement.classList.add(this.customStyleClass)
    }
  }

  ngOnInit(): void {
    if(this.customStyleClass){
      this.element.nativeElement.classList.add(this.customStyleClass)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['customStyleClass']['currentValue']){
      this.element.nativeElement.classList.add(changes['customStyleClass']['currentValue'])
      console.log(changes['customStyleClass'])
    }else{
      const classList = this.element.nativeElement.classList;
      if (classList.length > 0) {
        // Remove the last class
        classList.remove(classList[classList.length - 1]);
      }
    }
  }
  
}
