import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";
import {AlertController} from "ionic-angular";
import {getAuthHttp} from "../app/app.module";
import {Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class JobService {

  private job: any;

  constructor(private authHttp: AuthHttp, private alertCtrl: AlertController) {
    this.job = [{
      "_id": "58b4d039f346503a7cb90f44",
      "_creator": "58ad406a46229286b2b9831c",
      "_service": {
        _id: "588a6e868531fc14a2f44cfa",
        name: "Lawn Care"
      },
      "loc": {
        "_id": "58ad408146229286b2b9831f",
        "coordinates": [
          -111.7939737,
          43.8183494
        ],
        "type": "Point"
      },
      "request": {
        "title": "Basic Landscaping",
        "description": "I need my lawn mowed and trimmed this Friday. If you are experienced with landscaping, I am also looking for someone to put in some decorative rocks.",
        "_id": "58b4d039f346503a7cb90f45"
      },
      "images": [
        "https://media.angieslist.com/s3fs-public/styles/widescreen_large/public/lush_green_lawn_10655747.jpg?itok=R4slUZkN",
        "http://blog.lawneq.com/wp-content/uploads/2013/09/Green-Lawn.jpg",
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSJWyNxpJlz8TnKGsBFsOZ-6SB5J8y20Eyac07_cd8uXZJJ5aYU"
      ],
      "proLeftFeedback": false,
      "consumerLeftFeedback": false,
      "consumerConfirmedComplete": false,
      "proMarkedComplete": false,
      "qa": [
        {
          "_creator": "58ad3cf143dacb85b3e53809",
          "question": "How many square feet is your lawn?",
          "_id": "58b563af0d9d5e452c73dad6",
          "dateReplied": null,
          "dateAsked": "2017-02-28T06:32:26.817Z",
          "answer": "It is about 1 acre."
        },
        {
          "_creator": "58ad3cf143dacb85b3e53809",
          "question": "Is your lawn in good condition now or does it need some love?",
          "_id": "58b563af0d9d5e452c73dad6",
          "dateReplied": null,
          "dateAsked": "2017-02-28T06:32:26.817Z",
          "answer": "It is in good condition. It just needs to be maintained"
        },
        {
          "_creator": "58ad3cf143dacb85b3e53809",
          "question": "What kind of decorative rocks have you looked at?",
          "_id": "58b563af0d9d5e452c73dad6",
          "dateReplied": null,
          "dateAsked": "2017-02-28T06:32:26.817Z",
          "answer": "I like granite. Marble is pretty too."
        }
      ],
      "bids": [
        {
          "_creator": "58ad3cf143dacb85b3e53809",
          "amount": 11,
          "message": "yay",
          "_id": "58b563b40d9d5e452c73dad9",
          "acceptedDate": null
        }
      ],
      "acceptedBid": null,
      "__v": 3
    }];
  }

  postJob(formData): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.job);
    });
  }

  getJob(jobId): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.job);
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
      resolve(this.job);
    });
  }

  getProjectImages(jobs): Promise<any> {
    let params = "";
    if (jobs) {
      params += "?";
      for (let i = 0; i < jobs.length; i++) {
        params += "projects[]=" + jobs[i]._id + "&";
      }
      params = params.slice(0, -1);
    }

    return new Promise((resolve, reject) => {
      this.authHttp.get('http://localhost:3000/api/jobs/images' + params)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data.projectImages);
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
      resolve(true);
    });
  }

  answerQuestion(jobId, questionId, answer): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(true)
    });
  }

  proMarkJobComplete(jobId): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  consumerMarkJobComplete(jobId): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  leaveReview(params): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}
