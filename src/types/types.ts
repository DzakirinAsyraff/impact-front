export interface Counter {
    ind: number;
    status: "online" | "serving" | "offline";
    currentNumber: Ticket|null;
  }

export interface Ticket {
    number: number;
}

export interface Queue {
    id: string;
    tickets: Ticket[];
    front: Ticket | null;
    rear: Ticket | null;
}