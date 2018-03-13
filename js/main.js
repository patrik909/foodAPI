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
//DONE

function fetchRelatedFood(searchValue, storedRandom){
    //Function to fetch more recipes by category.

    const relatedFood = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`);
    
    relatedFood.then((response) => {
        
        return response.json();
        
    }).then((relatedFood) => {
        console.log("hej")
        displayRelated(relatedFood, storedRandom)
        
    }).catch((error) => {
        
        displayError(error);
        
    }) 
    
}
//DONE

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
//DONE

/* ------ DISPLAYS ------ */

function displayRandom(food){
    
    //Store food in varible för att kunna gå tillbaka?
    
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
        }, 700);    
          
    });
    
}
//DONE


function displayReadMoreRandom(food){
    
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
                    <div class="cookingInstructions">
                    </div>
                    <div class="cookingIngredients">
                    </div>
                </div>
                <p>LUCKY, NAH?</p>
            </div>
        `;
    
        //Adds the content to index.html.
        output.innerHTML=readMoreRandomMeal;

        setTimeout(function(){

            //Fades in the content of displayRandomWrapper
            outputDiv.firstElementChild.
            classList.remove('fadeOut');

        }, 500);

        let meal = food;
        const findMoreButton = getID('findMore');

        console.log(meal);

        findMoreButton.addEventListener('click', function(){
            fetchRelatedFood(mealData.strCategory, meal)
        })
    
    }
    
}
//ADD INDGREDIENTS AND INSTRUCTIONS

function displayRelated(food, storedRandom){
    
    let relatedTitles = ""
    
    let storedRelated = food;

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
    
        const back = '<button id="back"><i class="fas fa-caret-square-left"></i></button>';

        output.innerHTML=relatedTitles+back

        const readMoreRelatedButton = getID('readMoreRelated');
        const backButton = getID('back');


        readMoreRelatedButton.addEventListener('click', function(){

            fetchReadMoreRelated(mealData.idMeal, storedRelated, storedRandom)

        })

        backButton.addEventListener('click', function(){

            displayReadMoreRandom(storedRandom)

        })
        
    }
        //let i = 0;
         //const readMoreRelatedButton = getID('readMoreRelated');

    
    //readMoreRelatedButton.addEventListener('click', function(){
        
        //const id = this.nextElementSibling.id
        //fetchReadMoreRelated(id)
    //})
    
     //backButton.addEventListener('click', function(){
        //displayReadMoreRandom(meal)
         
         //displayReadMoreRandom(meal)
    //})
    
    /*
    for(i = 0; i < readMoreRelatedButton.length; i++){
         console.log(readMoreRelatedButton[i])
        
        
        readMoreRelatedButton[i].addEventListener('click', function(){
        console.log("hej")
        })
        
    }*/
    
}
//FIX BUTTON, PASS MEAL TO ENABLE BACK

function displayReadMoreRelated(food, storedRelated, storedRandom){
    
    console.log(food)
    console.log(storedRandom)
    
    const back = '<button id="back"><i class="fas fa-caret-square-left"></i></button>';
    
    output.innerHTML=back
    
    const backButton = getID('back');
    
    backButton.addEventListener('click', function(){

        displayRelated(storedRelated, storedRandom)

    })
    
    /*
    
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
                    <div class="cookingInstructions">
                    </div>
                    <div class="cookingIngredients">
                    </div>
                </div>
                <p>LUCKY, NAH?</p>
            </div>
        `;
    
        //Adds the content to index.html.
        output.innerHTML=readMoreRelatedMeal

        setTimeout(function(){

            //Fades in the content of displayRandomWrapper
            outputDiv.firstElementChild.
            classList.remove('fadeOut');

        }, 500);
   
        
    }     */
    
}


function displayError(error){
    console.log(error)
    
    output.innerHTML=`
        <div class="errorMessage">
            <p class="sorryMessage>
                SORRY, SOMETHING MUST HAVE GONE WRONG!
            </p>
            <p class="tryAgainMessage>
                PLEASE, TRY AGAIN!
            </p>
        </div>
    `;
}
//DONE