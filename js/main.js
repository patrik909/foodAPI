/* ----- GENERAL FUNCTIONS ----- */

function getID(id){
    //Function to fetch elements in index.html.
    return document.getElementById(id);
}

/* ----- GENERAL VARIABLES ----- */

var outputDiv = getID('output');
const randomizeButton = getID('randomize');


//EvenListener for randomize button in index.html
randomizeButton.addEventListener('click', fetchRandom)

function fetchRandom(){
    //Function to fetch random food.
    const randomizedMeal = fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    
    randomizedMeal.then((response) => {
        
        return response.json();
        
    }).then((randomizedMeal) => {

        displayRandom(randomizedMeal)
        
    }).catch((error) => {
        
        displayError(error);
        
    }) 
    
}

function displayRandom(food){
    
    console.log(food.meals);
    
    for(const mealData of food.meals){
        // mealData.strMeal = Meal title
        randomFetchedMeal=`
            <div class="randomWrapper">
                <p>${mealData.strMeal}</p>
                <p>LUCKY, YES?</p>
                <button id="readMore">Show Recipe</button>
                <p>LUCKY, NAH?</p>
                <p>TRY AGAIN</p>
            </div>
        `;  
    }
    
    output.innerHTML=randomFetchedMeal;
    
    const readMoreButton = getID('readMore');
    
}

function fetchFindMore(searchValue){
    const findMoreFood = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`)
    
    findMoreFood.then((response) => {
    return response.json();
    }).then((findMoreFood) => {
        
        console.log(findMoreFood);
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

function fetchInterestingMeal(id){
    
    const interestingMeal = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    
    interestingMeal.then((response) => {
        
        return response.json();
    }).then((interestingMeal) => {

        displayInterestingMeal(interestingMeal)
    }).catch((error) => {
        displayError(error);
    }) 
    
}



            
            
           /* '<p>' + mealData.strMeal + '</p><br><button id="findMore">HITTA FLER RECEPT MED ' + mealData.strCategory + '</button>'*/
        /*
            const findMoreButton = document.addEventListener('click', function(){
        fetchFindMore(mealData.strCategory);
                }) */

       /* for (const recp of randomized.meals){
            console.log(recp.strMeal);
            const result = recp.strMeal + ' ' + recp.strCategory
            
            
            searchButton.addEventListener('click', function(){
                fetchSearch(recp.strCategory)
            })
            //saveCache(result);
            
        }
        
         searchButton.addEventListener('click', function(){
                fetchSearch(recp.strCategory)
            })*/
function displayError(error){
    console.log(error)
}

function fetchSearchRes(res){
 console.log(res)   
}