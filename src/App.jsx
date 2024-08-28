import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './templates/Layout';
import Home from './views/Home';
import NoPage from './views/NoPage';
import Cardapio from './views/Cardapio';
import Login from './views/Login';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    elementError: <NoPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'cardapio', element: <Cardapio /> },
      { path: 'login', element: <Login /> }, 
    ]
  },
]);




export default Router;




// function App() {
//   return (
    
//   );
// }


// <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path="cardapio" element={<Cardapio />} />
    //       <Route path="login" element={<Login />} />
    //       <Route path="*" element={<NoPage />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>