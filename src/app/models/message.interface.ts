import {UserInterface} from './user.interface';

export  interface Message {
  sender: UserInterface;
  message: string;
  date?: number;
  uid?: string;
}
