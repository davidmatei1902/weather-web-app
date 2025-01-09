// Register a listener for the DOMContentLoaded event. This is triggered when the HTML is loaded and the DOM is constructed.
// We are doing this because the script is loaded in the head of the document, so the DOM is not yet constructed when the script is executed.
document.addEventListener("DOMContentLoaded", (_event) => {
    alert("After DOM has loaded");
    // todo: Add code here that updates the HTML, registers event listeners, calls HTTP endpoints, etc.

    let availableKeywords = [
        'phrase 1',
        'how to use a shovel',
        'what year is now?',
        'what month is special?',
        'how to send stuff to friends',
        'loremipsum',
        'love',
    ];

    const resultBox = document.querySelector(".result-box");
    const inputBox = document.getElementById("input-box");

    inputBox.onkeyup = function() {
        let result = [];
        let input = inputBox.value;
        if(input.length)
        {
            result = availableKeywords.filter((keyword) => {
               return keyword.toLowerCase().includes(input.toLowerCase());
            });
            console.log(result);
        }
        display(result);
    }

    function display(result) {
        const content = result.map((list) => {
            return "<li>" + list + "</li>" 
        });

        resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
    }

    resultBox.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            inputBox.value = event.target.innerHTML;
        }
    });
});
