import React, { Suspense } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import NavBar from "@common/components/Navbar";

import "@common/assets/css/style.css";
import "@common/assets/fontawesome/css/all.css";

import {
  ViewIntroduction,
  ViewCreatedCliente,
  ViewMobileCliente,
  ViewListCliente,
  ViewIntroductionService,
  ViewCreatedService,
  ViewListService,
  ViewMobileService,
  ViewAccount,
  List
} from './lazy-loading-protocols'

function App(): JSX.Element {

  const isDesktopAndTablet: boolean = useMediaQuery({ query: '(min-width: 768px)' })

  return (
    <Router>
      <NavBar>
        <Routes>
          <Route path="/cliente">
            <Route
              path="/cliente/introducao"
              element={isDesktopAndTablet
                ? <Suspense fallback={<h1>Loading</h1>}><ViewIntroduction /></Suspense>
                : <ViewMobileCliente />
              }
            />
            <Route path="/cliente/cadastro" element={isDesktopAndTablet ? <ViewCreatedCliente /> : <ViewMobileCliente />} />
            <Route path="/cliente" element={isDesktopAndTablet ? <ViewListCliente /> : <ViewMobileCliente />} />
          </Route>
          <Route path="/servico">
            <Route path="/servico/introducao" element={isDesktopAndTablet ? <ViewIntroductionService /> : <ViewMobileService />} />
            <Route path="/servico/cadastro" element={isDesktopAndTablet ? <ViewCreatedService /> : <ViewMobileService />} />
            <Route path="/servico" element={isDesktopAndTablet ? <ViewListService /> : <ViewMobileService />} />
          </Route>
          <Route>
            <Route
              path="/contas"
              element={isDesktopAndTablet
                ? <Suspense fallback={<h1>Loading</h1>}><ViewAccount /></Suspense>
                :
                <ViewMobileService />} />
          </Route>
          <Route path="*" element={<h1>Pagina não encontrada</h1>} />
          <Route path="/teste" element={<List />} />
        </Routes>
      </NavBar>
    </Router>
  )
}


export default App;

