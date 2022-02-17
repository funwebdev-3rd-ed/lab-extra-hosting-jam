document.addEventListener("DOMContentLoaded", function() {
    
    // define a few variables referencing key interface elements
    const colorChoosers = document.querySelectorAll('input[type=color]');
    const colorLabels = document.querySelectorAll('fieldset span');
    const schemePreviews = document.querySelectorAll('.scheme-group .scheme');
    const schemeGroup = document.querySelector('article.scheme-group');
    
    // holds collection of user-created schemes ...
    let schemeCollection = retrieveStorage(); 
    
    // set up event handlers
    setUpColorHandlers();
    setupAddSchemeHandler();
    setupResetHandler();
    setupRemoveAllHandler();
        
    // finally display the schemes that have already been defined
    updateSchemePreviews();
    
    
    /* --------------- UTILITY FUNCTIONS  ---------------------- */
    

    // update storage with revised collection
    function updateStorage() {
        sessionStorage.setItem('schemes', JSON.stringify(schemeCollection));
    }
    
    // retrieve from storage or return empty array if doesn't exist
    function retrieveStorage() {        
        return JSON.parse(sessionStorage.getItem('schemes')) || [];
    } 
    
    // removes collection from storage
    function removeStorage() {
        sessionStorage.removeItem('schemes');
    }    
    
    // add html for each scheme to rows in scheme group
    function updateSchemePreviews() {
        // use map to create new array of html for the schemes
        let schemeHTML = schemeCollection.map( (scheme, index) => {
            const template = 
              `<section class="scheme" data-scheme-num="${index}">
                    <div class="preview">
                        <div class="color-box" data-color-num="1" style="background-color:${scheme.color1}"></div>
                        <div class="color-box" data-color-num="2" style="background-color:${scheme.color2}"></div>
                        <div class="color-box" data-color-num="3" style="background-color:${scheme.color3}"></div>
                        <div class="color-box" data-color-num="4" style="background-color:${scheme.color4}"></div>
                        <div class="color-box" data-color-num="5" style="background-color:${scheme.color5}"></div>
                    </div>
                    <div class="actions">
                        <a href="localstorage-tester.html?id=${index}">Test Color Scheme</a>
                    </div>        
                </section>`;      
            return template;
        }).join('');
        // instead of using DOM, to simplify we will simply add the HTML
        schemeGroup.innerHTML = schemeHTML;
    }
    
    
    /* --------------- EVENT HANDLERS  ---------------------- */

    // Defines handler for each color button 
    function setUpColorHandlers() {        
        for (let color of colorChoosers) {
            color.addEventListener('input', (e) => {
                let el = e.target;
                el.nextElementSibling.textContent = el.value;
            });
        }
    }
    
    // Defines handlers fpr the Add to Scheme Collection button
    function setupAddSchemeHandler() {
        document.querySelector('button[type=submit]').addEventListener('click', (e) => {
            // don't try submitting to server
            e.preventDefault();
            
            // define a new scheme to add to collection (could be re-written to use
            // property names + loop, but decided to make it more clear)
            let scheme = {
                color1: colorChoosers[0].value,
                color2: colorChoosers[1].value,
                color3: colorChoosers[2].value,
                color4: colorChoosers[3].value,
                color5: colorChoosers[4].value,
            }            
            // add schemem to collection array
            schemeCollection.push(scheme);
            // update storage with revised collection
            updateStorage();            
            // tell scheme collection to update its display
            updateSchemePreviews();
        });
    }   
    
    // defines handler for Remove All Schemes button
    function setupRemoveAllHandler() {
        document.querySelector('button#btnRemoveAll').addEventListener('click', (e) => {
            // empty the scheme collection
            schemeCollection = [];
            // update local storage and update preview display
            removeStorage(); 
            updateSchemePreviews();                            
        });
    } 
    
    // defines handler for the Reset Scheme button
    function setupResetHandler() {        
        document.querySelector('button[type=reset]').addEventListener('click', (e) => {
            e.preventDefault();
            colorChoosers.forEach( (c) => {
                c.value = "#000000";
            });
            colorLabels.forEach( (s) => {
                s.textContent = "#000000";
            });            
        });
    }
    

});