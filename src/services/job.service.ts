import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";
import {AlertController} from "ionic-angular";
import {getAuthHttp} from "../app/app.module";
import {Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class JobService {

  constructor(private authHttp: AuthHttp, private alertCtrl: AlertController) {
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

  acceptBid(jobId, formData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.post('http://localhost:3000/api/job/' + jobId, formData)
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

  confirmDelete(jobId): Promise<any> {
    return new Promise((resolve, reject) => {
      let confirm = this.alertCtrl.create({
        title: 'Are you sure?',
        message: 'This job will be deleted, along with all the bids that are currently placed on it.',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Yes, I\'m sure',
            handler: () => {
              console.log('Deleing job: ' + jobId);
              this.deleteJob(jobId)
                  .then(() => {
                    resolve(true);
                  })
                  .catch(() => {
                    reject(false);
                  });
            }
          }
        ]
      });
      confirm.present();
    });
  }

  deleteJob(jobId): Promise<any> {
    return Promise.resolve(true);
    // return new Promise((resolve, reject) => {
    //   this.authHttp.delete('http://localhost:3000/api/job', {jobId: jobId})
    //     .map(res => res.json())
    //     .subscribe(
    //       data => {
    //         resolve(data.jobs);
    //       },
    //       err => {
    //         console.log(err);
    //         reject(err);
    //       }
    //     );
    // });
  }

  askQuestion(jobId, question): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`http://localhost:3000/api/job/${jobId}/question`, {question: question})
          .map((response: Response) => {
            let body = response.json();
            if (body && body.success) {
              return body.questions;
            }
            throw new Error('success was false.');
          })
          .catch((error) => {
            console.log('Error asking question:', error);
            return Observable.of(false);
          })
          .subscribe((result: any) => {
            resolve(result);
          });
    });
  }

  answerQuestion(jobId, questionId, answer): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`http://localhost:3000/api/job/${jobId}/question/${questionId}/answer`, {answer: answer})
          .map((response: Response) => {
            let body = response.json();
            if (body && body.success) {
              return body.questions;
            }
            throw new Error('success was false.');
          })
          .catch((error) => {
            console.log('Error answering question:', error);
            return Observable.of(false);
          })
          .subscribe((result: any) => {
            resolve(result);
          });
    });
  }

  proMarkJobComplete(jobId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`http://localhost:3000/api/job/${jobId}`, {proMarkedComplete: true})
        .map((response: Response) => {
          let body = response.json();
          if (body && body.success) {
            return body.questions;
          }
          throw new Error('success was false.');
        })
        .catch((error) => {
          console.log('Error for pro marking job complete:', error);
          return Observable.of(false);
        })
        .subscribe((result: any) => {
          resolve(result);
        });
    });
  }

  consumerMarkJobComplete(jobId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`http://localhost:3000/api/job/${jobId}`, {userConfirmedComplete: true})
        .map((response: Response) => {
          let body = response.json();
          if (body && body.success) {
            return body.questions;
          }
          throw new Error('success was false.');
        })
        .catch((error) => {
          console.log('Error for consumer marking job complete:', error);
          return Observable.of(false);
        })
        .subscribe((result: any) => {
          resolve(result);
        });
    });
  }
}
