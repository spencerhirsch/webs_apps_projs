document.addEventListener('DOMContentLoaded', function() {
    const filePath = "data/events.rss"
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
                const tempDate = el.querySelector("start").textContent;

                // Convert date to  MMMM, dd, YYYY, TZD
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

                /* Debugging to make sure I grabbed it all correctly
                console.log("Image src:", img);
                console.log("Title:", title);
                console.log("Start Date: ", formattedStartDate);
                console.log("Location:", location);
                console.log("Description: ", description);
                */

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
                <article>
                    <img src="${event.img}" />
                    <h5>${event.title}</h5>
                    <p>${event.date}</p>
                    <p>${event.location}</p>
                    <a href="#" class="learn-more-link">Learn more</a>
                    <div class="event-description hidden">${event.desc}</div>
                </article>
            `;
        });
        const ProjectsBody = document.getElementById('projects-body');
        ProjectsBody.innerHTML += html;

        ProjectsBody.addEventListener('click', function (event) {
            if (event.target.classList.contains('learn-more-link')) {
                toggleDescription(event);
            }
        });
    }
});