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
            method: 'GET',
            headers: this.headers,
        });
        return this._getResponseData(res);
    }
    async changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            const res = await fetch(
                this.baseUrl + '/cards/' + cardId + '/likes',
                {
                    method: 'PUT',
                    headers: this.headers,
                }
            );
            return this._getResponseData(res);
        } else {
            const res_2 = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this.headers,
            });
            return this._getResponseData(res_2);
        }
    }
    async getUserInfo() {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers,
        });
        return this._getResponseData(res);
    }

    async newCard({ name, link }) {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
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
            method: 'DELETE',
            headers: this.headers,
        });
        return this._getResponseData(res);
    }

    async updateUserInfo(data) {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
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
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        });
        return this._getResponseData(res);
    }

    async addLike(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers,
        });
        return this._getResponseData(res);
    }

    async removeLike(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers,
        });
        return this._getResponseData(res);
    }
}

const api = new Api({
    baseUrl: 'https://lepa1984.nomoredomains.xy.nomoredomains.sbs',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
    },
});
export default api;
