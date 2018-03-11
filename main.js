/* ----- GENERAL FUNCTIONS ----- */

function getID(id){
    return document.getElementById(id)
}

/* ----- GENERAL VARIABLES ----- */

//DIVS
var output = getID('output');
var output2 = getID('output2');

//BUTTONS
const randomizeButton = getID('randomizeButton');
const searchButton = getID('searchButton');
const saveRandomButton = getID('saveRandomButton');
const input = getID('input')

///-----



randomizeButton.addEventListener('click', fetchRandom)

function fetchSearchRes(res){
 console.log(res)   
}
function fetchRandom(){
    
    const randomized = fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    
    randomized.then((response) => {
    return response.json();
    }).then((randomized) => {
        console.log(randomized.meals);
    
        for (const recp of randomized.meals){
            console.log(recp.strMeal);
            const result = recp.strMeal + ' ' + recp.strCategory
            
            
            searchButton.addEventListener('click', function(){
                fetchSearch(recp.strCategory)
            })
            //saveCache(result);
            
        }
        
    }).catch((error) => {
            console.log(error);
    }) 
    
}


function fetchSearch(searchValue){
    const searched = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`)
    
    searched.then((response) => {
    return response.json();
    }).then((searched) => {
        
        console.log(searched.meals);
        //let result = "";
        //for (const recp of searched.meals){
            //console.log(recp.strMeal);
            //result += recp.strMeal
          //  output2.innerText=result
        //}
        
    }).catch((error) => {
        console.log(error);
    }) 
    
} 