import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthLayout } from "./layouts";
import {
    ChangePasswordPage ,
    LoginPage ,
    NotFoundPage , ResetPasswordEmailPage ,
    SignupPage , SuccessResetEmailPage
} from "./pages";
import {AppProvider} from "./provider/app.provider.tsx";
import {MainLayout} from "./layouts";
import {HomePage} from "./pages/home/home.page.tsx";
import {ProfilePage} from "./pages"
import { RestaurantPage } from "./pages/restaurant.page.tsx";
import { CartPage } from "./pages/cart.page.tsx";
import {PaymentDetailsPage} from "./pages/payment-details.page.tsx";
import {CheckoutPage} from "./pages/checkout.page.tsx";

//Todo: define routes in separate file
export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />}/>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/restaurants/:restaurantId" element={<RestaurantPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} >
                            <Route path="order/confirm" element={<CartPage />} />
                            <Route path="order/payment/:id"  element={<PaymentDetailsPage />}/>
                        </Route>
                    </Route>
                    <Route  element={<AuthLayout />} >
                        <Route path='/auth/signup' element={<SignupPage />} />
                        <Route path="/auth/signin" element={<LoginPage />} />
                        <Route  path="/auth/change-password" element={<ChangePasswordPage />}/>
                        <Route  path="/auth/reset-password/sent-link" element={<ResetPasswordEmailPage />}/>
                        <Route  path="/auth/reset-password/reset-sent" element={<SuccessResetEmailPage />}/>
                    </Route>
                    <Route path='/404' element={<NotFoundPage />} />
                    <Route path='*' element={<Navigate to="/404" replace />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    )
}
