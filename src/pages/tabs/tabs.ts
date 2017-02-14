import {Component, ViewChild, OnInit} from '@angular/core';

import {JobRequestsPage} from '../job-requests/job-requests';
import {HiredJobsPage} from '../hired-jobs/hired-jobs';
import {ProfilePage} from "../profile/profile";
import {AuthService} from "../../services/auth.service";
import {FindJobsPage} from "../find-jobs/find-jobs";
import {ManageBidsPage} from "../manage-bids/manage-bids";
import {RequestJobFormPage} from "../request-job-form/request-job-form";
import {FindJobFormPage} from "../find-job-form/find-job-form";
import {NavParams, Tabs, NavController, App} from "ionic-angular";
import {ProfileService} from "../../services/profile.service";
import {ToastService} from "../../services/toast.service";
import {JobService} from "../../services/job.service";

@Component({
  templateUrl: 'tabs.html',
  providers: [JobService]
})
export class TabsPage {

  @ViewChild("tabs") tabRef: Tabs;
  profile: any;
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  landingTabNumber: number;
  newBids: number = 0;

  constructor(private jobService: JobService) {
    // TODO: quitting in the select-profile page causes this to crash
    this.profile = JSON.parse(localStorage.getItem("current_profile"));

    if (this.profile.type === "pro" && (!this.profile.stripeAccount || !this.profile.stripeAccount.external_accounts.total_count) ||
      this.profile.type === "consumer" && (!this.profile.stripeAccount || !this.profile.stripeAccount.sources.total_count)) {
      this.landingTabNumber = 3;
    }

    if (this.profile) {
      if (this.profile.type === "consumer") {
        this.tab1Root = RequestJobFormPage;
        this.tab2Root = JobRequestsPage;
        this.tab3Root = HiredJobsPage;
        this.tab4Root = ProfilePage;
      }
      else if (this.profile.type === "pro") {
        this.tab1Root = FindJobFormPage;
        this.tab2Root = ManageBidsPage;
        this.tab3Root = HiredJobsPage;
        this.tab4Root = ProfilePage;
      }
    }
  }

  ionViewWillEnter() {
    let params = {
      profile: this.profile._id,
      queryBy: 'creator'
    };

    // this.loadingService.presentLoading();
    this.jobService.getJobs(params)
      .then((jobs) => {
        // this.loadingService.hideLoading();
        for (let job of jobs) {
          if (job.bids) {
            this.newBids += job.bids.length;
          }
        }
      })
      .catch((err) => {
        // this.loadingService.hideLoading();
        console.log(err);
      });
  }

}
