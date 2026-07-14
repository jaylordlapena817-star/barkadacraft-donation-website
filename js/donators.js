import { db } from "./firebase.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const list=document.getElementById("donatorList");

const total=document.getElementById("total");

const search=document.getElementById("search");

let donations=[];

onValue(ref(db,"donations"),(snapshot)=>{

donations=[];

snapshot.forEach((child)=>{

const data=child.val();

if(data.status==="Verified"){

donations.push(data);

}

});

render();

});

function render(){

list.innerHTML="";

let count=0;

const keyword=search.value.toLowerCase();

donations.forEach(data=>{

if(!data.ign.toLowerCase().includes(keyword)) return;

count++;

list.innerHTML+=`

<div class="card">

<h2>${data.ign}</h2>

<p>${data.type}</p>

<p>₱${data.amount}</p>

<p>${data.createdAt}</p>

</div>

`;

});

total.innerHTML="Total Verified Donators: "+count;

}

search.oninput=render;
