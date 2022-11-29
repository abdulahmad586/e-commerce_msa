const login = (e) => {
    if (e.preventDefault) e.preventDefault();

    let email = document.getElementById("form_email").value;
    let pass = document.getElementById("form_password").value;

    post('http://localhost/api/v1/users/login', { email, password: pass })

        .then((result) => {
            if (result.ok) {
                alert(result.message);
                // console.log(JSON.stringify(result.user));

                setCookie('auth', JSON.stringify(result.user));
                setTimeout(() => {
                    window.location.replace('index.html');
                }, 1000)
            } else {
                alert(result.message);
            }
        }).catch((error) => {
            alert('Error: ' + error);
        })

    return false;
}

const register = (e) => {
    if (e.preventDefault) e.preventDefault();

    let userType = document.getElementById("form_type_customer").checked ? 'Customer' : 'Admin';
    let name = document.getElementById("form_name").value;
    let address = document.getElementById("form_address").value;
    let email = document.getElementById("form_email").value;
    let password = document.getElementById("form_password").value;

    post('http://localhost/api/v1/users/', { name, address, email, password, userType })

        .then((result) => {
            if (result.ok) {
                alert(result.message);
                // console.log(JSON.stringify(result.user));
                setCookie('auth', JSON.stringify(result.user));

                setTimeout(() => {
                    window.location.replace('index.html');
                }, 1000)
            } else {
                alert(result.message);
            }
        }).catch((error) => {
            alert('Error: ' + error);
        })

    return false;
}

function checkAuth(callback) {
    let auth = getCookie('auth');
    if (auth) {
        let user = JSON.parse(auth);
        callback(null, user);
    } else {
        callback('You are not logged in', null);
    }

}

