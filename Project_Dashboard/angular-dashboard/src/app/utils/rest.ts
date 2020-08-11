export class Rest {

    static get(url, someFunction, id = null) {
        const options = {
            method: "GET"
        }

        if (id !== null) {
            url = url + "/" + id;
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {

                someFunction(data);

            }).catch((error) => {
                console.log("GetRequestfailed", error)
            });
    }

    static put(url, someFunction, dataStringified, id = null) {

        const options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: dataStringified
        };

        if (id !== null) {
            url = url + "/" + id;
        }

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                someFunction();
            })
            .catch((error) => {
                console.log("PutRequestfailed", error)
            });
    }


    static post(url, someFunction, dataStringified, id = null) {

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: dataStringified
        };

        if (id !== null) {
            url = url + "/" + id;
        }

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                someFunction();
            })
            .catch((error) => {
                console.log("PostRequestfailed", error)
            });
    }

    static delete(url, someFunction, id = null) {

        const options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        };

        if (id !== null) {
            url = url + "/" + id;
        }

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                someFunction();
            })
            .catch((error) => {
                console.log("DeleteRequestfailed", error)
            });
    }
}