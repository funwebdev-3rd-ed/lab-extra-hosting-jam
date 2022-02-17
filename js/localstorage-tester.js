document.addEventListener("DOMContentLoaded", function() {
    
    // try retrieving from storage or initialize to empty array if doesn't exist
    const schemeCollection = JSON.parse(sessionStorage.getItem('schemes')) || [];
    
    if (schemeCollection.length > 0) {
        // try retrieving query string
        const urlParams = new URLSearchParams(window.location.search);
        const index = urlParams.get('id');
        if (index && index < schemeCollection.length) {
            displayColors(index);
        } else {
            alert('missing or invalid query string');
        }
        
        
    }
    else {
        alert('colors not set yet');
    }
        
    function displayColors(index) {
        
        const schemeToDisplay = schemeCollection[index];

        document.querySelector('section#color1').style.backgroundColor = schemeToDisplay.color1;
        document.querySelector('section#color2').style.backgroundColor = schemeToDisplay.color2;
        document.querySelector('section#color3').style.backgroundColor = schemeToDisplay.color3;
        document.querySelector('section#color4').style.backgroundColor = schemeToDisplay.color4;
        document.querySelector('section#color5').style.backgroundColor = schemeToDisplay.color5;        
        const sections = document.querySelectorAll('section');
        for (let sec of sections) {
            let span = sec.firstChild;
            span.textContent = colorToHex(sec.style.backgroundColor);
        }
    }

    // author: https://haacked.com/archive/2009/12/29/convert-rgb-to-hex.aspx/
    function colorToHex(color) {
        if (color.substr(0, 1) === '#') {
            return color;
        }
        var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

        var red = parseInt(digits[2]);
        var green = parseInt(digits[3]);
        var blue = parseInt(digits[4]);

        var rgb = blue | (green << 8) | (red << 16);
        return digits[1] + '#' + rgb.toString(16).padStart(6, '0');
    };  
});