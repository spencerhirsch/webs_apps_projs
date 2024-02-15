filePath = "events.rss"

fetch(filePath)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        console.log(data);
        const items = data.querySelectorAll("item");
        items.forEach(item => {
            console.log(item)
        })
    });