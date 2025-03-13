import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
  } from "react-router-dom";
  import { Suspense, lazy } from "react";
import Layout from "./page/Layout";
import ErrorBoundary from "./page/ErrorBoundary";
import Preload from "./components/shared/Preload";
import ProtectedRoutes from "./page/ProtectedRoutes";
import { Roles } from "./@types/types";

  

  const App = lazy(() => import("./App"));
  const Shop = lazy(() => import("./page/Shop"));
  const Cart = lazy(() => import("./page/Cart"));
  const Product = lazy(() => import("./page/Product"));
  
  const LazyWrapper = (Component: React.ComponentType) => (
    <Suspense fallback={<Preload />}>
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </Suspense>
  );
  // const LazyWrapper = (Component: React.ComponentType) => {
  //   return () => (
  //     <Suspense fallback={<Preload />}>
  //       <ErrorBoundary>
  //         <Component />
  //       </ErrorBoundary>
  //     </Suspense>
  //   );
  // };
  
  
  export default function RouteLayout() {
    return createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={LazyWrapper(App)} />
            <Route element={<ProtectedRoutes allowedRoles={[Roles.BUYER,Roles.SELLER]} />} path="shop">
                <Route index element={LazyWrapper(Shop)} />
                <Route path=":productId" element={LazyWrapper(Product)} />
                <Route path="product/:productId" element={LazyWrapper(Cart)} />
              </Route>
            
          </Route>
          {/* <Route path="*" element={LazyWrapper(NotFound)} /> */}
        </>
      )
    );
  }
  
  
  
  