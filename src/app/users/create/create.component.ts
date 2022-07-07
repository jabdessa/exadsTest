import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from '@app/core/services/messages.service';
import { Constants } from '@app/shared';
import { UserService } from '../services/user.service';

@Component({
  selector: 'exads-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnDestroy {
  loading: boolean = false;

  formUser: FormGroup = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(Constants.PATTERN_USERNAME)]],
    first_name: [null, Validators.required],
    last_name: [null],
    email: [null, [Validators.required, Validators.email, Validators.pattern(Constants.PATTERN_EMAIL)]],
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messagesService: MessagesService,
    private userService: UserService
  ) { }

  ngOnDestroy(): void {
    this.messagesService.cleanErrors();
  }

  //*********************************************************GETTERS *********************************************************/
  get usernameValue() {
    return this.formUser.get('username').value;
  }

  //*********************************************************PRIVATE METHODS *********************************************************/

  //TODO we can improve this moving this code to a common service or utils.
  /**
   * clear all errors in a form
   * @private
   * @param {FormGroup} form
   * @memberof CreateComponent
   */
  private clearFormErrors(form: FormGroup) {
    (<any>Object).values(form.controls).forEach((control: FormGroup | FormControl) => {
      if (control instanceof FormControl) {
        control.setErrors(null);
        control.updateValueAndValidity();
      } else {
        this.clearFormErrors(control);
      }
    });
  }

  //*********************************************************PUBLIC METHODS *********************************************************/

  /**
   * check if a control/field has an error
   *
   * @param {string} field
   * @return {*} 
   * @memberof CreateComponent
   */
  hasErrors(field: string) {
    return this.formUser.controls[field].errors;
  }

  /**
   * check if the typed use UserName exists
   *
   * @return {*} 
   * @memberof CreateComponent
   */
  userNameExists() {
    if (this.usernameValue && !this.hasErrors('username')) {
      this.userService.getUserByUsername(this.usernameValue).subscribe((res) => {
        // user exists
        if (res.data.count > 0) {
          this.formUser.get('username').setErrors({ exists: true });
          return true;
        }
        return false;
      }, (error: HttpErrorResponse) => {
        this.messagesService.showError(error);
        this.loading = false;
      });
    }
    return false;
  }


  /**
   * Call backend to create user if the form is valid and the username does not exist
   *
   * @memberof CreateComponent
   */
  createUser() {
    // llamar al back
    if (this.formUser.valid && !this.userNameExists()) {
      this.loading = true;
      this.userService.createUser(this.formUser.value).subscribe(res => {
        this.loading = false;
        this.messagesService.successMessage(res.message);
        this.router.navigate(['users']);
      }, (error: HttpErrorResponse) => {
        this.messagesService.showError(error);
        this.loading = false;
      });
    }
  }

  /**
   * Reset the user form value, clean form errors and navigate to user list
   *
   * @memberof CreateComponent
   */
  cancel() {
    // clear form value
    this.formUser.reset();
    // set errors null
    this.clearFormErrors(this.formUser);
    // redirect
    this.router.navigate(['users']);
  }

  //TODO I know this is not the best way to do this. I can improve it. Sorry
  getError(field: string) {
    const errors = this.formUser.controls[field].errors;
    if (errors) {
      const value = this.formUser.controls[field].value;

      return errors.required ? 'You must enter a value' :
        errors.minlength ? `Invalid value. '${value}' has less than (${errors.minlength.requiredLength}) characters` :
          errors.maxlength ? `Invalid value. '${value}' has more than (${errors.maxlength.requiredLength}) characters` : '';
    }
  }

  getUserNameError() {
    const errors = this.formUser.controls.username.errors;
    if (errors) {
      const value = this.formUser.controls.username.value;

      return errors.required ? 'You must enter a value' :
        errors.minlength ? `Invalid value '${value}'. Username has less than (${errors.minlength.requiredLength}) characters.` :
          errors.maxlength ? `Invalid value. '${value}'. Username has more than (${errors.maxlength.requiredLength}) characters.` :
            errors.pattern ? `Invalid value '${value}'. Username cannot contain the following characters {}'[].!` :
              errors.exists ? `Username '${value}' is been used by another user.` : '';
    }

  }

}
