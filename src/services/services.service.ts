import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class ServicesService {

  constructor(private authHttp: AuthHttp) {
  }

  getServices(): Promise<any> {
    return new Promise((resolve, reject) => {
      // this.authHttp.get('http://localhost:3000/api/services')
      //   .map(res => res.json())
      //   .subscribe(
      //     data => {
      //       let sortedServices = data.services.sort((a, b) => {
      //         if (a.name < b.name) return -1;
      //         if (a.name > b.name) return 1;
      //         return 0;
      //       });
      //       resolve(sortedServices);
      //     },
      //     err => {
      //       console.log(err);
      //       reject(err);
      //     }
      //   );
      let services = [
        { "_id" : "588a6e868531fc14a2f44cf2", "name" : "Landscaping", "__v" : 0, "description" : null },
      { "_id" : "588a6e868531fc14a2f44cf4", "name" : "Pool Service", "__v" : 0, "description" : null },
      { "_id" : "588a6e868531fc14a2f44cf6", "name" : "Auto Glass", "__v" : 0, "description" : null },
      { "_id" : "588a6e868531fc14a2f44cf8", "name" : "HVAC", "__v" : 0, "description" : null },
      { "_id" : "588a6e868531fc14a2f44cfa", "name" : "Tech Support", "__v" : 0, "description" : null }
      ];
      resolve(services);
    });
  }
}
