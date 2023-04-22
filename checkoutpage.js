let ticketprice = document.querySelector(".price");
ticketprice.innerHTML = localStorage.getItem("price");
let num = ticketprice.innerHTML.split(" ");

let conveniencefee = document.querySelector(".convenience-price");
let totalprice = document.getElementById("total-price");
let movietitle = document.querySelector(".movieTitle");
console.log("totalprice=", totalprice);
console.log("movieTitle=", movieTitle);
// var totalpriceofTickets="";
function getnumberofTickets() {

    movietitle.innerHTML = localStorage.getItem("movietitle");

    let totalpriceofTickets = num[1] * (document.getElementById("number").value);
    console.log("totalpriceofTickets=", totalpriceofTickets);
    let fee = (totalpriceofTickets * 1.75) / 100;
    console.log("fee=", fee);
    conveniencefee.innerHTML = "&#8377;" + fee;
    totalprice.innerHTML = "&#8377; " + (totalpriceofTickets + fee);
}

