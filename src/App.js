import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import GererAdmin from './components/GererAdmin';
import GererFournisseur from './components/GererFournisseur';
import GererCategorie from './components/GererCategorie';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/gerer-admin" element={<GererAdmin />} />
            <Route path="/fournisseurs" element={<GererFournisseur />} />
            <Route path="/categories" element={<GererCategorie />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;