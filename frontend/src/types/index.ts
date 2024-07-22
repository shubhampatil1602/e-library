export type Book = {
  _id: string;
  title: string;
  genre: string;
  description: string;
  author: Author;
  coverImage: string;
  file: string;
};

export type Author = {
  name: string;
};
