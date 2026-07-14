import {
    db,
    ref,
    push,
    set
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

        // Upload receipt to Cloudinary
        const formData = new FormData();

        formData.append("file", receipt);

        formData.append("upload_preset", "minecraft_receipts");

        const upload = await fetch(
            "https://api.cloudinary.com/v1_1/phomucim/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await upload.json();

        if (!result.secure_url) {
            throw new Error("Cloudinary upload failed.");
        }

        const receiptUrl = result.secure_url;

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
