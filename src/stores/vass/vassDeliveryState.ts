import { atom } from "recoil";
import { IDeliveryResponse } from "../../types/deliveryState.types";

export const vassDeliveryState = atom<IDeliveryResponse>({
  key: "vassDeliveryState",
  default: {
    carrier: {
      id: "",
      name: "",
      tel: "",
    },
    from: {
      name: "",
      time: "",
    },
    progresses: [
      {
        description: "",
        location: {
          name: "",
        },
        status: {
          id: "",
          text: "",
        },
        time: "",
      },
    ],
    state: {
      id: "",
      text: "",
    },
    to: {
      name: "",
      time: "",
    },
  },
});
