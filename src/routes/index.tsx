import { Route, Routes} from "react-router-dom";
import { Header } from "../components/basics/header";
import HomePage from "../components/Home/HomePage";

const AppRoutes = () => {

  return (
    <>
      {<Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<HomePage />} />
        <Route path="/sessions"/>
        <Route path="/contact"/>
      </Routes>
    </>
  );
};

export default AppRoutes;
