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
            // console.log(item.querySelector("link").innerHTML)
            console.log(data.getElementByTagName("enclosure")[0].getAttribute("url"));
            html += `
                <article>
                    <img src="${item.querySelector("link").innerHTML}">
                </article>
            `;
        });
        let targetElement = document.querySelector('.projects-body');
        targetElement.insertAdjacentHTML('beforeend', html);
    });