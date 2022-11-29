var list = [];
var pageNo = 1;
var pageSize = 5;
var totalPages;

const loadOrders = (page = 1) => {
    page = parseInt(pageNo) + parseInt(page);

    if (page < 1) return;

    fetch(`http://localhost/api/v1/orders/?page=${page}&count=${pageSize}`).then(async (response) => {
        response = await response.json();
        if (response.ok && response.result && response.result.length > 0) {
            totalPages = response.totalOrders;
            pageNo = response.page;
            list = response.result;
            renderOrders();
        }

    }).catch((error) => {
        console.log(error);
    });

}

function renderOrders() {
    let render = document.getElementById("render");

    document.getElementById("page-no").textContent = pageNo;

    if (list.length == 0) {
        render.innerHTML = '<p>No orders found</p>';
    } else {
        let elems = [];
        for (let i = 0; i < list.length; i++) {
            const orderData = list[i];
            let elem = template(orderData, i);
            elems.push(elem);
        }
        render.innerHTML = elems.join("\n");
    }
}

const template = (data, id) => {

    if (!data) return '<p>Order not fount</p>';

    return (`
    <div class="order-item" id="item-${id}">
        <img height="70px" width="70px" src="images/product_image.jpg" alt="Product image" />
        
        <div style="justify-content: space-between">
            <p>Product: ${data.product}</p>    
            <p>Quantity: ${data.quantity}</p>      
            <p>Price: N${data.subtotal}</p>
            <p>Customer: ${data.customer}</p>  
        </div>
        <button onclick="deleteItem('${data._id}')">Delete</button>
</div>  
    `);

}

const deleteItem = (id) => {
    deleteRequest(`http://localhost/api/v1/orders/${id}`).then((result) => {
        if (result.ok) {
            alert('Deleted successfully!')
            window.location.replace('view_orders.html');
        } else {
            alert(result.message);
        }
    }).catch((error) => {
        alert(error);
    })
}

function checkLogin() {
    let auth = getCookie('auth');
    if (auth) {
        let user = JSON.parse(auth);
        if (!user.email || user.userType !== "Admin") {
            window.location.replace('index.html');
        } else {
            loadOrders(0);
        }
    } else {
        window.location.replace('login.html');
    }
}

checkLogin();

window.addEventListener('load', () => {
    checkLogin();
});