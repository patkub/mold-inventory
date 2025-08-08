import OAuthProvider, { type OAuthHelpers } from '@cloudflare/workers-oauth-provider'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { McpAgent } from 'agents/mcp'
import { Hono } from 'hono'
import { authorize, callback, confirmConsent, tokenExchangeCallback } from './auth'
import type { UserProps } from './types'

export class MoldsMCP extends McpAgent<Env, Record<string, never>, UserProps> {
  server = new McpServer({
    name: 'Molds MCP Server Auth0 OIDC',
    version: '1.0.0',
  })

  async init() {
    // Useful for debugging. This will show the current user's claims and the Auth0 tokens.
    this.server.tool('whoami', "Get the current user's details", {}, async () => ({
      content: [{ text: JSON.stringify(this.props.claims, null, 2), type: 'text' }],
    }))

    // Call the Molds API on behalf of the current user.
    this.server.tool('list-molds', 'List molds', {}, async () => {
      try {
        const response = await fetch(`${this.env.API_BASE_URL}/api/molds`, {
          headers: {
            // The Auth0 Access Token is available in props.tokenSet and can be used to call the Upstream API (Molds API).
            Authorization: `Bearer ${this.props.tokenSet.accessToken}`,
          },
        })

        const data = await response.json()
        return {
          content: [
            {
              text: JSON.stringify(data),
              type: 'text',
            },
          ],
        }
      } catch (e) {
        return {
          content: [{ text: `The call to the Molds API failed: ${e}`, type: 'text' }],
        }
      }
    })
  }
}

// Initialize the Hono app with the routes for the OAuth Provider.
const app = new Hono<{ Bindings: Env & { OAUTH_PROVIDER: OAuthHelpers } }>()
app.get('/authorize', authorize)
app.post('/authorize/consent', confirmConsent)
app.get('/callback', callback)

export default new OAuthProvider({
  apiHandler: MoldsMCP.mount('/sse'),
  apiRoute: '/sse',
  authorizeEndpoint: '/authorize',
  clientRegistrationEndpoint: '/register',
  // TODO: fix these types
  // @ts-expect-error
  defaultHandler: app,
  tokenEndpoint: '/token',
  tokenExchangeCallback,
})
