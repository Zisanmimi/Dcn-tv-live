document.addEventListener("DOMContentLoaded", loadChannels);

function loadChannels() {
    fetch("channels.json")
        .then(response => response.json())
        .then(data => {
            displayCategories(data);
            displayChannels(data);
        });
}

function displayCategories(channels) {
    let categories = [...new Set(channels.map(channel => channel.category))];
    let nav = document.getElementById("categories");
    nav.innerHTML = categories.map(cat => `<button class="category-btn" onclick="filterByCategory('${cat}')">${cat}</button>`).join("");
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
        });
}

function filterByCategory(category) {
    fetch("channels.json")
        .then(response => response.json())
        .then(data => {
            let filtered = data.filter(channel => channel.category === category);
            displayChannels(filtered);
        });
}

function playChannel(url) {
    window.open(url, "_blank"); // Opens the stream in a new tab
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function reportBrokenLink(channelName) {
    alert(`Report received for: ${channelName}`);
}
