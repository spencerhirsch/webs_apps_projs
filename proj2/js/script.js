document.addEventListener('DOMContentLoaded', function() {
    const filePath = "data/events.rss";
    let eventList = [];

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
                const tempDate = el.querySelector("start").textContent;
                
                /* Debugging to make sure I grabbed it all correctly
                console.log("Image src:", img);
                console.log("Title:", title);
                console.log("Start Date: ", formattedStartDate);
                console.log("Location:", location);
                console.log("Description: ", description);
                */

                // Convert date to MMMM, dd, YYYY, TZD
                const startDate = new Date(tempDate);
                const options = {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    timeZoneName: 'short'
                };

                const formattedStartDate = startDate.toLocaleDateString('en-US', options);

                const location = el.querySelector("location").textContent;
                const description = el.querySelector("description").textContent;

                const event = {
                    img: img,
                    title: title,
                    date: formattedStartDate,
                    location: location,
                    desc: description
                };
                eventList.push(event);
            });

            generateArticles(eventList);
        });

    function toggleDescription(event) {
        event.preventDefault();
        const description = event.target.nextElementSibling;
        description.classList.toggle('visible');
    }

    function generateArticles(eventList) {
        console.log(eventList);
        console.log(eventList[0]);
        let html = '';
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
        const ProjectsBody = document.getElementById('cardId');
        ProjectsBody.innerHTML = html;

        ProjectsBody.addEventListener('click', function (event) {
            if (event.target.classList.contains('learn-more-link')) {
                toggleDescription(event);
            }
        });

        // submit button listener
        const submitButton = document.getElementById('submit');
        submitButton.addEventListener('click', function() {
            // Get filter values from input fields
            const descriptionFilterValue = document.getElementById('description-id').value.trim();

            console.log(descriptionFilterValue);
            
            // Filter events based on input values
            let filteredEvents = eventList;
            filteredEvents = eventFilter(filteredEvents, descriptionFilterValue, filterByDesc);

            generateArticles(filteredEvents);
        });
    }

    // eventFilter function
    function eventFilter(events, filterValue, filterFunction) {
        if (!filterValue) return events; 
        return events.filter(event => filterFunction(event, filterValue));
    }

    // filtering events by description
    function filterByDesc(event, filterValue) {
        return event.desc.toLowerCase().includes(filterValue.toLowerCase());
    }
});
