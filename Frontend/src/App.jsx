import "./assets/scss/global.scss";
import "./assets/scss/basics/_typography.scss";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyList from "./components/MyList";
import Nav from "./components/Nav";
import HomeScreenWithAuth from "./pages/HomeScreen";

// Mobile only
import MobileNav from "./components/MobileNav";
import MobileFooter from "./components/MobileFooter";
import MobileProfile from "./components/MobileProfile";
import MobileFilteredMovies from "./components/MobileFilteredMovies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Firebase
import { db } from "./firebase";
import { onAuthStateChanged, auth } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

import { useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

import { useSelector } from "react-redux";
import {
  getMyListMovies,
  loadMoviesByGenre,
} from "./store/actions/movie.action";
import {
  loginUser,
  logoutUser,
  setIsUserSub,
  setMobileMode,
} from "./store/actions/user.actions";

function App() {
  const user = useSelector((state) => state.userModule.loggedinUser);
  const size = useWindowSize();
  const mobileMode = useSelector((state) => state.userModule.mobileMode);

  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        loginUser({
          uid: userAuth.uid,
          email: userAuth.email,
        });
        getMyListMovies();
        checkUserSubs(userAuth.uid);
      } else {
        logoutUser();
      }

      () => unsbscribe;
    });
  }, [auth.currentUser?.uid]);

  useEffect(() => {
    if (size.width < 600) {
      setMobileMode(true);
    } else {
      setMobileMode(false);
    }
  }, [size]);

  useEffect(() => {
    loadMoviesByGenre();
  }, []);

  async function checkUserSubs(userUid) {
    try {
      const subscriptionCollection = collection(
        db,
        "customers",
        userUid,
        "subscriptions"
      );

      const querySnapshot = await getDocs(subscriptionCollection);

      const currentDateInSeconds = Math.floor(new Date().getTime() / 1000);

      if (querySnapshot.empty) return setIsUserSub(false);

      querySnapshot.forEach((subscriptionDoc) => {
        const subscriptionData = subscriptionDoc.data();
        if (
          subscriptionData.current_period_start.seconds <=
            currentDateInSeconds &&
          subscriptionData.current_period_end.seconds >= currentDateInSeconds
        ) {
          setIsUserSub(true);
        } else {
          setIsUserSub(false);
        }
      });
    } catch (error) {
      console.error("Error checking subscriptions:", error);
    }
  }

  return (
    <Router>
      {!user ? (
        <>
          <Register />
        </>
      ) : (
        <>
          {mobileMode ? <MobileNav /> : <Nav />}
          <Routes>
            <Route path="/" element={<HomeScreenWithAuth />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/profile" element={<Profile />} />

            {/* Mobile Routes*/}
            <Route path="/my-search" element={<MobileFilteredMovies />} />
            <Route path="/mobile-profile" element={<MobileProfile />} />
          </Routes>
          {mobileMode && <MobileFooter />}
        </>
      )}
    </Router>
  );
}

export default App;
