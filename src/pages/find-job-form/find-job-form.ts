import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {DatabaseService} from "../../services/database.service";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {Geolocation} from "ionic-native";

@Component({
  selector: 'page-find-job-form',
  templateUrl: 'find-job-form.html',
  providers: [DatabaseService]
})
export class FindJobFormPage {

  private formJobProximity: FormGroup;
  private services: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {

    //TODO: Replace with endpoint call
    this.services = [
      {category: "Auto Glass", id: ""},
      {category: "HVAC", id: ""},
      {category: "Landscaping", id: ""},
      {category: "Pool Maintenance", id: ""},
      {category: "Tech Support", id: ""}
    ];

    this.formJobProximity = formBuilder.group({
      within: ['', Validators.required],
      ofLocation: ['', Validators.required],
      serviceCategories: ['', Validators.required]
    });
  }

  searchForOpenJobs() {
    if (this.formJobProximity.valid) {
      Geolocation.getCurrentPosition().then((position) => {
        console.log("Your position: ");
        console.log(position);
      });
      console.log("Searching for jobs...");
    }
  }

}
