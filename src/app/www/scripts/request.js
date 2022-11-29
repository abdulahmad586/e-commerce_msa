function post(url, body) {
    return new Promise((resolve, reject) => {
        let options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        };

        fetch(url, options).then(async (response) => {

            let result = await response.json();
            resolve(result);


        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

function deleteRequest(url) {
    return new Promise((resolve, reject) => {
        let options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        };

        fetch(url, options).then(async (response) => {

            let result = await response.json();
            resolve(result);


        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}