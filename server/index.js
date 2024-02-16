const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://faithdong:zJU6AqPkYmIwDX9R@cluster0.yd6cxo9.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// const { MongoClient } = require("mongodb");
// // Replace the uri string with your connection string.
// const uri = "mongodb+srv://faithdong:zJU6AqPkYmIwDX9R@cluster0.yd6cxo9.mongodb.net/?retryWrites=true&w=majority";
// // const uri = "mongodb+srv://faithdong:zJU6AqPkYmIwDX9R@cluster0.yd6cxo9.mongodb.net/";
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     // const database = client.db('recipe_buddy');
//     // const recipes = database.collection('recipes');
//     // database.recipes.insertMany([
//     //   { "id": 2, 
//     //     "name": "Egg Fried Rice", 
//     //     "time": "15min", 
//     //     "ingredients": ["Diced vegetables", "Rice", "Eggs", "Soy sauce", "Green onion"],
//     //     "steps": "Sauté diced vegetables and cooked rice until the vegetables are tender. Push the mixture to the side, add beaten eggs, and scramble them in the wok. Combine the eggs with the rice and vegetables, season with soy sauce, and garnish with chopped green onions."
//     //   },
//     //   { "id": 1, 
//     //     "name": "Shrimp Seafood Pasta", 
//     //     "time": "20min", 
//     //     "ingredients": ["Linguine", "Garlic", "Shrimp", "Diced tomatoes", "White wine", "Seafood broth", "Salt & pepper", "Parsley"],
//     //     "steps": "Add minced garlic and fresh shrimp to the pan, then stir in diced tomatoes, white wine, and seafood broth. Toss the cooked pasta with the seafood, season with salt, pepper, and chopped parsley"
      
//     //   },
//     //   { "id": 3, 
//     //     "name": "Grilled Lemon Herb Chicken", 
//     //     "time": "25min", 
//     //     "ingredients": ["Lemon juice", "Chicken", "Garlic", "Herbs", "Olive oil", "Salt & pepper"],
//     //     "steps": "Marinate chicken in a mixture of fresh lemon juice, minced garlic, chopped herbs, olive oil, salt, and pepper. Allow the chicken to marinate. Grill the marinated chicken until fully cooked, and serve with a side of roasted vegetables."
//     //   }
  
//     // ]);
    
//     // const query = { name: 'Grilled Lemon Herb Chicken' };
//     // const recipe = await recipes.findOne(query);
//     // console.log(recipe);
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);
//     console.log(movie);

//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);