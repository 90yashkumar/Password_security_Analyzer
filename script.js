// Default Admin Password
if(!localStorage.getItem("adminPassword")){
localStorage.setItem("adminPassword","admin123");
}

// Menu Toggle
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

menuBtn.addEventListener("click", () => {
dropdownMenu.style.display =
dropdownMenu.style.display === "block"
? "none"
: "block";
});

// Show / Hide Password
const passwordInput = document.getElementById("passwordInput");
const showBtn = document.getElementById("showBtn");

showBtn.addEventListener("click", () => {

if(passwordInput.type === "password"){
    passwordInput.type = "text";
    showBtn.innerHTML = "🙈";
}
else{
    passwordInput.type = "password";
    showBtn.innerHTML = "👁";
}

});

// Analyze Password
function analyzePassword(){

let password = passwordInput.value;

if(password.trim() === ""){
    alert("Please enter a password");
    return;
}

let length = password.length;

let upper = /[A-Z]/.test(password);
let lower = /[a-z]/.test(password);
let digit = /[0-9]/.test(password);
let special = /[^A-Za-z0-9]/.test(password);

let score = 0;

if(length >= 8) score++;
if(upper) score++;
if(lower) score++;
if(digit) score++;
if(special) score++;

let strength = "";

const meter =
    document.getElementById("strengthMeter");

const strengthText =
    document.getElementById("strengthText");

if(score <= 2){

    strength = "Weak";

    meter.style.width = "30%";
    meter.style.background = "red";
}

else if(score <= 4){

    strength = "Medium";

    meter.style.width = "65%";
    meter.style.background = "orange";
}

else{

    strength = "Strong";

    meter.style.width = "100%";
    meter.style.background = "green";
}

strengthText.innerHTML =
    "Strength : " + strength;

document.getElementById(
    "analysisResult"
).innerHTML = `
    <b>Length:</b> ${length}<br>
    <b>Uppercase:</b> ${upper ? "Yes":"No"}<br>
    <b>Lowercase:</b> ${lower ? "Yes":"No"}<br>
    <b>Digit:</b> ${digit ? "Yes":"No"}<br>
    <b>Special Character:</b> ${special ? "Yes":"No"}
`;

saveHistory(
    password,
    length,
    strength,
    upper,
    lower,
    digit,
    special
);

// Auto Clear Password
passwordInput.value = "";
passwordInput.type = "password";
showBtn.innerHTML = "👁";

}

// Save History
function saveHistory(
password,
length,
strength,
upper,
lower,
digit,
special
){

let history =
    JSON.parse(
        localStorage.getItem("passwordHistory")
    ) || [];

history.push({
    password,
    length,
    strength,
    upper,
    lower,
    digit,
    special,
    date: new Date().toLocaleString()
});

if(history.length > 50){
    history.shift();
}

localStorage.setItem(
    "passwordHistory",
    JSON.stringify(history)
);

}

// Password Generator
function generatePassword(){

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";

let password = "";

for(let i=0;i<12;i++){

    password += chars.charAt(
        Math.floor(
            Math.random() * chars.length
        )
    );
}

alert(
    "Suggested Password:\n\n" + password
);

saveHistory(
    password,
    password.length,
    "Generated",
    true,
    true,
    true,
    true
);

}

// History Modal
function openHistory(){
document.getElementById(
"historyModal"
).style.display = "flex";
}

function closeHistory(){

document.getElementById(
    "historyModal"
).style.display = "none";

document.getElementById(
    "historyAdminPassword"
).value = "";

document.getElementById(
    "historyContent"
).innerHTML = "";

}

// Verify History
function verifyHistory(){

const entered =
    document.getElementById(
        "historyAdminPassword"
    ).value;

const admin =
    localStorage.getItem(
        "adminPassword"
    );

if(entered !== admin){

    alert("Incorrect Admin Password");

    document.getElementById(
        "historyAdminPassword"
    ).value = "";

    return;
}

const history =
    JSON.parse(
        localStorage.getItem(
            "passwordHistory"
        )
    ) || [];

let html = "";

if(history.length === 0){

    html =
        "<p>No History Found</p>";
}

else{

    history.reverse().forEach(item => {

        html += `
        <div class="history-card">

        <b>Password:</b>
        ${item.password}<br>

        <b>Length:</b>
        ${item.length}<br>

        <b>Strength:</b>
        ${item.strength}<br>

        <b>Uppercase:</b>
        ${item.upper ? "Yes":"No"}<br>

        <b>Lowercase:</b>
        ${item.lower ? "Yes":"No"}<br>

        <b>Digit:</b>
        ${item.digit ? "Yes":"No"}<br>

        <b>Special:</b>
        ${item.special ? "Yes":"No"}<br>

        <b>Date:</b>
        ${item.date}

        </div>
        `;
    });
}

document.getElementById(
    "historyContent"
).innerHTML = html;

document.getElementById(
    "historyAdminPassword"
).value = "";

}

// Delete History
function deleteHistory(){

const entered =
    prompt(
        "Enter Admin Password"
    );

const admin =
    localStorage.getItem(
        "adminPassword"
    );

if(entered !== admin){

    alert(
        "Incorrect Admin Password"
    );

    return;
}

if(confirm(
    "Delete All Password History?"
)){

    localStorage.removeItem(
        "passwordHistory"
    );

    alert(
        "History Deleted Successfully"
    );
}

}

// Admin Settings
function openAdminSettings(){

document.getElementById(
    "adminModal"
).style.display = "flex";

}

function closeAdmin(){

document.getElementById(
    "adminModal"
).style.display = "none";

document.getElementById(
    "currentAdmin"
).value = "";

document.getElementById(
    "newAdmin"
).value = "";

}

// Change Admin Password
function changeAdminPassword(){

const current =
    document.getElementById(
        "currentAdmin"
    ).value;

const newPass =
    document.getElementById(
        "newAdmin"
    ).value;

const admin =
    localStorage.getItem(
        "adminPassword"
    );

if(current !== admin){

    alert(
        "Current Password Incorrect"
    );

    document.getElementById(
        "currentAdmin"
    ).value = "";

    document.getElementById(
        "newAdmin"
    ).value = "";

    return;
}

localStorage.setItem(
    "adminPassword",
    newPass
);

alert(
    "Admin Password Updated Successfully"
);

closeAdmin();

}

// Dark Mode
function toggleTheme(){

document.body.classList.toggle(
    "light-theme"
);

}

// About
function showAbout(){

alert(

`Password Security Analyzer

Features:
• Password Analyzer
• Password Generator
• Password History
• Admin Authentication
• Delete History
• Dark Mode

Developed By Yash`
);
}