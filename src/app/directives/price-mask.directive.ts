import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appPriceMask]',
  standalone: true,
})
export class PriceMaskDirective {
  constructor(
    private elementReference: ElementRef<HTMLInputElement>,
    @Optional() private ngControl: NgControl | null
  ) {}

  @HostListener('input')
  onInput(): void {
    const input = this.elementReference.nativeElement;
    const value = input.value;

    const digits = value.replace(/\D/g, '');
    const formatted = this.formatAsPrice(digits);
    input.value = formatted;

    this.ngControl?.control?.setValue(formatted, { emitEvent: false });
  }

  @HostListener('blur')
  onBlur(): void {
    const input = this.elementReference.nativeElement;
    const value = input.value;
    const digits = value.replace(/\D/g, '');

    if (digits === '') {
      input.value = '';
      this.ngControl?.control?.setValue('', { emitEvent: false });

      return;
    }

    const formatted = this.formatAsPrice(digits);
    input.value = formatted;

    this.ngControl?.control?.setValue(formatted, { emitEvent: false });
  }

  private formatAsPrice(digits: string): string {
    if (digits === '') return '';

    const cents = parseInt(digits, 10);
    if (Number.isNaN(cents)) return '';

    const reais = (cents / 100).toFixed(2);
    const [integerPart, decimalPart] = reais.split('.');
    const integerFormatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `R$ ${integerFormatted},${decimalPart}`;
  }
}
