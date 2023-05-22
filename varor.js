
function saveProduct() {
    let varanode=document.getElementById('varainput');
    let vara=varanode.value;

    if (vara.trim() != "") {
        let FD=new FormData();
        FD.append("vara", vara);

        fetch(serverurl+'sparaVara.php',
        {
            method:'POST',
            body:FD
        })
        .then(function(response) {
            if(response.status==200) {
                return response.json();
            }
        })
        .then(function(data) {
            getProducts();
        })
    }
    varanode.innerHTML="";
}

function editVaraForm(id) {
    document.getElementById("varainput").value=document.getElementById("vara"+id).innerHTML;
    document.getElementById("varabutton").onclick=function() {
        editProduct(id);
    }
    document.getElementById("varabutton").innerHTML="Spara";
}

function editProduct(id) {
    let varanode=document.getElementById('varainput');
    let vara=varanode.value;

    if (vara.trim() != "") {
        let FD=new FormData();
        FD.append("vara", vara);
        FD.append("id", id);

        fetch(serverurl+'uppdateraVara.php',
        {
            method:'POST', 
            body:FD
        })
        .then(function(response) {
            if(response.status==200) {
                return response.json();
            }
        })
        .then(function(data) {
            getProducts();
        })
    }
    varanode.value="";
    document.getElementById("varabutton").onclick=function() {
        saveProduct();
    }
    document.getElementById("varabutton").innerHTML="Lägg till";
}