import { db } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


// SERVER PLANS

const plans = {

    "Saver I":{
        ram:"3GB",
        cpu:"2 vCores",
        storage:"15GB NVMe SSD",
        location:"Manila, PH"
    },

    "Saver II":{
        ram:"4GB",
        cpu:"2 vCores",
        storage:"20GB NVMe SSD",
        location:"Manila, PH"
    },

    "Super Saver":{
        ram:"6GB",
        cpu:"3 vCores",
        storage:"30GB NVMe SSD",
        location:"Manila, PH"
    },

    "Saver X":{
        ram:"8GB",
        cpu:"4 vCores",
        storage:"35GB NVMe SSD",
        location:"Manila, PH"
    },

    "Eco Silver":{
        ram:"16GB",
        cpu:"4 vCores",
        storage:"40GB NVMe SSD",
        location:"Manila, PH"
    }

};



const countdown =
document.getElementById("countdown");


const currentPlan =
document.getElementById("currentPlan");


const serverSpecs =
document.getElementById("serverSpecs");



function startCountdown(expireDate){


    setInterval(()=>{


        const now = Date.now();


        const distance = expireDate - now;



        if(distance <= 0){

            countdown.innerHTML =
            "🔴 Server Expired";

            return;

        }



        const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );



        const hours =
        Math.floor(
            (distance %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );



        const minutes =
        Math.floor(
            (distance %
            (1000 * 60 * 60)) /
            (1000 * 60)
        );



        const seconds =
        Math.floor(
            (distance %
            (1000 * 60)) /
            1000
        );



        countdown.innerHTML =

        `
        🟢 Server Time Left:<br>
        ${days} Days 
        ${hours} Hours 
        ${minutes} Minutes 
        ${seconds} Seconds
        `;



    },1000);


}




onValue(ref(db,"server"),(snapshot)=>{


    const data = snapshot.val();



    if(!data){


        countdown.innerHTML =
        "No server data";


        return;

    }




    // COUNTDOWN

    if(data.expireDate){

        startCountdown(
            data.expireDate
        );

    }




    // CURRENT PLAN

    currentPlan.innerHTML =
    data.currentPlan || "None";





    // SERVER SPECS


    const plan =
    plans[data.currentPlan];



    if(plan){


        serverSpecs.innerHTML = `

        💾 RAM: ${plan.ram}<br>

        ⚙ CPU: ${plan.cpu}<br>

        💽 Storage: ${plan.storage}<br>

        📍 Location: ${plan.location}

        `;


    }else{


        serverSpecs.innerHTML =
        "No plan specs available";


    }



});
