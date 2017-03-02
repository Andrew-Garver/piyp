import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";
import {AuthService} from "../../services/auth.service";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'page-project-filters',
  templateUrl: 'project-filters.html'
})
export class ProjectFiltersPage {

  private formFilters: FormGroup;
  private currentProfile: any;
  private services: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private authService: AuthService, private loadingService: LoadingService,
              private toastService: ToastService, private profileService: ProfileService) {
    this.formFilters = formBuilder.group({
      sortBy: [''],
      radius: [''],
      locType: [''],
      serviceCategories: ['']
    });
  }

  ionViewWillEnter() {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
    this.services = this.currentProfile.registeredServices;
  }

}
