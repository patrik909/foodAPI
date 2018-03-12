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

function fetchRelatedFood(searchValue, meal){
    //Function to fetch more recipes by category.
    console.log(meal)
    const food = meal;
    const relatedFood = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`);
    
    relatedFood.then((response) => {
        
        return response.json();
        
    }).then((relatedFood) => {

        displayRelated(relatedFood, food)
        
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
            <div class="displayRandomWrapper fadeOut">
                <h2>${mealData.strMeal}</h2>
                <div class="readMoreRandomButtonWrapper">           <p>SOUNDS INTERESTING?</p>
                    <button id="readMoreRandom">Show Recipe</button>
                </div>
                <p>NOT SATISFIED? TRY AGAIN!</p>
            </div>
        `;  
    }
    
    outputDiv.innerHTML=randomFetchedMeal;
    //Adds the content to index.html.
    
    setTimeout(function(){
        
        //Fades in the content of displayRandomWrapper
        outputDiv.firstElementChild.
        classList.remove('fadeOut');
        
    }, 500);
    
    const readMoreRandomButton = getID('readMoreRandom');
    
    readMoreRandomButton.addEventListener('click', function(){

        outputDiv.firstElementChild.
        classList.add('fadeOut');
        //Fades out the displayRandomWrapper.
        
        setTimeout(function(){  
            displayReadMoreRandom(food)
            //Waits til the content is faded out.
        }, 1000);    
          
    });
    
}
//DONE

function displayRelated(food, meal){
    let relatedTitles = ""
    //console.log(meal)
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
     const back = '<button id="back"><i class="fas fa-caret-square-left"></i></button>'
    output.innerHTML=relatedTitles+back
    
        let i = 0;
         const readMoreRelatedButton = getID('readMoreRelated');
    const backButton = getID('back');
    
    readMoreRelatedButton.addEventListener('click', function(){
        
        const id = this.nextElementSibling.id
        fetchReadMoreRelated(id)
    })
    
     backButton.addEventListener('click', function(){
        displayReadMoreRandom(meal)
         
         //displayReadMoreRandom(meal)
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
        readMoreRandomMeal=`
            <div class="randomWrapper">
                <p>${mealData.strMeal}</p>
                <p>LUCKY, YES?</p>
                <button id="findMore">
                    Show Related Recipes
                </button>
                <p>LUCKY, NAH?</p>

            </div>
        `;
        
    output.innerHTML=readMoreRandomMeal;
    
    const meal = food; 
        console.log(meal)
    const backButton = getID('back');
        
    const findMoreButton = getID('findMore');

    findMoreButton.addEventListener('click', function(){
        fetchRelatedFood(mealData.strCategory, meal)
    })

        
    }
    
}

function displayReadMoreRelated(food){
    console.log(food.meals)
    
        for(const mealData of food.meals){
        // mealData.strMeal = Meal title
        readMoreRelatedMeal=`
            <div class="randomWrapper">
                <p>${mealData.strMeal}</p>
                <p>LUCKY, YES?</p>
                <button id="findMore">
                    Show Related Recipes
                </button>
                <p>LUCKY, NAH?</p>

            </div>
        `;
        
        }
    const back = '<button id="back"><i class="fas fa-caret-square-left"></i></button>'
        
    output.innerHTML=readMoreRelatedMeal+back;
}

function displayError(error){
    console.log(error)
}