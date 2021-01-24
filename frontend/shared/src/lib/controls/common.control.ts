import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  ValidatorFn,
  AsyncValidatorFn,
  Validators,
  ValidationErrors,
} from '@angular/forms';

export class ControlErrorMatcher implements ErrorStateMatcher {
  private error: ValidationErrors;
  focused = false;

  getError = () => ControlError[Object.keys(this.error)[0] || 'default'];

  isErrorState(control: FormControl | null): boolean {
    this.error = control.errors;
    return (
      !this.focused &&
      !control.pristine &&
      Boolean(control.errors) &&
      (control.dirty || control.touched)
    );
  }
}

// Disable Control Direcctive

import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import {
  ControlError,
  InputType,
  MatAppearance,
  MatColor,
  ButtonType,
} from './controls.enum';

@Directive({
  selector: '[disableControl]',
})
export class DisableControlDirective {
  @Input() set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor(private ngControl: NgControl) {}
}

// Abstract Control Directive

@Directive()
export abstract class ControlAbstract {
  @Input() control: FormControl;
  @Input() name: string;
  @Input() type: InputType | ButtonType = 'text';
  @Input() initialValue: string | number;
  @Input() validators: ValidatorFn[] = [];
  @Input() asyncValidators: AsyncValidatorFn[] = [];

  // Optional
  @Input() clearable = false;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() useDefault: boolean = true;
  @Input() appearance: MatAppearance = MatAppearance.STANDARD;
  @Input() color: MatColor = MatColor.PRIMARY;
  @Input() hint: string;
  @Input() length: number;

  readonly matcher = new ControlErrorMatcher();
  readonly errorHint = this.matcher.getError;

  ngOnInit(): void {
    if (this.type == 'email') this.validators.unshift(Validators.email);
    if (this.length) this.validators.unshift(Validators.maxLength(this.length));
    if (this.required) this.validators.unshift(Validators.required);
    if (this.control) {
      if (this.useDefault) {
        this.control.setValidators(this.validators);
        this.control.setAsyncValidators(this.asyncValidators);
      }
    } else {
      this.control = new FormControl(
        { value: this.initialValue, disabled: this.disabled },
        this.validators,
        this.asyncValidators,
      );
    }
  }
}
