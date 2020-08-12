import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor() { }

  get(url: string, someFunction: Function, id: string = null) {
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

put(url: string, someFunction: Function, dataStringified: string, id: string = null) {

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


post(url: string, someFunction: Function, dataStringified: string, id:string = null) {

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

delete(url: string, someFunction: Function, id:string = null) {

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
