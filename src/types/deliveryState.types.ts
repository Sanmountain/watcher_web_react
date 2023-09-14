export interface ICarrier {
  id: string;
  name: string;
  tel: string;
}

export interface IFrom {
  name: string;
  time: string;
}

export interface IProgresses {
  description: string;
  location: {
    name: string;
  };
  status: {
    id: string;
    text: string;
  };
  time: string;
}

export interface IState {
  id: string;
  text: string;
}

export interface ITo {
  name: string;
  time: string;
}

export interface IDeliveryResponse {
  carrier: ICarrier;
  from: IFrom;
  progresses: IProgresses[];
  state: IState;
  to: ITo;
}
