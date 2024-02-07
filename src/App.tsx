import { useEffect, useState } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import RouterComponent from "./RouterComponent";
import Loader from "./components/loader";
import { RootState } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "./store/global/globalReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Base from "./components/base";
import { getUser } from "./apis/authApis";
import { customLocalStorage } from "./utils/localStorage";
import { setUserData } from "./store/auth/authReducer";
import ErrorBoundary from "./components/errorBoundary";
import ErrorComponent from "./pages/error-component";

const App = () => {
  const [startLoadingComponent, setStartLoadingComponent] =
    useState<boolean>(true);
  const { loading } = useSelector((state: RootState) => state.globalReducer);

  const dispatch = useDispatch();

  const onLoad = async () => {
    setStartLoadingComponent(true);
    dispatch(setLoader(true));
    const token = customLocalStorage.getData("token");
    if (!token || token === null) {
      setStartLoadingComponent(false);
      dispatch(setLoader(false));
      return <Navigate to="/signin" />;
    }
    try {
      const {
        user: { name, email, role, avatar, id },
      } = await getUser();
      dispatch(setUserData({ token, name, email, isAdmin: role, avatar, id }));
      dispatch(setLoader(false));
    } catch (error) {
      setStartLoadingComponent(false);
      console.log("Error");
      dispatch(setLoader(false));
    }
    setStartLoadingComponent(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      {loading && <Loader loader={loading} />}
      {!startLoadingComponent && (
        <BrowserRouter>
          <Base>
            <ErrorBoundary fallback={<ErrorComponent />}>
              <RouterComponent />
            </ErrorBoundary>
          </Base>
        </BrowserRouter>
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;
