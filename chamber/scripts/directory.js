const url = "data/members.json";
const cards = document.querySelector("#members");

async function getMembers(){
const response = await fetch(url);
const data = await response.json();
displayMembers(data);
}

getMembers();

function displayMembers(members){

members.forEach(member => {

let card = document.createElement("section");
card.classList.add("card");

let name = document.createElement("h3");
name.textContent = member.name;

let address = document.createElement("p");
address.textContent = member.address;

let phone = document.createElement("p");
phone.textContent = member.phone;

let link = document.createElement("a");
link.href = member.website;
link.textContent = "Visit Website";

let image = document.createElement("img");
image.src = member.image;
image.alt = member.name;

card.appendChild(image);
card.appendChild(name);
card.appendChild(address);
card.appendChild(phone);
card.appendChild(link);

cards.appendChild(card);

});
}

document.querySelector("#grid").addEventListener("click", ()=>{
cards.classList.add("grid");
cards.classList.remove("list");
});

document.querySelector("#list").addEventListener("click", ()=>{
cards.classList.add("list");
cards.classList.remove("grid");
});


// Hamburger Menu JS
const ham = document.querySelector("#menu");
const nav = document.querySelector(".navigation");

ham.addEventListener("click", ()=>{
nav.classList.toggle("open");
});