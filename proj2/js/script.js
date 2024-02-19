"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const filePath = "data/events.rss";
    const eventList = [];

    fetch(filePath)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll("item");

            items.forEach(el => {
                // Store each needed tag into a variable
                const enclosureElement = el.querySelector("enclosure");
                const img = enclosureElement ? enclosureElement.getAttribute("url") : "N/A";

                const title = el.querySelector("title").textContent;
                const startDate = formatDate(el.querySelector("start").textContent);

                const location = el.querySelector("location").textContent;
                const description = el.querySelector("description").textContent;

                const event = {
                    img: img,
                    title: title,
                    date: startDate,
                    location: location,
                    desc: description
                };
                eventList.push(event);
            });

            generateArticles(eventList);
        });


    // Convert date to MMMM, dd, YYYY, TZD
    function formatDate(text) {
        const startDate = new Date(text);
        const options = {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZoneName: "short"
        };

        return startDate.toLocaleDateString("en-US", options);
    }

    function toggleDescription(event) {
        event.preventDefault();
        const description = event.target.nextElementSibling;
        description.classList.toggle("visible");
    }

    function generateArticles(eventList) {
        console.log(eventList);
        console.log(eventList[0]);
        let html = "";
        eventList.forEach(event => {
            html += `
                <article class="card">
                    <img src="${event.img}" />
                    <h5>${event.title}</h5>
                    <p>${event.date}</p>
                    <p>${event.location}</p>
                    <a href="#" class="learn-more-link">Learn more</a>
                    <div class="event-description hidden">${event.desc}</div>
                </article>
            `;
        });

        const ProjectsBody = document.getElementById("cardId");
        ProjectsBody.innerHTML = html;

        ProjectsBody.addEventListener("click", function (event) {
            if (event.target.classList.contains("learn-more-link")) {
                toggleDescription(event);
            }
        });
    }

    // submit button listener
    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function () {
        // Filter parameters
        const filterObj = {
            "title": document.getElementById("title-id").value.trim(),
            "startDate": document.getElementById("date-id").value.trim(),
            "description": document.getElementById("description-id").value.trim()
        };

        // Filter events based on input values
        let resultObjs = eventList;
        resultObjs = eventFilter(resultObjs, filterObj.title, titleFilter);
        resultObjs = eventFilter(resultObjs, filterObj.startDate, dateFilter);
        resultObjs = eventFilter(resultObjs, filterObj.description, descriptionFilter);
        generateArticles(resultObjs);
    });

    // eventFilter function
    function eventFilter(events, filterValue, filterFunction) {
        if (!filterValue) return events;
        return events.filter(event => filterFunction(event, filterValue));
    }

    // Filtering events based on title
    function titleFilter(event, filterValue) {
        // TODO
        return true;
    }

    // Filtering events based on date
    function dateFilter(event, filterValue) {
        const filterDate = new Date(filterValue);
        const eventDate = new Date(event.date.replace("at EST", ""));

        // Day/month/year must match
        return filterDate.getDate() == eventDate.getDate()
            && filterDate.getMonth() == eventDate.getMonth()
            && filterDate.getFullYear() == eventDate.getFullYear();
    }

    // filtering events by description
    function titleFilter(event, filterValue) {
        return event.desc.toLowerCase().includes(filterValue.toLowerCase());
    }    

    // filtering events by description
    function descriptionFilter(event, filterValue) {
        return event.desc.toLowerCase().includes(filterValue.toLowerCase());
    }
});
