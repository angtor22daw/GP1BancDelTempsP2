if (window.location.pathname == "/login" || window.location.pathname == "/") {
    localStorage.clear();
}

var form = document.getElementById("myForm");
function formSubmit() {
    form.submit();
}

document.getElementById("submitBtn").addEventListener("click", function (event) {
    var nomUsuari = form.elements["nom"].value;
    localStorage.setItem("nom", nomUsuari);
    console.log(localStorage.getItem("nom"));
    console.log(document.getElementsByName('nom').value);
    event.preventDefault()

    document.getElementById("myForm").submit()
})
