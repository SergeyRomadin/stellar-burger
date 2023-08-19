const baseURL = "https://norma.nomoreparties.space/api";

async function api(route, params = {}) {
    const url = `${baseURL}${route}`,
        options = {
            method: params?.method || "GET",
            headers: {
                ...params?.headers,
            },
            body: params?.body || null,
        };

    const res = await fetch(url, options);
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`Failed to fetch. Code error:${res.status}`);
    }
}

function getIngridients() {
    return api("/ingredients");
}

function postOrder(order) {
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: order,
    };

    return api("/orders", params);
}

export { getIngridients, postOrder };
