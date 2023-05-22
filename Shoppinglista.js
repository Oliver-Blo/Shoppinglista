serverurl='php/'
produkter=[];

window.onload = function() {
    getProducts();
    document.getElementById("varabutton").onclick=function() {
        saveProduct();
    }

}


function getProducts() {
    //radera vid fungerande php
    appendProducts(produkter);


    fetch(serverurl+'hamtaAlla/')
        .then(function(response) {
            if(response.status==200) {
                return response.json();
            }
        })
        .then(function(data) {
            appendProducts(data);
        })
}

function appendProducts(data){
    console.log(data);
    tabell=document.getElementById("varatable");
    tabell.innerHTML="";

    for(let i=0;i<data.length;i++) {
        let rad=document.createElement("tr");

        let checkboxtd=document.createElement("td");
        let checkbox=document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.onclick=function(){
            checkProduct(data.id);
        }
        checkboxtd.appendChild(checkbox);

        let texttd=document.createElement("td");
        texttd.innerHTML=data[i].namn;

        let redigeratd=document.createElement("td");
        let redigeraicon=document.createElement("i");
        redigeraicon.classList.add("material-icons");
        redigeraicon.innerHTML="edit";
        redigeraicon.onclick=function(){
            editProduct(data[i].id)
        }
        redigeratd.appendChild(redigeraicon);
        
        let raderatd=document.createElement("td");
        let raderaicon=document.createElement("i");
        raderaicon.classList.add("material-icons");
        raderaicon.innerHTML="delete";
        raderaicon.onclick=function(){
            deleteProduct(data[i].id)
        }
        raderatd.appendChild(raderaicon);

        rad.appendChild(checkboxtd);
        rad.appendChild(texttd);
        rad.appendChild(redigeratd);
        rad.appendChild(raderatd);
        tabell.appendChild(rad);
    }

}






/*
<tr>
    <td><input type="checkbox"></td>
    <td>Frukt</td>
    <td><i class="material-icons">edit</i></td>
    <td><i class="material-icons">delete</i></td>
</tr>
*/