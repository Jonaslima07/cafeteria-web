import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './templates/Layout';
import Home from './views/Home';
import NoPage from './views/NoPage';
import ClientesYupFormik from './views/ClientesYupFormik';
import Login from './views/Login';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NoPage />, // Corrigido para errorElement
    children: [
      { index: true, element: <Home /> }, // Usando index para a rota raiz
      { path: 'cardapio', element: <ClientesYupFormik /> },
      { path: 'login', element: <Login /> }, 
    ]
  },
]);

export default Router;
