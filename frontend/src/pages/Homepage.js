import React, { useState, useEffect } from "react";
import './Homepage.css'

function Homepage() {
  const [showForm, setShowForm] = useState(false);
  const [showAddRecipe, setAddRecipe] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState("");
  const [showEditForm, setEditForm] = useState(null);
  const [unparsedInput, setUnparsedInput] = useState("");

  const [showError, setError] = useState(true);
  


  useEffect(() => {
    fetch("http://localhost:8000/recipes")
      .then(res => res.json() 
      .then(recipes => setRecipes(recipes))); 
  }, []);

  function addRecipe(){
    setShowForm(true);
    setAddRecipe(false);
  }

  function cancelSubmit(){
    setShowForm(false);
    setAddRecipe(true);
    setName('');
    setTime('');
    setIngredients([]);
    setSteps('');
  }

  function cancelEdit(){
    setEditForm(false);
  }

  function deleteRecipe(id){
    fetch(`http://localhost:8000/:${id}`,{
      method: "DELETE"
    })
    .then( ()=> {
    setRecipes((prevRecipes) => {
        const updatedRecipes = prevRecipes
          .filter((recipe) => recipe.id !== id)
          .map((recipe, index) => ({ ...recipe, id: index + 1 }));

        return updatedRecipes;
      });
      console.log(`Deleted a recipe ${id}`);
    })
  }

  // function addIngredients(userinput){
  //   let ingredientlist = userinput.toString().split(",");
  //   setIngredients(ingredientlist);
  // }
  const parseIngredientsInput = (input) => {
    // Use a comma as a delimiter to split the input string into an array
    return input.split(',').map((ingredients) => ingredients.trim());
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIngredients([parseIngredientsInput(unparsedInput)]);
    console.log(ingredients);
    // addIngredients(ingredients);
    const id_to_add = recipes.length + 1
    fetch("http://localhost:8000/addrecipe",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({"id": id_to_add,
              "name": name, 
              "time": time, 
              "ingredients": ingredients, 
              "steps": steps
            
            }),
    })
    
    .then(() => {
      console.log(`Added a new recipe ${name} that takes ${time}`);
      console.log(ingredients);
      setRecipes((prevRecipes) => [
        ...prevRecipes,
        {
          id: id_to_add,
          name: name,
          time: time, 
          ingredients: ingredients, 
          steps: steps
        },
      ]);
    });
    setShowForm(false);
    setAddRecipe(true);
    setName('');
    setTime('');
    setIngredients('');
    setSteps('');
    console.log(recipes)

  }

  function submitEdit(){
    setEditForm(false);
  }

  return (
    <div className="section">
      <h2 class="text-4xl font-extrabold dark:text-white">Recipe Buddy</h2>
      <p class="my-4 text-lg text-gray-500">Keep track of your tried-and-true recipes, recipes to try, and recipes that hold a special place in your heart.</p>
      {showAddRecipe && (
        <button class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-base px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={addRecipe}>
          + Add Recipe
        </button>
      )}
      {showForm && (
        <div class="w-full max-w-6xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add a Recipe&nbsp;&nbsp;🍽️ </h5>
        <form>
            <br></br>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of recipe
                    <input 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        value={name}
                        placeholder="Type the recipe name"
                        onChange={(e) => setName(e.target.value)} />
                 </label>

                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Time
                <input type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={time}
                    placeholder="e.g. 20min"
                    onChange={(e) => setTime(e.target.value)}/>
                </label>

                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Ingredients
                    <textarea rows={4} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // value={ingredients}
                        value={Array.isArray(ingredients) ? ingredients.join(', ') : ingredients}
                        placeholder="Separate ingredients with a comma"
                        // onChange={(e) => setIngredients(e.target.value)}
                        // onChange={addIngredients(ingredients)}
                        onChange={(e) => setIngredients(parseIngredientsInput(e.target.value))}
                        >   
                    </textarea>
                    {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                     Separate ingredients with a comma.</p> */}
                </label>

                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Steps
                  <textarea rows={4} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={steps}
                        placeholder="How do you make this dish?"
                        onChange={(e) => setSteps(e.target.value)}>
                    </textarea>
                </label>
          
                <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleSubmit}>
                  Submit</button>
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={cancelSubmit}>
                  Cancel</button>
                {showError && (
                <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <span class="font-medium">Remember to fill in all fields!</span> 
                    Ensure all fields are completed before submitting.
                </div>
                )}
            </div>
        </form>
      </div>
      )}
      <br></br>
      <br></br>

      {recipes.map((recipe) => (
        <div>
            <div class="max-w-bg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.name}</h5>
                </a>
                <span class="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">Total time: {recipe.time}</span>
                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                {/* <br></br>
                <br></br> */}
                <p class="text-lg font-semibold text-blue-600/75 dark:text-blue-500/75">
                  Ingredients
                </p>
                <br></br>
                {recipe.ingredients.map(function(ingredient, index){
                    return <div class="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ingredient}</label>
                </div>
                    
                    ;
                  })}
                
                {/* <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{recipe.ingredients}</p> */}
                <br></br>
                <p class="text-lg font-semibold text-blue-600/75 dark:text-blue-500/75">Steps</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{recipe.steps}</p>
                <br></br>
                <button  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setEditForm(recipe.id === showEditForm
                    ? null 
                    : recipe.id)}>
                    Edit Recipe
                </button>
                <button onClick={()=> deleteRecipe(recipe.id)} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  Remove
                </button>
            </div>
            <br></br>

            {showEditForm === recipe.id && (
                <form>
                    <br></br>
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of recipe:
                            <input 
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                value={recipe.name}
                                onChange={(e) => setName(e.target.value)} />
                        </label>

                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time:
                        <input type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={recipe.time}
                            onChange={(e) => setTime(e.target.value)}/>
                        </label>

                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredients
                            <textarea rows={4} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={recipe.ingredients}
                                //onChange={(e) => setIngredients(e.target.value)}
                                // onChange={(e) => setIngredients(parseIngredientsInput(e.target.value))}
                                onChange={(e) => setUnparsedInput(e.target.value)}
                                >
                            </textarea>
                        </label>

                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Steps
                            <textarea rows={4} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={recipe.steps}
                                onChange={(e) => setSteps(e.target.value)}>
                            </textarea>
                        </label>
                
                        <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                            onClick={submitEdit}>
                            Save Changes
                        </button>

                        <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                            onClick={cancelEdit}>
                            Cancel
                        </button>
                        {showError && (
                            <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                <span class="font-medium">Remember to fill in all fields!</span> Ensure all fields are completed before submitting.
                            </div>
                        )}
                    </div>
                </form>
      )}
        </div>
        ))}

      <br></br>
      
    </div>
  );
}

export default Homepage
