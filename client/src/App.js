import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Switch, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
// import UserRoute from "./components/routes/UserRoute";
// import AdminRoute from "./components/routes/AdminRoute";
import VaccineLocatorScreen from './pages/VaccineLocatorScreen';
import Header from './components/Header';
import Footer from './components/Footer';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';
import UserDashboardScreen from './pages/UserDashboardScreen';
import AdminDashboardScreen from './pages/AdminDashboardScreen';
import ListRequestScreen from './pages/ListRequestScreen';
import ListDonationScreen from './pages/ListDonationScreen';
import ListUnverifiedScreen from './pages/ListUnverifiedScreen';
import RequestersForDonatorScreen from './pages/RequestersForDonatorScreen';
import DonatorsForRequesterScreen from './pages/DonatorsForRequesterScreen';

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                address: res.data.address,
                mobile: res.data.mobile,
                pin: res.data.pin,
                id: res.data.id,
                status: res.data.status,
                verified: res.data.verified,
              },
            });
            localStorage.setItem(
              'user',
              JSON.stringify({
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                address: res.data.address,
                mobile: res.data.mobile,
                pin: res.data.pin,
                id: res.data.id,
                status: res.data.status,
                verified: res.data.verified,
              })
            );
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="py-3">
        <ToastContainer />
        <Switch>
          <Route path="/vaccinefinder" component={VaccineLocatorScreen} exact />
          <Route
            exact
            path="/user/donations"
            component={DonatorsForRequesterScreen}
          />
          <Route
            exact
            path="/user/requests"
            component={RequestersForDonatorScreen}
          />
          <Route exact path="/user/dashboard" component={UserDashboardScreen} />
          <Route
            path="/admin/unverified"
            component={ListUnverifiedScreen}
            exact
          />
          <Route path="/admin/donations" component={ListDonationScreen} exact />
          <Route path="/admin/requests" component={ListRequestScreen} exact />
          <Route
            path="/admin/dashboard"
            component={AdminDashboardScreen}
            exact
          />

          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />

          {/* <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} /> */}
          {/* <AdminRoute exact path="/admin/category" component={CategoryCreate} /> */}
          {/* <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        /> */}
          {/* <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} /> */}
          {/* <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProduct} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <Route exact path="/product/" component={Product} /> */}
          {/* <Route exact path="/category/:slug" component={CategoryHome} /> */}
          {/* <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/user/checkout" component={Checkout} /> */}
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default App;
