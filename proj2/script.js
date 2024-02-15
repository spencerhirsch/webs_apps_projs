filePath = "events.rss"

fetch(filePath)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        // console.log(data);
        const items = data.querySelectorAll("item");
        let html = ``;
        items.forEach(item => {
            // console.log(item)
            html += `
                <article>
                    <img src="${item.querySelector("link").innerHTML}">
                </article>
            `;
        });
        let targetElement = document.querySelector('.projects-body');
        targetElement.insertAdjacentHTML('beforeend', html);
    });