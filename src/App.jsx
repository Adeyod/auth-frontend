import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SendEmailVerificationLink from './pages/sendEmailVerificationLink';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send-email" element={<SendEmailVerificationLink />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:userId/:token" element={<Verify />} />
      </Routes>
    </div>
  );
};

export default App;
