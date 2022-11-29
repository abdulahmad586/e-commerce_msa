var list = [];
var pageNo = 1;
var pageSize = 5;
var totalPages;

const loadCustomers = (page = 1) => {
    page = parseInt(pageNo) + parseInt(page);

    if (page < 1) return;

    fetch(`http://localhost/api/v1/users/?page=${page}&count=${pageSize}&type=Customer`).then(async (response) => {
        response = await response.json();
        if (response.ok && response.result && response.result.length > 0) {
            totalPages = response.totalUsers;
            pageNo = response.page;
            list = response.result;
            renderCustomers();
        }

    }).catch((error) => {
        console.log(error);
    });

}

function renderCustomers() {
    let render = document.getElementById("render");

    document.getElementById("page-no").textContent = pageNo;

    if (list.length == 0) {
        render.innerHTML = '<p>No customers found</p>';
    } else {
        let elems = [];
        for (let i = 0; i < list.length; i++) {
            const data = list[i];
            let elem = template(data, i);
            elems.push(elem);
        }
        render.innerHTML = elems.join("\n");
    }
}

const template = (data, id) => {

    if (!data) return '<p>Customer not fount</p>';

    return (`
    <div class="customer-item" id="item-${id}">
        <img height="70px" width="70px" src="images/product_image.jpg" alt="Product image" />
        
        <div style="justify-content: space-between">
            <p>Name: ${data.name}</p>    
            <p>Email: ${data.email}</p>      
            <p>Address: ${data.address}</p>
            <p>Account Type: ${data.userType}</p>
        </div>
        <button onclick="deleteItem('${data._id}')">Delete</button>
</div>  
    `);

}

const deleteItem = (id) => {
    deleteRequest(`http://localhost/api/v1/users/${id}`).then((result) => {
        if (result.ok) {
            alert('Deleted successfully!')
            window.location.replace('view_customers.html');
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
            loadCustomers(0);
        }
    } else {
        window.location.replace('login.html');
    }
}

checkLogin();

window.addEventListener('load', () => {
    checkLogin();
});