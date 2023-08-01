class Auth {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async register(email, password) {
        const res = await fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return this._checkResponse(res);
    }

    async login(email, password) {
        const res = await fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return this._checkResponse(res);
    }

    async checkToken(token) {
              const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return this._checkResponse(res);
    }
}

const auth = new Auth({
    baseUrl: 'https://lepa1984.nomoredomains.xy.nomoredomains.sbs',
});

export default auth;
