import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class JobService {

  constructor(private authHttp: AuthHttp) {
  }

  postJob(formData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.post('http://localhost:3000/api/job', formData)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data.job);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  getJobs(data): Promise<any> {
    let params = "";
    if (data) {
      params += "?";
      for (let key in data) {
        params += key + "=" + data[key] + "&";
      }
      params = params.slice(0, -1);
    }

    return new Promise((resolve, reject) => {
      this.authHttp.get('http://localhost:3000/api/jobs' + params)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data.jobs);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }
}
