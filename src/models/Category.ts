export interface Category {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  popularityScore?: number;
  difficultyLevel?: number;
}
