import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisma";
import { admin, jwt, organization, username } from "better-auth/plugins";
import { apiKey } from "@better-auth/api-key";
import { oauthProvider } from "@better-auth/oauth-provider";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    experimental: { joins: true },
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        github: {
            clientId: `${process.env.GITHUB_ID}`,
            clientSecret: `${process.env.GITHUB_SECRET}`
        }
    },
    plugins: [
        username(),
        admin(),
        apiKey(),
        jwt(),
        oauthProvider({
            loginPage: "/sign-in",
            consentPage: "/consent",
            scopes: [
                "openid", "profile", "offline_access", "email", "post:read", "post:write", "user:read", "user:write",
                "category:read", "category:write", "admin:read", "admin:write"
            ],
            silenceWarnings: {
                oauthAuthServerConfig: true,
            },
            signup: {
                page: "/sign-up"
            }
        })
    ]
})