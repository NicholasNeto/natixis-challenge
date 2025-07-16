import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProductListPage from "../pages/ProductListPage";
import ProtectedRoute from "./ProtectedRoute";
import ProductFormPage from "../pages/ProductFormPage";
// ... importar outras páginas e um componente de rota protegida

// <LoginPage />

const AppRouter = () => {
  return (
    
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Exemplo de rota protegida */}
        <Route
          path="/produtos"
          element={
            <ProtectedRoute>
              <ProductListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/produtos/novo"
          element={
            <ProtectedRoute>
              <ProductFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/produtos/editar/:id"
          element={
            <ProtectedRoute>
              <ProductFormPage />
            </ProtectedRoute>
          }
        />
        {/* Adicionar outras rotas para criar, editar, etc. */}
        <Route path="/" element={<ProductListPage />} /> {/* Rota inicial */}
      </Routes>
  );
};

// O componente ProtectedRoute verifica se o utilizador está logado.
// Se não estiver, redireciona para a página de login.

export default AppRouter;
