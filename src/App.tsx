import { BrowserRouter, useNavigate } from 'react-router-dom';
import { FC, Suspense } from 'react';
import { AuthStore } from './stores/auth-store';
import { observer } from 'mobx-react';
import { AppRoutes } from 'routes';

type Props = {
  authStore: AuthStore
}

const App: FC = () => {
  const authStore = new AuthStore(useNavigate)
  return <Application authStore={authStore} />

}


const Application: FC<Props> = observer((props) => {

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )

})


export default App;
