import {Component} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-place-bid',
  templateUrl: 'place-bid.html',
  providers: [AuthService]
})

export class PlaceBidPage {

  private formBidAmount: FormGroup;
  private selectedJob: any;

  constructor(private navCtrl: NavController, private authService: AuthService,
              private navParams: NavParams, private formBuilder: FormBuilder) {
    this.selectedJob = this.navParams.get('job');

    this.formBidAmount = formBuilder.group({
      bidAmount: ['', Validators.required],
      message: [''],
    });
  }

  placeBid() {

  }

}
