import {Injectable} from "@angular/core";
import {Job} from "../entities/job";
import {JOBS, PROS, CUSTOMERS, USERS, BIDS} from "./mock-data/mock-database";
import {Pro} from "../entities/pro";
import {Customer} from "../entities/customer";
import {User} from "../entities/user";
import {Bid} from "../entities/bid";

@Injectable()
export class DatabaseService {
  getAllJobs(): Job[] {
    return JOBS;
  }

  getJobById(id: number): Job {
    if (id > 0 && id <= JOBS.length) {
      return JOBS[id - 1];
    }
    return null;
  }

  getOpenBidsByProId(proId: number): Promise<Bid[]> {
    let bids = [];
    for (let bid of BIDS) {
      if (bid.pro.id == proId) {
        if (bid.open) {
          bids.push(bid);
        }
      }
    }
    return Promise.resolve(bids);
  }

  getBidById(bidId: number): Promise<Bid> {
    if (bidId > 0) {
      for (let bid of BIDS) {
        if (bid.id === bidId) {
          return Promise.resolve(bid);
        }
      }
    }
    return null;
  }

  getBidsByJobId(jobId: number): Promise<Bid[]> {
    if (jobId > 0) {
      let jobForBids;
      let bids = [];
      for (let job of JOBS) {
        if (job.id === jobId) {
          jobForBids = job;
          break;
        }
      }
      for (let bid of BIDS) {
        if (bid.job.id === jobForBids.id) {
          bids.push(bid);
        }
      }
      return Promise.resolve(bids);
    }
    return null;
  }

  getOpenJobsByUserId(userId: number): Promise<Job[]> {
    if (userId > 0) {
      let customer = this.getCustomerById(userId);
      let jobs = this.getAllJobs();
      if (customer && jobs)
      {
        let relevantJobs = [];
        for (let job of jobs) {
          if (job.customer && (job.pro === null || job.pro === undefined) && job.customer.id === customer.id) {
            relevantJobs.push(job);
          }
        }
        return Promise.resolve(relevantJobs);
      }
    }
    return null;
  }

  getHiredJobsByUserId(userId: number): Promise<Job[]> {
    if (userId > 0) {
      let customer = this.getCustomerById(userId);
      let jobs = this.getAllJobs();
      if (customer && jobs)
      {
        let relevantJobs = [];
        for (let job of jobs) {
          if (job.customer && job.pro && job.customer.id === customer.id) {
            relevantJobs.push(job);
          }
        }
        return Promise.resolve(relevantJobs);
      }
    }
    return null;
  }

  getAllPros(): Pro[] {
    return PROS;
  }

  getProById(id: number): Pro {
    if (id > 0 && id <= PROS.length) {
      return PROS[id - 1];
    }
    return null;
  }

  getAllCustomers(): Customer[] {
    return CUSTOMERS;
  }

  getCustomerById(id: number): Customer {
    if (id > 0 && id <= CUSTOMERS.length) {
      return CUSTOMERS[id - 1];
    }
    return null;
  }

  getCustomerByEmail(email: string): Promise<User> {
    for (let user of USERS) {
      if (user.email === email) {
        return Promise.resolve(user);
      }
    }
    return null;
  }

  getAllUsers(): User[] {
    return USERS;
  }

  getUserByUsername(username: string): User {
    for (let user of USERS) {
      if (username === user.email) {
        return user;
      }
    }

    console.log("No user found, or invalid credentials");
    return null;
  }
}
