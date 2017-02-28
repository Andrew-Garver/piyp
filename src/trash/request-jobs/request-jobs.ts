// import {Component} from '@angular/core';
//
// import {NavController, App} from 'ionic-angular';
// import {FindAProPage} from "../find-a-pro/find-a-pro";
// import {LoginPage} from "../login/login";
// import {AuthService} from "../../services/auth.service";
//
// @Component({
//   selector: 'page-request-jobs',
//   templateUrl: 'request-jobs.html'
// })
// export class RequestJobsPage {
//
//   constructor(public navCtrl: NavController, private authService: AuthService,
//               private app: App) {
//
//   }
//
//   requestJob() {
//     this.navCtrl.push(FindAProPage)
//       .catch(() => {
//         this.authService.logout()
//           .then(() => this.app.getRootNav().setRoot(LoginPage));
//       });
//   }
//
// }
