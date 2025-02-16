export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Deck {
  id: number;
  name: string;
  userId: number;
}

export interface Card {
  id: number;
  front: string;
  back: string;
}
