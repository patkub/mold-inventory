import { it, describe, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoginRequired } from './login-required'

// mock auth0 library
import * as auth0 from '@auth0/auth0-react'

// fake user
const fakeUser = {
  email: 'user@test.com',
  email_verified: true,
  sub: '',
}

describe('LoginRequired', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mock('@auth0/auth0-react')
  });

  it('Renders loading screen when waiting for Auth0', () => {
    // Prepare
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: true,

      user: fakeUser,
      logout: vi.fn(),
      loginWithRedirect: vi.fn(),
      getAccessTokenSilently: vi.fn(),
      getAccessTokenWithPopup: vi.fn(),
      getIdTokenClaims: vi.fn(),
      loginWithPopup: vi.fn(),
      handleRedirectCallback: vi.fn(),
      error: undefined,
    })

    // Act
    // Render login page
    render(<LoginRequired>
      <div>Protected Content</div>
    </LoginRequired>
    )

    // Expect
    // Loading screen is displayed
    const loadingEl = screen.getByTestId('loading')
    expect(loadingEl).toBeDefined()
  });

  // isLoading = false, isAuthenticated = false
  it('Renders login page when not authenticated', async () => {
    // Prepare
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isLoading: false,
      isAuthenticated: false,

      user: fakeUser,
      logout: vi.fn(),
      loginWithRedirect: vi.fn(),
      getAccessTokenSilently: vi.fn(),
      getAccessTokenWithPopup: vi.fn(),
      getIdTokenClaims: vi.fn(),
      loginWithPopup: vi.fn(),
      handleRedirectCallback: vi.fn(),
      error: undefined,
    })

    // Act
    // Render login page
    render(<LoginRequired>
      <div>Protected Content</div>
    </LoginRequired>
    )

    // Expect
    // Loading screen is displayed
    const pleaseSignInEl = screen.getByTestId('please-sign-in')
    expect(pleaseSignInEl).toBeDefined()
  });

  // isLoading = false, isAuthenticated = false
  it('Renders children when authenticated', async () => {
    // Prepare
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isLoading: false,
      isAuthenticated: true,

      user: fakeUser,
      logout: vi.fn(),
      loginWithRedirect: vi.fn(),
      getAccessTokenSilently: vi.fn(),
      getAccessTokenWithPopup: vi.fn(),
      getIdTokenClaims: vi.fn(),
      loginWithPopup: vi.fn(),
      handleRedirectCallback: vi.fn(),
      error: undefined,
    })

    // Act
    // Render login page
    render(<LoginRequired>
      <div>Protected Content</div>
    </LoginRequired>
    )

    // Expect
    // Protected content is displayed
    const protectedContent = screen.getByText("Protected Content")
    expect(protectedContent).toBeDefined()
  });

})
