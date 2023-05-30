serverurl='php/'
produkter=[];

//När fönstret laddar görs funktionerna saveProduct, deleteAllProducts, och deleteCheckedProducts
window.onload = function() {
    getProducts();
    document.getElementById("varabutton").onclick=function() {
        saveProduct();
    }
    document.getElementById("raderaalla").onclick=function(){
        deleteAllProducts();
}
document.getElementById("raderavalda").onclick=function(){
    deleteCheckedProducts();
}
}

//Hämtar alla produkter från databasen
function getProducts() {

    //hämtar data från serverURLen med "hamtaAlla/" som slutet
    fetch(serverurl+'hamtaAlla/')
        //Returnerar svaret som JSON om statusen är 200
        .then(function(response) {
            if(response.status==200) {
                return response.json();
            }
        })
        //När den gjort klart det förra steget kallar den på appendProducts funktionen
        .then(function(data) {
            appendProducts(data);
        })
}

//Skapar raderna och lägger till edit och delete ikonerna
function appendProducts(data){
    console.log(data);
    //Gör "varatable" tom
    tabell=document.getElementById("varatable");
    tabell.innerHTML="";
    
    //Gör en loop som fortsätter tills i är lika långt som data.length
    for(let i=0;i<data.length;i++) {
        //Sätter namn på variablerna "tr", "td" och "input"
        let rad=document.createElement("tr");
        let checkboxtd=document.createElement("td");
        let checkbox=document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        //Om data är checked sätter den checked som 1
        if(data[i].checked){
            checkbox.checked=1;
        }
        //När man clickar på checkboxen gör den funktionen checkProduct
        checkbox.onclick=function(){
            checkProduct(data[i].id);
        }
        checkboxtd.appendChild(checkbox);

        let texttd=document.createElement("td");
        texttd.id="vara"+data[i].id;
        texttd.innerHTML=data[i].namn;

        //Skapar redigera ikonen brevid produkterna och använder "editVaraForm" funktionen då man clickar på den
        let redigeratd = document.createElement("td");
        let redigeraicon = document.createElement("i");
        redigeraicon.classList.add("material-icons");
        redigeraicon.innerHTML = "edit";
        redigeraicon.addEventListener("click", function() {
    editVaraForm(data[i].id);
});
redigeratd.appendChild(redigeraicon);

        //Skapar radera ikonen brevid produkterna och använder "deleteProduct" funktionen då man clickar på den
        let raderatd=document.createElement("td");
        let raderaicon=document.createElement("i");
        raderaicon.classList.add("material-icons");
        raderaicon.innerHTML="delete";
        raderaicon.onclick=function(){
            deleteProduct(data[i].id,data[i])
        }
        raderatd.appendChild(raderaicon);

        //Lägger till checkbox, text, redigera ikonen och radera ikonen i raden
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