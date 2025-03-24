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
        <div class="channel" onclick="playChannel('${channel.link}')">
            <h3>${channel.name}</h3>
            <p>${channel.category}</p>
            <button onclick="reportBrokenLink('${channel.name}'); event.stopPropagation();">Report</button>
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

function playChannel(link) {
    window.open(link, "_blank");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function reportBrokenLink(channelName) {
    alert(`Report received for: ${channelName}`);
}
