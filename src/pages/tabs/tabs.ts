import { Component } from '@angular/core';

import { RequestJobsPage } from '../request-jobs/request-jobs';
import { JobRequestsPage} from '../job-requests/job-requests';
import { HiredJobsPage } from '../hired-jobs/hired-jobs';
import { ProfilePage } from "../profile/profile";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  templateUrl: 'tabs.html',
  providers: [AuthService]
})
export class TabsPage {
  tab1Root: any = RequestJobsPage;
  tab2Root: any = JobRequestsPage;
  tab3Root: any = HiredJobsPage;
  tab4Root: any = ProfilePage;

  constructor(private authService: AuthService) {

  }
}
