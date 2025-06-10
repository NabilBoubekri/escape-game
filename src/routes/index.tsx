import { Route, Routes} from "react-router-dom";
import { Header } from "../components/basics/header";
import HomePage from "../components/Home/HomePage";
import Footer from "../components/Footer/Footer";
import { Session } from "../components/Session/Session";
const AppRoutes = () => {

  return (
    <>
      <Header /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<HomePage />} />
        <Route path="/sessions" element={<Session/>}/>
        <Route path="/contact"/>
      </Routes>
       <Footer/>
    </>
  );
};

export default AppRoutes;
