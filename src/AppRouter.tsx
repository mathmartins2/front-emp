import { useKeycloak } from '@react-keycloak/web'

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
  ViewAccountIntroduction
} from './lazy-loading-protocols'
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./components/Login";

export function AppRouter(): JSX.Element {
  const isDesktopAndTablet: boolean = useMediaQuery({ query: '(min-width: 768px)' })  

  const { initialized } = useKeycloak();
  
  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <NavBar>
        <Routes>
          <Route path="/cliente">
            <Route path="/cliente/cadastro" element={isDesktopAndTablet ? <ViewCreatedCliente /> : <ViewMobileCliente />} />
            <Route path="/cliente" element={isDesktopAndTablet ? <ViewListCliente /> : <ViewMobileCliente />} />
          </Route>
          <Route path="/servico/introducao" element={isDesktopAndTablet ? <ViewIntroductionService /> : <ViewMobileService />} />
          <Route path="/servico/cadastro" element={isDesktopAndTablet ? <ViewCreatedService /> : <ViewMobileService />} />
          <Route path="/servico" element={isDesktopAndTablet ? <ViewListService /> : <ViewMobileService />} />
          <Route path="*" element={<h1>Pagina não encontrada</h1>} />
          <Route
            path="/contas"
            element={
              <PrivateRoute>
                <ViewAccount />
              </PrivateRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/contas/introducao" element={<ViewAccountIntroduction />} />
        </Routes>
      </NavBar>
    </Router>
  )
}
