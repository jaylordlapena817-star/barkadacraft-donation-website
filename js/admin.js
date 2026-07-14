import { db, auth } from "./firebase.js";

import {
    ref,
    onValue,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const donationList = document.getElementById("donationList");

const total = document.getElementById("total");
const pending = document.getElementById("pending");
const verified = document.getElementById("verified");
const invalid = document.getElementById("invalid");

const search = document.getElementById("search");

const logout = document.getElementById("logout");

let donations = [];

logout.onclick = async () => {

    await signOut(auth);

    location.href = "admin-login.html";

};

onValue(ref(db, "donations"), (snapshot) => {

    donations = [];

    snapshot.forEach((child) => {

        donations.push({

            id: child.key,

            ...child.val()

        });

    });

    render();

});

function render() {

    donationList.innerHTML = "";

    let t = 0;
    let p = 0;
    let v = 0;
    let i = 0;

    const keyword = search.value.toLowerCase();

    donations.forEach((data) => {

        t++;

        if (data.status == "Pending") p++;

        if (data.status == "Verified") v++;

        if (data.status == "Invalid") i++;

        if (
            keyword &&
            !data.ign.toLowerCase().includes(keyword)
        ) return;

        donationList.innerHTML += `

<div class="card">

<h2>${data.ign}</h2>

<p><b>Type:</b> ${data.type}</p>

<p><b>Amount:</b> ₱${data.amount}</p>

<p><b>Status:</b> ${data.status}</p>

<p><b>Date:</b> ${data.createdAt}</p>

<img
src="${data.receiptUrl}"
style="
width:100%;
max-width:300px;
border-radius:10px;
margin-top:15px;
">

<br><br>

<button class="verify"
data-id="${data.id}">

Verify

</button>

<button class="invalid"
data-id="${data.id}">

Invalid

</button>

<button class="delete"
data-id="${data.id}">

Delete

</button>

</div>

`;

    });

    total.innerHTML = t;

    pending.innerHTML = p;

    verified.innerHTML = v;

    invalid.innerHTML = i;

}

search.oninput = render;
