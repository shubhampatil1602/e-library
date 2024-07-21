import { User } from '../user/userTypes';

export interface Books {
  _id: string;
  title: string;
  author: User;
  description: string;
  genre: string;
  coverImage: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
}
