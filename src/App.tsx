import { BrowserRouter } from 'react-router-dom';
import { FC, Suspense } from 'react';
import { AppRoutes } from 'routes';
import { useAxiosConfig } from 'config/axios';

const App: FC = (() => {
  useAxiosConfig()
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
})

export default App;
