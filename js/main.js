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

function fetchRelatedFood(searchValue, storedRandom){
    //Function to fetch more recipes by category.

    const relatedFood = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`);
    
    relatedFood.then((response) => {
        
        return response.json();
        
    }).then((relatedFood) => {
        
        displayRelated(relatedFood, storedRandom)
        
    }).catch((error) => {
        
        displayError(error);
        
    }) 
    
}

function fetchReadMoreRelated(id, storedRelated, storedRandom){
    //Function to fetch more information of choosen recipe by id.
    
   const readMoreRelatedRecipe = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    
    readMoreRelatedRecipe.then((response) => {
        
        return response.json();
        
    }).then((readMoreRelatedRecipe) => {

        displayReadMoreRelated(readMoreRelatedRecipe, storedRelated, storedRandom);
        
    }).catch((error) => {
        
        displayError(error);
        
    })
}

/* ------ DISPLAYS ------ */

function displayRandom(food){
    
    //Store food in varible för att kunna gå tillbaka?
    
    for(const mealData of food.meals){
        // mealData.strMeal = Meal title
        randomFetchedMeal=`
            <div class="displayRandomWrapper fadeOut">
                <div class="headingWrapper">    
                    <h2>${mealData.strMeal}</h2><h3>${mealData.strCategory}</h3>
                </div>
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
        }, 700);    
          
    });
    
}

function displayReadMoreRandom(food){
    
    let meal = food.meals[0];
    const ingArray = [];
    const measArray = [];
    
    for (const ingMeas in meal){
        if(ingMeas.includes('strIngredient')){
            const ing = food.meals[0][ingMeas];
            if(ing){
                ingArray.push(ing);
            }  
        }
        
        if(ingMeas.includes('strMeasure')){
            const meas = food.meals[0][ingMeas];
            if(meas){
                measArray.push(meas);
            }  
        }
        
      }
    
    //console.log(ingArray)
    console.log(measArray)

    
    for(const mealData of food.meals){
        // mealData.strMeal = Meal title
        readMoreRandomMeal=`
            <div class="randomWrapper fadeOut">
                <h2>${mealData.strMeal}</h2>
                <div class="randomReadMoreUnderline"></div>
                <div class="randomReadMoreCategory">
                    <h3>${mealData.strCategory}</h3>
                    <button id="findMore">
                        Related Recipes
                    </button>
                </div>
                <div class="cookingIngredients">
                    <div id="ingredients">
                    </div>
                    <div id="measures">
                    </div>
                </div>
                <div class="cookingInstructions">
                    ${mealData.strInstructions}
                </div>
            </div>
        `;
        
        let ingTitles = ""
        for (const ingTitle of ingArray){
            ingTitles+=`<p>${ingTitle}</p>`;
        }
        
        let measTitles = ""
        for (const measTitle of measArray){
            measTitles+=`<p>${measTitle}</p>`;
        }

        
        //Adds the content to index.html.
        output.innerHTML=readMoreRandomMeal;
        
        const ingDiv = getID('ingredients');
        const measDiv = getID('measures');
        
        ingDiv.innerHTML=ingTitles;
        measDiv.innerHTML=measTitles;

        setTimeout(function(){

            //Fades in the content of displayRandomWrapper
            outputDiv.firstElementChild.
            classList.remove('fadeOut');

        }, 500);

        let meal = food;
        const findMoreButton = getID('findMore');

        findMoreButton.addEventListener('click', function(){
            fetchRelatedFood(mealData.strCategory, meal)
        })
    
    }
    
}
//ADD INDGREDIENTS

function displayRelated(food, storedRandom){
    
    let relatedTitles = ""
    
    let storedRelated = food;

    for(const mealData of food.meals){

        relatedTitles+=`
            <div class="">
                ${mealData.strMeal}
                <button class="readMoreRelated">
                    Show Recipe
                </button>
                <input class="hiddenInput" type="hidden" value="${mealData.idMeal}">
            </div>
        `;
    
        const back = '<button id="back"><i class="fas fa-caret-square-left"></i></button>';

        output.innerHTML=relatedTitles+back

        const readMoreRelatedButton = document.getElementsByClassName('readMoreRelated');
        
        const backButton = getID('back');
        
        for(i = 0; i < readMoreRelatedButton.length; i++){    
        
            readMoreRelatedButton[i].addEventListener('click', function(){
        
                let id = this.nextElementSibling.value
                fetchReadMoreRelated(id , storedRelated, storedRandom)
            })
        
        }

        backButton.addEventListener('click', function(){

            displayReadMoreRandom(storedRandom)

        })
        
    }
    
}

function displayReadMoreRelated(food, storedRelated, storedRandom){
    
    for(const mealData of food.meals){
        // mealData.strMeal = Meal title
        readMoreRelatedMeal=`
            <div class="randomWrapper fadeOut">
                <h2>${mealData.strMeal}</h2>
                <div class="randomReadMoreUnderline"></div>
                <div class="randomReadMoreCategory">
                    <h3>${mealData.strCategory}</h3>
                    <button id="findMore">
                        Related Recipes
                    </button>
                </div>
                <div class="cookingIngredients">
                </div>
                <div class="cookingInstructions">
                    ${mealData.strInstructions}
                </div>
            </div>
        `;
        
    
        const back = '<button id="back"><i class="fas fa-caret-square-left"></i></button>';

        output.innerHTML=readMoreRelatedMeal+back
        
        setTimeout(function(){

            //Fades in the content of displayRandomWrapper
            outputDiv.firstElementChild.
            classList.remove('fadeOut');

        }, 500);

        const backButton = getID('back');

        backButton.addEventListener('click', function(){

            displayRelated(storedRelated, storedRandom)

    })
        
    }
    
}
//ADD INDGREDIENTS

function displayError(error){
    
    output.innerHTML=`
        <div class="errorMessage">
            <p class="sorryMessage">
                SORRY, SOMETHING MUST HAVE GONE WRONG!
            </p>
            <p class="tryAgainMessage">
                PLEASE, TRY AGAIN!
            </p>
        </div>
    `;
}

//::::::::FIX:::::::://
//Comment where needed.
//Remove console.logs
//Validate HTML, CSS & JS
//Add Prefixes
//Style
//Animations