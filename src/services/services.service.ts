import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class ServicesService {

  constructor(private authHttp: AuthHttp) {
  }

  getServices(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.get('http://localhost:3000/api/services')
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data.services);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }
}
