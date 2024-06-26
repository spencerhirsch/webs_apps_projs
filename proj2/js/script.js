"use strict";

// Main event listener for when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    const filePath = "data/events.rss";     // link to rss feed
    const eventList = [];                  // Init empty array to store event objects into

    // fetching rss feed
    fetch(filePath)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            // grabbing and iterating through each item in the feed
            const items = data.querySelectorAll("item");

            items.forEach(el => {
                // Store each needed tag into a variable
                const enclosureElement = el.querySelector("enclosure");
                const img = enclosureElement ? enclosureElement.getAttribute("url") : "N/A";

                const title = el.querySelector("title").textContent;
                const startDate = formatDate(el.querySelector("start").textContent);

                const location = el.querySelector("location").textContent;
                const description = el.querySelector("description").textContent;
                // creating event object, and pushing onto the evenList array
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

        // Hook for all "Learn more" button clicks
        ProjectsBody.onclick = function (event) {
            if (event.target.classList.contains("learn-more-link")) {
                toggleDescription(event);
            }
        };
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
        return event.title.toLowerCase().includes(filterValue.toLowerCase());
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

    // Filtering events by description
    function descriptionFilter(event, filterValue) {
        return event.desc.toLowerCase().includes(filterValue.toLowerCase());
    }

    // clear filter button listener
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", function () {
        // Clear filter text
        document.getElementById("title-id").value = "";
        document.getElementById("date-id").value = "";
        document.getElementById("description-id").value = "";

        // Show original event list
        generateArticles(eventList);
    });
});
