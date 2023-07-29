class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    async getCards() {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: "GET",
            headers: this.headers,
        });
        return this._getResponseData(res);
    }

    async getUserInfo() {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers,
        });
        return this._getResponseData(res);
    }

    async newCard({ name, link }) {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name,
                link,
            }),
        });
        return this._getResponseData(res);
    }

    async deleteCards(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        });
        return this._getResponseData(res);
    }

    async updateUserInfo(data) {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,

            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        });
        return this._getResponseData(res);
    }

    async updateAvatarInfo(data) {
        const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        });
        return this._getResponseData(res);
    }

    async addLike(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers,
        });
        return this._getResponseData(res);
    }

    async removeLike(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers,
        });
        return this._getResponseData(res);
    }
}

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
    headers: {
        authorization: "13e186c5-85ac-489b-b88e-7248260de319",
        "Content-Type": "application/json",
    },
});
export default api;
