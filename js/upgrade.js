import {
db,
storage,
ref,
push,
set,
storageRef,
uploadBytes,
getDownloadURL
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

const reference=document.getElementById("reference").value;

const message=document.getElementById("message").value;

const receipt=document.getElementById("receipt").files[0];

let amount=0;

if(plan=="Saver II") amount=200;

if(plan=="Super Saver") amount=250;

if(plan=="Saver X") amount=380;

if(plan=="Eco Silver") amount=600;

const fileName=Date.now()+"_"+receipt.name;

const imgRef=storageRef(storage,"receipts/"+fileName);

await uploadBytes(imgRef,receipt);

const receiptUrl=await getDownloadURL(imgRef);

const data=push(ref(db,"donations"));

await set(data,{

type:"Upgrade",

currentPlan:"Saver I",

selectedPlan:plan,

amount,

ign,

discord,

reference,

message,

receiptUrl,

status:"Pending",

createdAt:new Date().toISOString()

});

alert("Upgrade request submitted!");

form.reset();

box.style.display="none";

});
