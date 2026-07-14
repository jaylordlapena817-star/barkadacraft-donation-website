import { db, auth } from "./firebase.js";


import {
    ref,
    onValue,
    update,
    remove,
    set
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    if (!user) {

        location.href = "admin-login.html";

    }

});
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

<h2>⛏ ${data.ign}</h2>

<p><b>Type:</b> ${data.type || "N/A"}</p>

<p><b>Discord:</b> ${data.discord || "N/A"}</p>

<p><b>Duration:</b> ${data.duration || "N/A"}</p>

<p><b>Amount:</b> ₱${data.amount || 0}</p>

<p><b>Message:</b> ${data.message || "No message"}</p>

<p><b>Status:</b> ${data.status}</p>

<p><b>Date:</b> ${new Date(data.createdAt).toLocaleString()}</p>

<img
src="${data.receiptUrl}"
class="receipt-img"
onclick="window.open('${data.receiptUrl}','_blank')"
>

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

document.addEventListener("click", async (e) => {

    const id = e.target.dataset.id;

    if (!id) return;

    // Verify
    if (e.target.classList.contains("verify")) {

        if (!confirm("Verify this payment?")) return;

        await update(ref(db, "donations/" + id), {

            status: "Verified",
            verifiedAt: new Date().toISOString()

        });

        alert("Payment Verified!");

    }

    // Invalid
    if (e.target.classList.contains("invalid")) {

        const reason = prompt("Reason (Optional):") || "";

        await update(ref(db, "donations/" + id), {

            status: "Invalid",
            invalidReason: reason

        });

        alert("Payment marked as Invalid!");

    }

    // Delete
    if (e.target.classList.contains("delete")) {

        if (!confirm("Delete this donation?")) return;

        await remove(ref(db, "donations/" + id));

        alert("Donation deleted!");

    }

});

const saveServer = document.getElementById("saveServer");


saveServer.onclick = async()=>{


const daysLeft =
document.getElementById("daysLeft").value;


const currentPlan =
document.getElementById("currentPlan").value;


if(!daysLeft){

alert("Please enter days left!");

return;

}


const expireDate =
Date.now() + (Number(daysLeft) * 24 * 60 * 60 * 1000);

await set(ref(db,"server"),{

expireDate,

currentPlan,

updatedAt: new Date().toISOString()

});


alert("Server status updated!");

};
