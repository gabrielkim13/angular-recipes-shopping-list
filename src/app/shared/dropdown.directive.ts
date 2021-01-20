import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.show')
  isOpen = false;

  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick(): void {
    const dropdownMenuElement = this.el.nativeElement.querySelector(
      'div.dropdown-menu',
    );

    console.log(dropdownMenuElement);

    if (!this.isOpen) dropdownMenuElement.classList.add('show');
    else dropdownMenuElement.classList.remove('show');

    this.isOpen = !this.isOpen;
  }
}
