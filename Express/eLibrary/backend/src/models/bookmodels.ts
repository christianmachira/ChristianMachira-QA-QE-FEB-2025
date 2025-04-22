import { UserRequest } from "./usermodel";


/**
 * Event type defining structure of an event record in PostgreSQL
 */
export interface Event {
  book_id: number;

  title: string;
  location: string;
  price: number;
  publisher?: string
  description?: string
  image?: string
  created_by: number;
  created_at?: Date;
  updated_at?: Date;
  total_copies:number;
  available_copies:number;
}


/**
 * Custom Express Request Type for event-related middleware
 * This extends `UserRequest` so that `req.user` is available
 */
export interface EventRequest extends UserRequest {
  params: {
    user_id: string; // Changed from number to string to match Express params type
  };
  event?: Event;
}