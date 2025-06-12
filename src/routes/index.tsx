import { Route, Routes} from "react-router-dom";
import { Header } from "../components/basics/header";
import HomePage from "../components/Home/HomePage";
import Footer from "../components/Footer/Footer";
import { Session } from "../components/Session/Session";
import { Reservation } from "../components/Reservation/Reservation";
import { Contact } from "../components/Contact/Contact";
const AppRoutes = () => {

  return (
    <>
      <Header /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/sessions" element={<Session/>}/>
        <Route path="/contact" element={<Contact />} />
      </Routes>
       <Footer/>
    </>
  );
};

export default AppRoutes;
