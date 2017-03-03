import {Component} from '@angular/core';

import {NavController, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'page-project-filters',
  templateUrl: 'project-filters.html'
})
export class ProjectFiltersPage {

  private formFilters: FormGroup;
  private currentProfile: any;
  private services: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private viewCtrl: ViewController) {
    this.formFilters = formBuilder.group({
      sortBy: [''],
      radius: [''],
      locType: [''],
      serviceCategories: ['']
    });
  }

  dismissModal() {
    let data = {
      sortBy: this.formFilters.value.sortBy,
      radius: this.formFilters.value.radius,
      locType: this.formFilters.value.locType,
      serviceCategories: this.formFilters.value.serviceCategories
    }
    this.viewCtrl.dismiss(data);
  }

  ionViewWillEnter() {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
    this.services = this.currentProfile.registeredServices;
  }

}
