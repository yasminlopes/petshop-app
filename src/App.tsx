import './index.css';
import Sidebar from './components/sidebar';
import Products from './pages/products/products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 ml-64 p-10 bg-base-200"> 
          <Routes>
            <Route path="/produtos" element={<Products />} />
            <Route path="/servicos" element={<p>works!</p>} />
            <Route path="/clientes" element={<p>works!</p>} />
            <Route path="/" element={<p>works!</p>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
