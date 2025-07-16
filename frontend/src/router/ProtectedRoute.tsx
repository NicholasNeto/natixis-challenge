import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Acede ao estado de autenticação do nosso contexto
  const location = useLocation();

  // Se o utilizador não estiver autenticado...
  if (!isAuthenticated) {
    // ...redirecionamos para a página de login.
    // O 'replace' evita que o utilizador possa clicar no botão "Voltar" do navegador
    // e aceder à página protegida.
    // O 'state' guarda a página original que ele tentou aceder.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Se estiver autenticado, simplesmente renderizamos o componente filho (a página protegida).
  return <>{children}</>;
};

export default ProtectedRoute;


