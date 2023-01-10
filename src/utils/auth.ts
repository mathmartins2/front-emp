import Keycloak from "keycloak-js";

const keycloakConfig = JSON.parse(process.env.REACT_APP_KEYCLOAK_JSON || "{}");
export const keycloak = new Keycloak({
  url: keycloakConfig["auth-server-url"],
  realm: keycloakConfig["realm"],
  clientId: keycloakConfig["resource"],
});

export const keycloakProviderInitConfig: Keycloak.KeycloakInitOptions = {
  onLoad: "check-sso",
  silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
};