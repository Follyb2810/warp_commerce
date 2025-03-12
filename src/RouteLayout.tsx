import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
  } from "react-router-dom";
  import { Suspense, lazy } from "react";
import Layout from "./page/Layout";
import ErrorBoundary from "./page/ErrorBoundary";
import Preload from "./components/ui/shared/Preload";

  
  // Lazy-loaded components
  const App = lazy(() => import("./App"));
  
  const LazyWrapper = (Component: React.ComponentType) => (
    <Suspense fallback={<Preload />}>
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </Suspense>
  );
  
  export default function RouteLayout() {
    return createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={LazyWrapper(App)} />
            
          </Route>
          {/* <Route path="*" element={LazyWrapper(NotFound)} /> */}
        </>
      )
    );
  }
  
  
  
  