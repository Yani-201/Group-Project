

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
            },
            body: JSON.stringify(data),
        });
        return response;

    }



}
