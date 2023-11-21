export interface IPost {
  _id: string;
  title: string;
  desc: string;
  createdAt: Date;
  img: [key: string][];
  username: string;
  likes: string[];
  comments: IComment[];
  subtitle: string;
}

export interface IComment {
  id: string;
  user: string;
  desc: string;
  date: Date;
}
