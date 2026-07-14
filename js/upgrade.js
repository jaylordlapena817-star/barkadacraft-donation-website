import {
db,
ref,
push,
set
} from "./firebase.js";


const form = document.getElementById("upgradeForm");

const qr = document.getElementById("showQR");

const box = document.getElementById("qrBox");


qr.onclick = () => {

    box.style.display = "block";

};


form.addEventListener("submit", async(e)=>{

e.preventDefault();


const plan=document.getElementById("plan").value;

const ign=document.getElementById("ign").value;

const discord=document.getElementById("discord").value;



const message=document.getElementById("message").value;

const receipt=document.getElementById("receipt").files[0];


let amount=0;


if(plan=="Saver II") amount=200;

if(plan=="Super Saver") amount=250;

if(plan=="Saver X") amount=380;

if(plan=="Eco Silver") amount=600;



// Upload to Cloudinary

const cloudinaryData = new FormData();

cloudinaryData.append("file", receipt);

cloudinaryData.append(
"upload_preset",
"minecraft_receipts"
);


const upload = await fetch(
"https://api.cloudinary.com/v1_1/phomucim/image/upload",
{
method:"POST",
body:cloudinaryData
}
);


const cloudinaryResult = await upload.json();


const receiptUrl = cloudinaryResult.secure_url;



// Save to Firebase Database

const data = push(ref(db,"donations"));


await set(data,{

type:"Upgrade",

currentPlan:"Saver I",

selectedPlan:plan,

amount,

ign,

discord,

message,

receiptUrl,

status:"Pending",

createdAt:new Date().toISOString()

});


alert("Upgrade request submitted!");


form.reset();

box.style.display="none";


});
