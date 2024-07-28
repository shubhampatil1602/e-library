export interface Author {
  _id: string;
  name: string;
}

export interface BookType {
  _id: string;
  title: string;
  author: Author;
  description: string;
  genre: string;
  coverImage: string;
  file: string;
  createdAt: string;
  updatedAt: Date;
}
