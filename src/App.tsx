import { AppRouter } from './AppRouter'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { keycloak, keycloakProviderInitConfig } from './utils/auth'

function App(): JSX.Element {
  return (
    <ReactKeycloakProvider initOptions={keycloakProviderInitConfig} authClient={keycloak}>
      <AppRouter />
    </ReactKeycloakProvider>
  )
}

export default App;
