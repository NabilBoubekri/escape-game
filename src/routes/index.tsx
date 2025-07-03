import { Route, Routes} from "react-router-dom";
import { Header } from "../shared/components/header";
import HomePage from "../features/home/components/HomePage";
import Footer from "../shared/components/Footer";
import { Session } from "../features/session/components/Session";
import { Reservation } from "../features/reservation/components/Reservation";
import { Contact } from "../features/contact/components/Contact";
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
      <Footer />
    </>
  );
};

export default AppRoutes;
