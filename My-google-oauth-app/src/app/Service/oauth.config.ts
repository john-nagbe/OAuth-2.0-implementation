import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  clientId: '275024598530-rbgq6okn9b4v2d5tv6b9hkre7v11ill5.apps.googleusercontent.com',
  scope: 'openid profile email', //basic scopes for OIDC and user info
  strictDiscoveryDocumentValidation: false,

}
