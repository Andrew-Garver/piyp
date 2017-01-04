import {Injectable} from "@angular/core";
import {Job} from "../entities/job";
import {JOBS, PROS, CUSTOMERS, USERS} from "./mock-data/mock-database";
import {Pro} from "../entities/pro";
import {Customer} from "../entities/customer";
import {User} from "../entities/user";

@Injectable()
export class DatabaseService {
  getAllJobs(): Job[] {
    return JOBS;
  }

  getJobById(id: number): Job {
    if (id > 0 && id <= JOBS.length) {
      return JOBS[id];
    }
    return null;
  }

  getAllPros(): Pro[] {
    return PROS;
  }

  getProById(id: number): Pro {
    if (id > 0 && id <= PROS.length) {
      return PROS[id];
    }
    return null;
  }

  getAllCustomers(): Customer[] {
    return CUSTOMERS;
  }

  getCustomerById(id: number): Customer {
    if (id > 0 && id <= CUSTOMERS.length) {
      return CUSTOMERS[id];
    }
    return null;
  }

  getAllUsers(): User[] {
    return USERS;
  }

  getUserByUsername(username: string): User {
    for (let user of USERS) {
      if (username === user.username) {
        return user;
      }
    }

    console.log("No user found, or invalid credentials");
    return null;
  }
}
