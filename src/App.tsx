import './index.css';
import Sidebar from './components/sidebar';
import Products from './pages/products/products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Categories from './pages/categories/categories';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 ml-64 p-10 bg-base-200"> 
          <Routes>
            <Route path="/produtos" element={<Products />} />
            <Route path="/categorias" element={<Categories/>} />
            <Route path="/servicos" element={<p>works!</p>} />
            <Route path="/clientes" element={<p>works!</p>} />
            <Route path="/" element={<Products />} />
          </Routes>
        </div>
      </div>
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
    </Router>
  );
}

export default App;
