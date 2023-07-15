import { BrowserRouter } from 'react-router-dom';
import { FC, Suspense } from 'react';
import { AppRoutes } from 'routes';

const App: FC = (() => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
})

export default App;
