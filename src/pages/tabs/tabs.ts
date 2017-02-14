import {Component} from '@angular/core';

import {JobRequestsPage} from '../job-requests/job-requests';
import {HiredJobsPage} from '../hired-jobs/hired-jobs';
import {ProfilePage} from "../profile/profile";
import {AuthService} from "../../services/auth.service";
import {FindJobsPage} from "../find-jobs/find-jobs";
import {ManageBidsPage} from "../manage-bids/manage-bids";
import {RequestJobFormPage} from "../request-job-form/request-job-form";
import {FindJobFormPage} from "../find-job-form/find-job-form";

@Component({
  templateUrl: 'tabs.html',
  providers: [AuthService]
})
export class TabsPage {
  profile: any;
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  private landingTabNumber: number = 3;

  constructor() {
    // TODO: quitting in the select-profile page causes this to crash
    this.profile = JSON.parse(localStorage.getItem("current_profile"));

    if (this.profile) {
      if (this.profile.type === "consumer") {
        if (this.profile.stripeAccount && this.profile.stripeAccount.sources.total_count) {
          this.landingTabNumber = 0;
        }
        this.tab1Root = RequestJobFormPage;
        this.tab2Root = JobRequestsPage;
        this.tab3Root = HiredJobsPage;
        this.tab4Root = ProfilePage;
      }
      else if (this.profile.type === "pro") {
        if (this.profile.stripeAccount && this.profile.stripeAccount.external_accounts.total_count) {
          this.landingTabNumber = 1;
        }
        this.tab1Root = HiredJobsPage;
        this.tab2Root = FindJobFormPage;
        this.tab3Root = ManageBidsPage;
        this.tab4Root = ProfilePage;
      }
    }
  }
}
