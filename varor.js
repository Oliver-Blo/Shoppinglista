//Skapar en ny vara när man trycker på Lägg till knappen på sidan, men endast om den inte är tom
function saveProduct() {
    //Hämtar det som står i "varainput" fältet
    let varanode = document.getElementById('varainput');
    let vara = varanode.value;

    //Om fältet inte är tomt gör den resten av det som står
    if (vara.trim() != "") {
        let FD = new FormData();
        FD.append("vara", vara);

        //fetchar sparaVara som POST
        fetch(serverurl + 'sparaVara.php', {
            method: 'POST',
            body: FD
        })
        //Om den svarar med status 200 returnerar den svaret som JSON
        .then(function(response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        //När det förra steget är klart uppdaterar den produkterna
        .then(function(data) {
            getProducts();
        });
    }
    //Ändrar tillbaka fältet som tomt
    varanode.value = ""; 
}

//När man trycker på edit knappen så far varan man valt till ett fält för att man ska kunna ändra på det
function editVaraForm(id) {
    //Skickar varan till fältet
    document.getElementById("varainput").value = document.getElementById("vara" + id).innerHTML;
    document.getElementById("varabutton").onclick = function() {
        editProduct(id);
    };
    //Ändrar "Lägg till" knappen till "Spara" knapp
    document.getElementById("varabutton").innerHTML = "Spara";
}

//När man trycker på spara knappen efter att man har ändrat på en vara kommer den även ändras i listan och databasen
function editProduct(id) {
    //Hämtar det som står i "varainput" och sätter det i variabeln "vara"
    let varanode = document.getElementById('varainput');
    let vara = varanode.value;

    //Om fältet inte är tomt gör den resten av det som står
    if (vara.trim() != "") {
        let FD = new FormData();
        FD.append("vara", vara);
        FD.append("id", id);

        //Fetchar uppdateraVara som POST
        fetch(serverurl + 'uppdateraVara.php', {
            method: 'POST',
            body: FD
        })
        //När det är klart returnerar den ett svar som JSON om statuset är 200
        .then(function(response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        //Om det förra lyckades uppdaterar det produktlistan
        .then(function(data) {
            getProducts();
        });
        //Ändrar tillbaka fältet som tomt
        varanode.value = "";
    }
    //Trycker man på "Spara" knappen görs funktionen "saveProduct"
    document.getElementById("varabutton").onclick = function() {
        saveProduct();
    };
    //Ändrar tillbaka knappen till "Lägg till" från "Spara"
    document.getElementById("varabutton").innerHTML = "Lägg till";
}

//Raderar en produkt efter att man har svarat ja på en "confirm" fråga som kommer fram då man trycker på soptunnan
function deleteProduct(id, product) {

    //Om man svarar ja på confirmen gör den resten av det som står
    if(confirm("Vill du radera "+product.namn+"?")){
    let FD = new FormData();
    FD.append("id", id);
    
    //Fetchar raderaVara som POST
    fetch(serverurl + 'raderaVara.php', {
        method: 'POST',
        body: FD
    })
    //Returnerar svaret som JSON om statuset är 200
    .then(function(response) {
        if (response.status == 200) {
            return response.json();
        }
    })
    //Om det förra lyckades uppdaterar det produktlistan
    .then(function(data) {
        getProducts();
    });
}}

//Raderar alla produkter efter att man har svart ja på en "confirm" fråga som kommer fram då man trycker på Radera alla knappen
function deleteAllProducts() {

    //Om man svarar ja på confirmen gör den resten av det som står
    if(confirm("Vill du radera alla varor?")){

    //Fetchar raderaAllaVaror som POST
        fetch(serverurl + 'raderaAllaVaror.php', {
            method: 'POST'
        })
        //Returnerar svaret som JSON om statuset är 200
        .then(function(response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        //Om det förra lyckades uppdaterar det produktlistan
        .then(function(data) {
            getProducts();
    });
}}

//Kryssar för en vara då man trycker på checkboxen brevid
function checkProduct(id) {
    let FD = new FormData();
    FD.append("id", id);

    //fetchar kryssaVara som POST
    fetch(serverurl + 'kryssaVara.php', {
        method: 'POST',
        body: FD
    })
    //Returnerar svaret som JSON om statuset är 200
    .then(function(response) {
        if (response.status == 200) {
            return response.json();
        }
    })
    //Om det förra lyckades uppdaterar det produktlistan
    .then(function(data) {
        getProducts();
    });
}

//Raderar alla ikryssade produkter efter att man svarar ja på en "confirm" fråga som kommer upp då man trycker på Radera valda
function deleteCheckedProducts() {

    //Om man svarar på confirmen gör den resten av det som står
    if(confirm("Vill du radera valda varor?")){
    
        //fetchar raderaValda som POST
        fetch(serverurl + 'raderaValda.php', {
            method: 'POST'
        })
        //Returnerar svaret som JSON om statuset är 200
        .then(function(response) {
            if (response.status == 200) {
                return response.json();
            }
        })
        //Om det förra lyckades uppdaterar det produktlistan
        .then(function(data) {
            getProducts();
        });
}}