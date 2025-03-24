document.addEventListener("DOMContentLoaded", loadChannels);

function loadChannels() {
    fetch("channels.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load channels.json");
            }
            return response.json();
        })
        .then(data => {
            displayCategories(data);
            displayChannels(data);
        })
        .catch(error => console.error("Error loading channels:", error));
}

function displayCategories(channels) {
    let categories = [...new Set(channels.map(channel => channel.category))];
    let nav = document.getElementById("categories");
    nav.innerHTML = categories.map(cat => `<button onclick="filterByCategory('${cat}')">${cat}</button>`).join("");
}

function displayChannels(channels) {
    let list = document.getElementById("channel-list");
    list.innerHTML = channels.map(channel => `
        <div class="channel" onclick="playChannel('${channel.stream_url}')">
            <img src="${channel.logo}" alt="${channel.name} Logo" class="channel-logo">
            <h3>${channel.name}</h3>
            <p>${channel.category}</p>
            <button onclick="event.stopPropagation(); reportBrokenLink('${channel.name}')">Report</button>
        </div>
    `).join("");
}

function filterChannels() {
    let query = document.getElementById("search").value.toLowerCase();
    fetch("channels.json")
        .then(response => response.json())
        .then(data => {
            let filtered = data.filter(channel => channel.name.toLowerCase().includes(query));
            displayChannels(filtered);
        })
        .catch(error => console.error("Error filtering channels:", error));
}

function filterByCategory(category) {
    fetch("channels.json")
        .then(response => response.json())
        .then(data => {
            let filtered = data.filter(channel => channel.category === category);
            displayChannels(filtered);
        })
        .catch(error => console.error("Error filtering by category:", error));
}

function playChannel(url) {
    if (!url || url === "undefined") {
        alert("Stream not available!");
        console.error("Invalid channel URL:", url);
        return;
    }
    console.log("Opening Channel URL:", url);
    window.open(url, "_blank");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function reportBrokenLink(channelName) {
    alert(`Report received for: ${channelName}`);
}
