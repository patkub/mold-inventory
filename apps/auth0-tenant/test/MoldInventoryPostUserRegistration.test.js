import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { mockForNodeRequire } from "vitest-mock-commonjs"

import { onExecutePostUserRegistration } from '../auth0-tenant/actions/MoldInventoryPostUserRegistration/code.js'

describe('onExecutePostUserRegistration', () => {

  let event, api;

  beforeAll(() => {
    const mocks = vi.hoisted(() => {
      const managementClientPass = {
        users: {
          assignPermissions: vi.fn(async (user, permissions) => new Promise((resolve) => resolve()))
        }
      }

      class ManagementClientPass {
        constructor() {
          this.users = managementClientPass.users
        }
      }

      const managementClientFail = {
        users: {
          assignPermissions: vi.fn(async (user, permissions) => new Promise((resolve, reject) => reject(new Error('Error assigning permissions'))))
        }
      }

      class ManagementClientFail {
        constructor() {
          this.users = managementClientFail.users
        }
      }

      const mocks = {
        managementClientPass: {
          ManagementClient: ManagementClientPass,
          managementClient: managementClientPass
        },
        managementClientFail: {
          ManagementClient: ManagementClientFail,
          managementClient: managementClientFail
        }
      }

      return mocks
    })
  })


  beforeEach(() => {
    // Mock Auth0 Event and API objects
    event = {
      stats: {
        logins_count: 1
      },
      secrets: {
        DOMAIN: "fake_domain",
        CLIENT_ID: "fake_client_id",
        CLIENT_SECRET: "fake_client_secret"
      },
      user: {
        user_id: "fake_user_id"
      }
    }

    api = {
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('Should add read:molds scope to new users', async () => {
    // Mock Auth0 management client
    mockForNodeRequire('auth0', mocks.managementClientPass)

    // Prepare
    event.stats.logins_count = 1;

    // Act
    await onExecutePostUserRegistration(event, api)

    // Assert
    expect(mocks.managementClientPass.managementClient.users.assignPermissions).toHaveBeenCalledWith(
      { id: event.user.user_id },
      {
        permissions: [
          {
            resource_server_identifier: "https://mold-inventory-api-production.epicpatka.workers.dev/api",
            permission_name: "read:molds"
          },
        ],
      })
  })

  it('Should catch errors', async () => {
    // Mock Auth0 management client with errors
    mockForNodeRequire('auth0', mocks.managementClientFail)

    // Prepare
    event.stats.logins_count = 1;

    // Act
    await onExecutePostUserRegistration(event, api)

    // Assert
    expect(mocks.managementClientFail.managementClient.users.assignPermissions).toHaveBeenCalledWith(
      { id: event.user.user_id },
      {
        permissions: [
          {
            resource_server_identifier: "https://mold-inventory-api-production.epicpatka.workers.dev/api",
            permission_name: "read:molds"
          },
        ],
      })

    await expect(mocks.managementClientFail.managementClient.users.assignPermissions).rejects.toThrow(new Error('Error assigning permissions'))
  })

})
