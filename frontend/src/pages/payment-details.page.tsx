import {Detail } from "../components/payment/detail.tsx";
import {PaymentProvider} from "../provider/payment.provider.tsx";
import {PaymentInformation} from "../components/payment/info.tsx";
import {PaymentFooter} from "../components/payment/payment-footer.tsx";


export const PaymentDetailsPage = () => {
   return (
       <PaymentProvider orderId={29}>
           <section className="w-full flex flex-col md:flex-row justify-between gap-6">
               <PaymentInformation />
               <Detail />
           </section>
           <div className="border-b-2 py-5" />
           <PaymentFooter />
       </PaymentProvider>
   )
}
