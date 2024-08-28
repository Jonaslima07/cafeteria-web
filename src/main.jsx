import ReactDOM from 'react-dom/client';
import Router from './App.jsx';
import {
  RouterProvider,
} from "react-router-dom";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider  router={Router} />
  </React.StrictMode>
);