var userType;
var userName;
var userId;

var productsList = [];
var pageNo = 1;
var pageSize = 6;
var totalPages;

const loadProducts = (page = 1) => {
    page = parseInt(pageNo) + parseInt(page);
    if (page < 1) return;

    fetch(`http://localhost/api/v1/products/?page=${page}&count=${pageSize}`).then(async (response) => {
        response = await response.json();

        if (response.ok && response.result && response.result.length > 0) {
            totalPages = response.totalProducts;
            pageNo = response.page;
            productsList = response.result;
            renderProducts();
        }

    }).catch((error) => {
        console.log(error);
    });

}

function renderProducts() {
    let render = document.getElementById("render");

    document.getElementById("page-no").textContent = pageNo;

    if (productsList.length == 0) {
        render.innerHTML = '<p>No products found</p>';
    } else {
        let elems = [];
        for (let i = 0; i < productsList.length; i++) {
            const productData = productsList[i];
            let elem = productTemplate(productData, i);
            elems.push(elem);
        }
        render.innerHTML = elems.join("\n");
    }
}

const productTemplate = (data, id) => {

    if (!data) return '<p>Product not fount</p>';

    return (`
    <div class="product-item" id="item-${id}" style="width: 140px;">
    <img height="160px" width="140px" src="images/product_image.jpg" alt="Product image" />
    <p>${data.name}</p>
    <div style="display: flex; justify-content: space-between">
        <p>N${data.price}</p>
            <input type="hidden" name="product" value="${data._id}" />
            <input style="width: 40px" name="orderQuantity"  type="number" maxlength="3" placeholder="${data.quantity}" max="${data.quantity}" min="1"/>
            <button onclick="buyProduct('item-${id}')">Buy</button>
    </div>
</div>  
    `);

}

const buyProduct = (id) => {

    let elem = document.getElementById(id);
    let formInputs = elem.getElementsByTagName("input");
    let requestBody = {};

    for (let i = 0; i < formInputs.length; i++) {

        let key = formInputs[i].getAttribute("name");
        let value = formInputs[i].value;

        requestBody[key] = value;
    }

    requestBody['customer'] = userId;
    if (!requestBody.orderQuantity) requestBody.orderQuantity = 1;

    post('http://localhost/api/v1/orders/', requestBody).then((result) => {
        // console.log("Response", result);
        if (result.ok) {
            alert('Order placed successfully!');
        } else {
            alert(result.message || result.error);
        }
    }).catch((error) => {
        alert(error);
    });

    return false;
}

function logout() {
    setCookie('auth', 'sds', 0);
    alert("Logged out");
    window.location.replace('/login.html')
}

function checkLogin() {
    let auth = getCookie('auth');
    if (auth) {
        let user = JSON.parse(auth);
        if (!user.email) {
            window.location.replace('login.html');
        } else {
            userType = user.userType;
            userName = user.name;
            userId = user._id;
            loadProducts(0);

        }
    } else {
        window.location.replace('login.html');
    }
}

function setHomeElements() {
    document.getElementById("customer-name").innerText = userName + ` (${userType})`;
    if (userType !== 'Admin') {
        let adminElems = document.getElementsByClassName("admin-options");
        for (let i = 0; i < adminElems.length; i++) {
            adminElems[i].remove()
        }
    }
}

checkLogin();

window.addEventListener('load', () => {
    setHomeElements();
});