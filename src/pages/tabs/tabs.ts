import {Component} from '@angular/core';

import {RequestJobsPage} from '../request-jobs/request-jobs';
import {JobRequestsPage} from '../job-requests/job-requests';
import {HiredJobsPage} from '../hired-jobs/hired-jobs';
import {ProfilePage} from "../profile/profile";
import {AuthService} from "../../services/auth.service";
import {User} from "../../entities/user";
import {FindJobsPage} from "../find-jobs/find-jobs";
import {ManageBidsPage} from "../manage-bids/manage-bids";

@Component({
  templateUrl: 'tabs.html',
  providers: [AuthService]
})
export class TabsPage {
  user: User;
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;

  constructor(private authService: AuthService) {
    console.log("constructing tabs");
    this.user = JSON.parse(localStorage.getItem("current_user"));
    if (this.user) {
      if (this.user.isConsumer) {
        this.tab1Root = RequestJobsPage;
        this.tab2Root = JobRequestsPage;
        this.tab3Root = HiredJobsPage;
        this.tab4Root = ProfilePage;
      }
      else if (this.user.isPro) {
        this.tab1Root = HiredJobsPage;
        this.tab2Root = FindJobsPage;
        this.tab3Root = ManageBidsPage;
        this.tab4Root = ProfilePage;
      }
    }
  }
}
