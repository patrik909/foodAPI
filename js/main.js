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

/* ------ FETCHES ------ */

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

function fetchRelatedFood(searchValue){
    //Function to fetch more recipes by category.
    const relatedFood = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`);
    
    relatedFood.then((response) => {
        
        return response.json();
        
    }).then((relatedFood) => {

        displayRelated(relatedFood)
        
    }).catch((error) => {
        
        displayError(error);
        
    }) 
    
}

function fetchReadMoreRelated(id){
    //Function to fetch more information of choosen recipe by id.
    const readMoreRelatedRecipe = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    
    readMoreRelatedRecipe.then((response) => {
        
        return response.json();
        
    }).then((readMoreRelatedRecipe) => {

        displayReadMoreRelated(readMoreRelatedRecipe)
        
    }).catch((error) => {
        
        displayError(error);
        
    }) 
}

/* ------ DISPLAYS ------ */

function displayRandom(food){
    
    for(const mealData of food.meals){
        // mealData.strMeal = Meal title
        randomFetchedMeal=`
            <div class="randomWrapper">
                <p>${mealData.strMeal}</p>
                <p>LUCKY, YES?</p>
                <button id="readMoreRandom">Show Recipe</button>
                <p>LUCKY, NAH?</p>
                <p>TRY AGAIN</p>
            </div>
        `;  
    }
    
    output.innerHTML=randomFetchedMeal;
    //Adds the content to index.html.
    
    const readMoreRandomButton = getID('readMoreRandom');
    
    readMoreRandomButton.addEventListener('click', function(){
       displayReadMoreRandom(food) 
    });
    
}

function displayRelated(food){
    let relatedTitles = ""
    
    //console.log(food.meals.length)
    for(const mealData of food.meals){
        relatedTitles+=`
            <div class="">
                ${mealData.strMeal}
                <button id="readMoreRelated">
                    Show Recipe
                </button>
                <input class="hiddenInput" type="hidden" id="${mealData.idMeal}">
            </div>
        `;
        
    }
    output.innerHTML=relatedTitles;
    
        let i = 0;
         const readMoreRelatedButton = getID('readMoreRelated');
    
    readMoreRelatedButton.addEventListener('click', function(){
        console.log(this.nextElementSibling.id)
        
        const id = this.nextElementSibling.id
        fetchReadMoreRelated(id)
    })
    
    /*
    for(i = 0; i < readMoreRelatedButton.length; i++){
         console.log(readMoreRelatedButton[i])
        
        
        readMoreRelatedButton[i].addEventListener('click', function(){
        console.log("hej")
        })
        
    }*/
    
}


//Needs more work
function displayReadMoreRandom(food){
    console.log(food.meals);
    
    for(const mealData of food.meals){
        // mealData.strMeal = Meal title
        readMoreMeal=`
            <div class="randomWrapper">
                <p>${mealData.strMeal}</p>
                <p>LUCKY, YES?</p>
                <button id="findMore">
                    Show Related Recipes
                </button>
                <p>LUCKY, NAH?</p>
                <p>TRY AGAIN</p>
            </div>
        `;
        
    output.innerHTML=readMoreMeal;
    
    const findMoreButton = getID('findMore');

    findMoreButton.addEventListener('click', function(){
        fetchRelatedFood(mealData.strCategory)
    })
        
    }
    
}

function displayReadMoreRelated(food){
    console.log(food.meals)
}



function displayError(error){
    console.log(error)
}