export interface ISlot {
  empty: boolean;
  number: number;
  _id: string;
}

export interface ILog {
  _id: string;
  bill: number;
  paid: boolean;
  cardId: string;
  userId?: string;
  licensePlate: string;
  createdAt: string;
  updatedAt: string;
}
