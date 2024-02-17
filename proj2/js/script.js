const filePath = "data/events.rss"
const eventList = [];

fetch(filePath)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        // console.log(data);
        const items = data.querySelectorAll("item");
        let html = '';

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

        console.log(eventList);
        console.log(eventList[0]);

    });
