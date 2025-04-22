import { Request } from 'express';

export interface roleTypes {
    role_id: number;
    role_name: "Admin" | "Borrower" | "Librarian";
}

export interface RoleRequest extends Request {
    user?: {
      user_id: number;
      name: string;
      email: string;
      role_id: number;
      role_name: string;
      created_at?: Date;
      updated_at?: Date;
      total_copies:number;
      available_copies:number;
    };
}
  