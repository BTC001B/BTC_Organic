import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Import your pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProductManagement from './pages/ProductManagement';
// You can import other components like UserManagement, ProductManagement, etc.

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-8 col-lg-6">

              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path='/admin/product' element={<ProductManagement/>}/>
                {/* Add more routes below */}
              </Routes>

            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
