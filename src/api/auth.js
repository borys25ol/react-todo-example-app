import { LOCALSTORAGE_TOKEN_KEY, LOGIN_URL, REGISTER_URL } from 'config'

class AuthAPIService {
  constructor() {
    this.headers = {
      'Content-type': 'application/json',
    }
  }

  async register(username, email, fullName, password) {
    const response = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ username, email, full_name: fullName, password }),
    })
    return await response.json()
  }

  async login(username, password) {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ username, password }),
    })
    return await response.json()
  }

  logout() {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
  }
}

export default new AuthAPIService()
