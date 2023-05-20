import { useEffect, useState } from 'react';
import './App.css';
import Home from './app/home/home';
import GlobalContext from './shared/contexts/GlobalContext';

import '../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../node_modules/@syncfusion/ej2-react-navigations/styles/material.css';
import Login from './components/login/login';
import { setCookie, getCookie } from 'typescript-cookie'
import { Route, Routes, useNavigate } from 'react-router-dom';
import routes from './shared/constants/routes';


import Contact from './components/contact/Contact';
import CategoryList from './components/category/list';
import CategoryAdd from './components/category/add';
import CategoryUpdate from './components/category/update';
import ProductsList from './components/product/list';
import PruductAdd from './components/product/add';
import PruductUpdate from './components/product/update';

function App() {
  const [page, setPage] = useState<any>('Главная')
  const [token, setToken] = useState(getCookie("accesToken") || false)
  const navigate = useNavigate()
  const hendleSetPage = (value: any): any => {
    setPage(value);
  };

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token])

  return (
    <>
      <GlobalContext.Provider value={{ page, setPage: hendleSetPage }}>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route path={'index'} element={<>hello</>} />
            <Route path={routes.CATEGORY} element={<CategoryList />} />
            <Route path={routes.ADDCATEGORY} element={<CategoryAdd />} />
            <Route path={routes.UPDATECATEGORY + '/:id'} element={<CategoryUpdate />} />
            <Route path={routes.PRODUCTS} element={<ProductsList />} />
            <Route path={routes.ADDPRODUCTS} element={<PruductAdd />} />
            <Route path={routes.UPDATEPRODUCTS + '/:id'} element={<PruductUpdate />} />
            <Route path={routes.CONTACTS} element={<Contact />} />

          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>

      </GlobalContext.Provider>
    </>
  );
}

export default App;
