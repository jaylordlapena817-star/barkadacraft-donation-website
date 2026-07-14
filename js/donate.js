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

const form = document.getElementById("donationForm");

const showQR = document.getElementById("showQR");

const qrBox = document.getElementById("qrBox");

showQR.onclick = () => {
    qrBox.style.display = "block";
    qrBox.scrollIntoView({
        behavior: "smooth"
    });
};

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const ign = document.getElementById("ign").value.trim();

    const discord = document.getElementById("discord").value.trim();

    const reference = document.getElementById("reference").value.trim();

    const message = document.getElementById("message").value.trim();

    const months = document.getElementById("months").value;

    const receipt = document.getElementById("receipt").files[0];

    if (!receipt) {
        alert("Please upload your payment receipt.");
        return;
    }

    try {

        const fileName = Date.now() + "_" + receipt.name;

        const receiptRef = storageRef(storage, "receipts/" + fileName);

        await uploadBytes(receiptRef, receipt);

        const receiptUrl = await getDownloadURL(receiptRef);

        const donationRef = push(ref(db, "donations"));

        const amount =
            months == "1" ? 150 :
            months == "2" ? 300 :
            months == "3" ? 450 : 0;

        await set(donationRef, {

            ign,

            discord,

            type: "Extend Time",

            currentPlan: "Saver I",

            selectedPlan: "",

            duration: months + " Month(s)",

            amount,

            reference,

            message,

            receiptUrl,

            status: "Pending",

            createdAt: new Date().toISOString()

        });

        alert("Donation submitted successfully! Please wait for admin verification.");

        form.reset();

        qrBox.style.display = "none";

    } catch (err) {

        console.error(err);

        alert("Failed to submit donation.");

    }

});
