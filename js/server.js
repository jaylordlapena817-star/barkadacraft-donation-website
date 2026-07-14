import { db } from "./firebase.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


const countdown = document.getElementById("countdown");

const currentPlan = document.getElementById("currentPlan");


onValue(ref(db,"server"),(snapshot)=>{


const data = snapshot.val();


if(!data){

countdown.innerHTML="No server data";

return;

}


countdown.innerHTML =
"🟢 Server Time Left: "
+ data.daysLeft +
" Days";


currentPlan.innerHTML =
data.currentPlan || "None";


});
