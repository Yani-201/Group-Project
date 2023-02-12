

export default class Request {

    constructor(domain = "http://localhost:3000/") {
        this.domain = domain;

    }

    async Get(urlExt) {
        const url = this.domain + urlExt
        const response = await fetch(url);
        return response;

    }

    async Post(urlExt, data = null) {
        const url = this.domain + urlExt
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + sessionStorage.getItem("jwt"),
            },
            body: JSON.stringify(data),
        });
        return response;

    }

    async Del(urlExt) {
        const url = this.domain + urlExt
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("jwt"),

            }
        });

        return response;

    }

    async Patch(urlExt, data = null) {
        const url = this.domain + urlExt
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + sessionStorage.getItem("jwt"),
            },
            body: JSON.stringify(data),
        });
        return response;

    }



}
