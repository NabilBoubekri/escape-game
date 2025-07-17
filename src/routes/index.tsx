import { Route, Routes, useNavigate} from "react-router-dom";
import { Header } from "../shared/components/header";
import HomePage from "../features/home/components/HomePage";
import Footer from "../shared/components/Footer";
import { Session } from "../features/session/components/Session";
import { Reservation } from "../features/reservation/components/Reservation";
import { Contact } from "../features/contact/components/Contact";
import LoginForm from "../features/login/components/LoginForm";
import CreateSessionForm from "../features/session/components/CreateSessionForm";
import PrivateRoute from "./PrivateRoute";
import DashboardAdmin from "../features/session/components/DashboardAdmin";
import EditSessionForm from "../features/session/components/EditSessionForm";
const AppRoutes = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/escape-game" element={<HomePage />} />
        <Route path="/login" element={<LoginForm onLoginSuccess={ () => navigate('/admin')} />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/sessions" element={<Session/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/create" element={
          <PrivateRoute>
            <CreateSessionForm />
          </PrivateRoute>
          } 
        />
        <Route path="/admin" element={
          <PrivateRoute>
            <DashboardAdmin />
          </PrivateRoute>
          } 
        />
        <Route
          path="/admin/edit/:id"
          element={
            <PrivateRoute>
              <EditSessionForm />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
