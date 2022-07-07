import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessagesService } from '@app/core';
import { Constants, Page, Status, StatusService } from '@app/shared';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserInput } from './interfaces';
import { UserService } from './services/user.service';

@Component({
  selector: 'exads-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loading: boolean = false;

  users: UserInput[] = [];

  // table amout values
  mat_options = [
    { value: "10", label: 10 },
    { value: "20", label: 20 },
    { value: "50", label: 50 }
  ]

  status: Status[] = [];
  page = new Page();
  columnMode = ColumnMode.force;

  constructor(
    private userService: UserService,
    public statusService: StatusService,
    private messagesService: MessagesService,
  ) { }

  ngOnInit() {
    this.getStatus();
  }

  ngOnDestroy(): void {
    this.messagesService.cleanErrors();
  }

  //*********************************************************GETTERS *********************************************************/
  get limit(): number {
    return parseInt(this.page.limit);
  }

  //*********************************************************PRIVATE METHODS *********************************************************/

  /**
   * Get the User Status list from the server/backend
   * @private
   * @memberof UsersComponent
   */
  private getStatus() {
    this.loading = true;
    this.statusService.getStatus().subscribe((response) => {
      this.status = response.data;
      // we need status data before get users to map the description status to each user
      this.getUsersByPage();
    }, (error: HttpErrorResponse) => {
      this.messagesService.showError(error);
      this.loading = false;
    });
  }

  /**
   *Get getUsersByPage from the server/backend
   *
   * @private
   * @memberof UsersComponent
   */
  private getUsersByPage() {
    this.loading = true;
    this.userService.getUsersByPage(this.page.offset, this.limit).subscribe((response) => {
      this.loading = false;
      response.data.users.forEach((us) => {
        us.fullName = us.last_name ? us.first_name + ', ' + us.last_name : us.first_name;
        us.status = this.status.find(st => us.id_status == st.id).description || null;
        us.statusClass = (us.status == Constants.STATUS_ACTIVE) ? "active" : "inactive";
      });

      this.users = response.data.users;
      this.page.count = response.data.count;

    }, (error: HttpErrorResponse) => {
      this.messagesService.showError(error);
      this.loading = false;
    });
  }


  //*********************************************************PUBLIC METHODS *********************************************************/
  /**
   * change the user table amout and call backend to get Users
   *
   * @memberof UsersComponent
   */
  changeAmount() {
    const lastPosiblePage: number = (this.page.count % this.limit == 0) ? (this.page.count / this.limit) - 1 : Math.trunc(this.page.count / this.limit);

    // avoid to set a not exists page number
    if (this.page.offset > lastPosiblePage) {
      this.page.offset = lastPosiblePage;
    }
    this.getUsersByPage();
  }

  /**
   * Get users in the selected table page.
   * 
   * Called from html when we change the current table page
   * @param {*} pageInfo
   * @memberof UsersComponent
   */
  getUsersByPagebtn(pageInfo) {
    this.page.offset = pageInfo.offset;
    this.getUsersByPage();
  }

}
