import { BrowserRouter } from 'react-router-dom';
import { FC, Suspense } from 'react';
import { AppRoutes } from 'routes';
import { useAxiosConfig } from 'config/axios';
import { SplashScreen } from 'components/SplashScreen';

const App: FC = (() => {
  useAxiosConfig()
  return (
    <BrowserRouter>
      <SplashScreen />
      <Suspense fallback={<div>Cargando...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
})

export default App;
