import { Component } from '@angular/core';

import { RequestJobsPage } from '../RequestJobs/RequestJobs';
import { JobRequestsPage} from '../job-requests/job-requests';
import { HiredJobsPage } from '../HiredJobs/HiredJobs';
import {ProfilePage} from "../Profile/Profile";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = RequestJobsPage;
  tab2Root: any = JobRequestsPage;
  tab3Root: any = HiredJobsPage;
  tab4Root: any = ProfilePage;

  constructor() {

  }
}
