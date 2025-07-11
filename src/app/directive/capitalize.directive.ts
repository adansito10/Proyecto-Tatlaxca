import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCapitalize]',
  standalone: false,
})
export class CapitalizeDirective {

  constructor(private control: NgControl) {}

  @HostListener('blur')
  onBlur() {
    let value: string = this.control.control?.value;
    if (value) {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      this.control.control?.setValue(capitalized, { emitEvent: false });
    }
  }
}
