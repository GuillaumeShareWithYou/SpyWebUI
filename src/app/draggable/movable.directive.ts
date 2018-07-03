import {Directive, HostBinding, HostListener, Sanitizer} from '@angular/core';
import {DraggableDirective} from './draggable.directive';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Directive({
  selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective {
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`translateX(${this.position.x}px) translateY(${this.position.y}px)`);
  }

  private position: Position = {x: 0, y: 0};
  private startPosition: Position = {x: 0, y: 0};

  @HostListener('dragStart', ['$event']) onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };
  }

  @HostListener('dragMove', ['$event']) onDragMove(event: PointerEvent) {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;

  }

  @HostListener('dragStop', ['$event']) onDragStop(event: PointerEvent) {

  }

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

}

export interface Position {
  x: number;
  y: number;
}
