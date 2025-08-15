import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { onExecutePostLogin } from '../auth0-tenant/actions/MoldInventoryPostLogin/code.js'

describe('onExecutePostLogin', () => {

  let event, api;

  beforeEach(() => {
    // Mock Auth0 Event and API objects
    event = {
      stats: {
        logins_count: 1
      }
    }

    api = {
      accessToken: {
        addScope: vi.fn()
      }
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('Should add read:molds scope on first login', async () => {
    // Prepare
    event.stats.logins_count = 1;

    // Act
    onExecutePostLogin(event, api)

    // Assert
    expect(api.accessToken.addScope).toHaveBeenCalledWith("read:molds")
  })

  it('Should not add read:molds scope on subsequent logins', async () => {
    // Prepare
    event.stats.logins_count = 2;

    // Act
    onExecutePostLogin(event, api)

    // Assert
    expect(api.accessToken.addScope).not.toHaveBeenCalledWith("read:molds")
  })

})
