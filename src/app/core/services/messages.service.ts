import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

/**
 * Provides MessagesService.
 */
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  public msgsError: Message[] = [];

  constructor(
    private messageService: MessageService
  ) { }

  //*********************************************************PRIVATE METHODS *********************************************************/
  /**
   * Concat missing parrameters, we use it when we have a http 400(bad request)
   *
   * @private
   * @param {string[]} missing_params
   * @return {*}  {string}
   * @memberof MessagesService
   */
  private concatMissingParams(missing_params: string[]): string {
    if (missing_params.length == 2) {
      return `${missing_params[0]} and ${missing_params[1]}`;
    }
    return missing_params.join(', ').replace(/,(?=[^,]*$)/, ' and ');
  }

  //*********************************************************PUBLIC METHODS *********************************************************/
  /**
   * Show a green/success toast message with the message content
   *
   * @param {string} message
   * @memberof MessagesService
   */
  successMessage(message: string) {
    this.messageService.add({ severity: "success", summary: "Operation Success", detail: message });
  }

  /**
   * Error handle, show error message.
   *
   * @param {HttpErrorResponse} error
   * @memberof MessagesService
   */
  showError(error: HttpErrorResponse) {
    let message: Message = { severity: "error", summary: "Error", detail: error.error.message };

    if (error.status == 400) {
      const missing_params: string[] = error.error.missing_params;
      if (missing_params.length > 1) {
        message.detail = `Parameters ${this.concatMissingParams(missing_params)} are required`;
      }
    }

    this.msgsError = [];
    this.msgsError.push(message);
  }

  cleanErrors() {
    this.msgsError = [];
  }
}