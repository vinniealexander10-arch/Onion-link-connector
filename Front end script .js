const API = "/"; // Backend on same server

async function updateStatus(){
    try{
        const res = await fetch(API + "status");
        const data = await res.json();
        document.getElementById("status").textContent = JSON.stringify(data, null, 2);
    }catch(err){
        document.getElementById("status").textContent = "Error connecting to backend.";
    }
}

async function apiCall(endpoint){
    try{
        await fetch(API + endpoint, { method: "POST" });
        updateStatus();
    }catch(err){
        alert("API call failed: "+err);
    }
}

function newProfile(){
    const name = prompt("Enter new profile name:");
    if(name){
        fetch(API + "profiles/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        }).then(updateStatus);
    }
}

function duckSearch(){
    const query = document.getElementById("searchQuery").value.trim();
    if(query){
        window.open("https://duckduckgo.com/?q=" + encodeURIComponent(query), "_blank");
    }
}

updateStatus();
setInterval(updateStatus, 3000);
