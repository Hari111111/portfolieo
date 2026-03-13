export type Blog = {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  content: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};
