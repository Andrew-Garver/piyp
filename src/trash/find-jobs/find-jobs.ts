// import {Component} from '@angular/core';
//
// import {NavController, App} from "ionic-angular";
// import {AuthService} from "../../services/auth.service";
// import {LoginPage} from "../login/login";
// import {FindNewProjectsPage} from "../find-new-projects/find-new-projects";
//
// @Component({
//   selector: 'page-find-jobs',
//   templateUrl: 'find-jobs.html',
// })
//
// export class FindJobsPage {
//
//   constructor(private navCtrl: NavController, private authService: AuthService, private app: App) {
//   }
//
//   findJob() {
//     this.navCtrl.push(FindNewProjectsPage)
//       .catch(() => {
//         this.authService.logout()
//           .then(() => this.app.getRootNav().setRoot(LoginPage));
//       });
//   }
// }
