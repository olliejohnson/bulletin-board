import { apiKeyClient } from "@better-auth/api-key/client"
import { oauthProviderClient } from "@better-auth/oauth-provider/client"
import {
  adminClient,
  jwtClient,
  usernameClient,
} from "better-auth/client/plugins"

import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    usernameClient(),
    adminClient(),
    apiKeyClient(),
    jwtClient(),
    oauthProviderClient(),
  ],
})
