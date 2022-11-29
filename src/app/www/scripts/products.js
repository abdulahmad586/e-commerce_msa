const addProduct = (e) => {
    if (e.preventDefault) e.preventDefault();

    let name = document.getElementById("form_name").value;
    let category = document.getElementById("form_category").value;
    let quantity = document.getElementById("form_quantity").value;
    let price = document.getElementById("form_price").value;

    post('http://localhost/api/v1/products/', { name, category, quantity, price })

        .then((result) => {
            console.log("Response ", result);
            if (result.ok) {
                alert("Product added successfully");
                window.location.replace('add_product.html');
            } else {
                alert(result.message);
            }
        }).catch((error) => {
            alert(error);
        })

    return false;
}
