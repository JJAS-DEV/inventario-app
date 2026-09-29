import { Role } from "./Role";

export class User {
  email!: string;
  id!: number;
  lastname!: string;
  name!: string;
  password!: string;
  roles!: Role[];
  username!: string
}