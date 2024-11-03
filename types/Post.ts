export default interface Post {
  id?: number;
  image?: string;
  title: string;
  content: string;
  userFirstName?: string;
  createdAt?: Date & string;
  imageUrl?: string;
  userId: number;
  isLiked?: boolean;
  likes?: number;
}
