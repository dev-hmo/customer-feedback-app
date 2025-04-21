export type Feedback = {
  id?: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  date: string;

  // ← add these two lines:
  reply?: string;
  replyDate?: string;
};
