import './index.css';
import Sidebar from './components/sidebar';
import Products from './pages/products/products';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Categories from './pages/categories/categories';
import { useState, useEffect } from 'react';

function App() {
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate(); 

  const toggleRole = () => {
    const newRole = !isOwner; 
    setIsOwner(newRole);
    localStorage.setItem('userRole', newRole ? 'owner' : 'client');
  };

  useEffect(() => {
    if (isOwner) {
      navigate('/produtos')
    } else {
      navigate('/pedidos')
    }
  }, [isOwner, navigate]);

  return (
    <div className="flex h-screen">
      <Sidebar isOwner={isOwner} />

      <div className="flex-1 ml-64 p-10 bg-base-200"> 
        <Routes>
          {isOwner ? ( 
            <>
              <Route path="/produtos" element={<Products />} />
              <Route path="/categorias" element={<Categories />} />
              <Route path="/clientes" element={<p>Owner View of Clients!</p>} />
              <Route path="/" element={<Products />} />
            </>
          ) : (  
            <>
              <Route path="/pedidos" element={<p>workssssss</p>} /> 
              <Route path="/" element={<p>workssssss</p>} /> 
            </>
          )}
        </Routes>
      </div>

      <button 
        onClick={toggleRole} 
        className="fixed bottom-10 right-10 p-4 bg-blue-600 text-white rounded-full shadow-lg"
      >
        {isOwner ? "Visão Cliente" : "Visão Dono"} 
      </button>
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        pauseOnFocusLoss
        theme="colored" 
      />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
