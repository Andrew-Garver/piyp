import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class BidService {

  constructor(private authHttp: AuthHttp) {
  }

  placeBid(jobId, params): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.post('http://localhost:3000/api/job/' + jobId + '/bid', params)
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

  deleteBid(jobId, bidId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`http://localhost:3000/api/job/${jobId}/bid/${bidId}`)
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

  getBids(jobId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`http://localhost:3000/api/job/${jobId}/bids`)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data.bids);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }
}
