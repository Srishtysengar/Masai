//defines typescript interfaces and enums
export enum RatingCategory {
  Food = "Food Quality",
  Service = "Service",
  Ambience = "Ambience",
  Overall = "Overall Experience",
}

export type Ratings = Record<RatingCategory, number>;

export interface Feedback {
  id: number;
  name: string;
  email: string;
  phone?: string;
  date: string; 
  ratings: Ratings; 
  comments: string;
  allowContact: boolean; 
}

export const ratingCategories: RatingCategory[] = [
  RatingCategory.Food,
  RatingCategory.Service,
  RatingCategory.Ambience,
  RatingCategory.Overall,
];
