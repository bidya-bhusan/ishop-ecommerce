import './App.css';
import { AdminAddProduct } from './components/ishop';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserRegister } from './components/resister';
import { UserLogin } from './components/login';
import { Header } from './components/header';
import { Cart } from './components/cart';
import { HomePage } from './components/home';
import { Product } from './components/product';
import { AdminResister } from './components/adminResister';
import { AdminLogin } from './components/adminLogin';
import { ProductDetail } from './components/productDetail';
import { Cheakout } from './components/cheakout';
// import { Redux } from './components/redux';
// import { Footer } from './components/footer';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/admin-add-product' element={<AdminAddProduct/>}/>
          <Route path='/admin-resister' element={<AdminResister />} />
          <Route path='/register' element={<UserRegister />} />
          <Route path='/cart' element={<Cart />}>
              {/* <Route path='/cheakout' element={<Cheakout/>}/> */}
          </Route>
          <Route path='/product/category/:categoryId' element={<Product />}>
            <Route path='productdetails/:id' element={<ProductDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>

  );
}

export default App;
