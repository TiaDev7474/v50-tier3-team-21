import {InsufficientMessage} from "./inssuficient-message.tsx";
import {Wallet} from "../wallet/wallet.tsx";


export const PaymentInformation = () => {
  return(
      <div className="w-full flex flex-col gap-3">
          <h2 className="text-xl font-bold text-dark">Payment Information</h2>
          <InsufficientMessage />
          <Wallet />
      </div>
  )
}
