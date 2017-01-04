import {Pro} from "./pro";
import {Customer} from "./customer";

export class Job {
  id: number;
  name: string;
  category: string;
  description: string;
  location: string;
  customer: Customer;
  pro: Pro;
  acceptedBidId: number
}
