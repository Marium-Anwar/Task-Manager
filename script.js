document.addEventListener("DOMContentLoaded", (event) => { //waits until the entire HTML page is loaded
    updateDonut();
});

function updateDonut() { //function that calculates the % of checked checkboxes
    var checkboxes = document.querySelectorAll('.tasks input[type= "checkbox"]');
    var checkedCount = 0; //it will keep track of how many checkboxes are checked.

    //Counting Checked Checkboxes
    checkboxes.forEach(function (checkbox) { //forEach loop goes through each checkbox.
        if(checkbox.checked) {
            checkedCount++;
        }
    });

    //Calculating % and Updating Donut Chart
    var percentage = (checkedCount / checkboxes.length) * 100;
    createRing("ring", percentage); //passing "ring" which is svg id in html, and % as argument
    }

    function createRing(containerId, percentage) { //builds the donut shape
        var container = document.getElementById(containerId);
        var radius = 135;
        var strokeWidth = 30;
        var circumference = 2 * Math.PI * radius; //helps calculate the ring length
        var angle = (percentage / 100) * 360; //determines how much of the ring should be filled based on the %.
        var centerX = 150;
        var centerY = 150;

        var backgroundCircle = document.createElementNS( //SVG circle to serve as the base of the ring
            "http://www.w3.org/2000/svg", "circle"
        );
        backgroundCircle.setAttribute("cx", centerX);
        backgroundCircle.setAttribute("cy", centerY);
        backgroundCircle.setAttribute("r", radius);
        backgroundCircle.setAttribute("stroke", "#0F1121"); //ring's color
        backgroundCircle.setAttribute("stroke-Width", strokeWidth);
        backgroundCircle.setAttribute("fill", "none");
        container.innerHTML = ""; // It clears any existing content inside the container element. This is useful when you want to reset the container’s content before adding new elements, so you don’t get duplicate or outdated elements.
        container.appendChild(backgroundCircle);

        var foregroundCircle = document.createElementNS(
            "http://www.w3.org/2000/svg", "circle"
        );
        foregroundCircle.setAttribute("cx", centerX);
        foregroundCircle.setAttribute("cy", centerY);
        foregroundCircle.setAttribute("r", radius);
        foregroundCircle.setAttribute("stroke", "#87CEEB");
        foregroundCircle.setAttribute("stroke-width", strokeWidth);
        foregroundCircle.setAttribute("fill", "none");
        foregroundCircle.setAttribute("stroke-dasharray", circumference); //sets the circumference, creating a ring effect.
        foregroundCircle.setAttribute("stroke-dashoffset", circumference - (circumference * percentage) / 100); //value that epresents hiden part of the circle.
        foregroundCircle.setAttribute("transform",  "rotate(-90 " + centerX + " " + centerY + ")" //transform rotates the ring to start at the top.
        );
        container.appendChild(foregroundCircle);

        //Adding percentage label ---- e.g 90% that is written at the center.
        var labelText = percentage.toFixed(0) + "%"; //rounds the percentage to a whole number and adds a “%” sign.
        var label = document.createElementNS("http://www.w3.org/2000/svg", "text"); //label is an SVG text element to display labelText in the center of the ring.
        label.setAttribute("x", centerX);
        label.setAttribute("y", centerY + 10); //centerY is vertical center of the circle. +10 shifts the text slightly downward to better align it in the center of the circle
        label.setAttribute("fill", "white");
        label.setAttribute("font-size", "30");
        label.setAttribute("font-weight", "bolder");
        label.setAttribute("text-anchor", "middle");
        label.textContent = labelText;
        container.appendChild(label);
    }
    //Initial Call to Create an Empty Ring
    createRing("ring", 0); //initializes the ring with 0%
    var checkboxes = document.querySelectorAll('.tasks input[type ="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updateDonut);
    });