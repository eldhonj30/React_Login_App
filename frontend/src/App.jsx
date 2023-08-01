import { Outlet,useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from './components/Header';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from "./components/AdminHeader";


function App() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith("/admin"); 
  return (
    <>
      {isAdminPage ? <AdminHeader /> : <Header/>}
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App