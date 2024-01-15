import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PaymentPage from './pages/PaymentPage';
import SendEmailVerification from './pages/SendEmailVerification';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/send-email" element={<SendEmailVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:userId/:token" element={<Verify />} />
      </Routes>
    </div>
  );
};

export default App;
