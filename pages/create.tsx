import { supabaseClient } from "@/utils/supabase"
import { useAuth, useUser } from "@clerk/nextjs"
import { Check,Trash, X } from "react-feather"
import { useState } from "react"
import styles from '../styles/CreateRecipe.module.css'

type Recipe = {
  name: string | null,
  ingredients: string[],
  steps: string[]
}

export default function Create() {
  const {getToken} = useAuth()
  const {user} = useUser()
  const [tempIngredient, setTempIngredient] = useState('')
  const [tempStep, setTempStep] = useState('')
  const [recipe, setRecipe] = useState<Recipe>({
    name: null,
    ingredients: [],
    steps: []
  });

  const addIngredientInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    let ingredients = [...recipe.ingredients]
    ingredients.push(tempIngredient)
    setRecipe({...recipe, ingredients})
    setTempIngredient("")
  }

  const deleteIngredient = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('hi')
    event.preventDefault()
    let ingredients = [...recipe.ingredients]
    ingredients.splice(index, 1)
    setRecipe({...recipe, ingredients})
  } 

  const addStepInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    let steps = [...recipe.steps]
    steps.push(tempStep)
    setRecipe({...recipe, steps})
    setTempStep("")
  }

  const deleteStep = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    let steps = [...recipe.steps]
    steps.splice(index, 1)
    setRecipe({...recipe, steps})
  } 

  const createRecipe = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const token = await getToken({template: 'supabase'})
    const response = await supabaseClient(token!)
    await response.from('Recipe').insert({
      user_id : user?.id,
      recipe_creator: user?.fullName,
      recipe_name: recipe.name,
      ingredients: recipe.ingredients,
      steps: recipe.steps
    })
  }

  return (
    <div className={styles.container}>
        <form className={styles.formContainer}>
          <div className="border-b-2 pb-7">
            <h6>
              To create a recipe, follow these steps:
            </h6>
            <h6 className="mt-5">
              <ul>
                <li>- Fill out the form below with the necessary details.</li>
                <li>- Enter each ingredient and step one by one.</li>
                <li>- Click the check box after each ingredient or step to move on to the next one.</li>
                <li>- Continue this process until you have entered all the required ingredients and steps.</li>
              </ul>
            </h6>
            <h6 className="mt-2 font-bold"><span role="img" aria-label="baking">🧁</span> That's it! By following these simple steps, you'll be able to create a delicious recipe that you can enjoy and share with others </h6>
          </div>
          <div className="mb-6 mt-10">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Recipe Name</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              type="text"
              name="name"
              id="name"
              onChange={(e)=> setRecipe({...recipe, name:e.target.value})}
              placeholder="Enter recipe name"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Recipe Ingredients</label>
            <div className="flex items-center">
                <input
                 type="text"
                 name="text"
                 placeholder="Enter the ingredient name"
                 value={tempIngredient}
                 onChange={(e) => setTempIngredient(e.target.value)}
                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                <button
                  disabled={tempIngredient === ''}
                  onClick={addIngredientInput}
                  className={`ml-5 px-1 py-2 font-small text-white bg-green-500 rounded-md hover:bg-green-600 ${styles.btn}` }>
                  <span><Check/></span>
                </button>
            </div> 
            <div className="flex flex-wrap p-3">
              {recipe.ingredients.map((ingredient, index) => (
                <a className="group m-2">
                  {/* <input disabled type="text" name="text" placeholder={ingredient} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" /> */}
                  <button
                    className="flex justify-center relative bg-slate-400 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-slate-600"
                    onClick={(event) => deleteIngredient(index, event)}>
                      <X className="text-white transition duration-300 absolute opacity-0 group-hover:opacity-100" size={25}/>
                    <span className="transition duration-300 opacity-100 group-hover:opacity-0 font-bold">{ingredient}</span>
                  </button>
                </a>    
              ))}  
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Recipe Steps</label>
            <div className="flex items-center">
              <textarea
                onChange={(e) => setTempStep(e.target.value)}
                value={tempStep}
                name="message"
                id="message"
                rows={5}
                placeholder="Enter step description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"></textarea>
              <button
                disabled={tempStep === ''}
                onClick={addStepInput}
                className={`ml-5 px-1 py-2 font-small text-white bg-green-500 rounded-md hover:bg-green-600 ${styles.btn}` }>
                <span><Check/></span>
              </button>
            </div>
          </div>
          {recipe.steps.map((step, index) => (
              <div className="flex mt-3">
                 <button disabled className="mr-5 px-3 py-1 font-medium text-white bg-slate-400 rounded-md">
                  {index + 1}
                 </button>
                  <input disabled type="text" name="text" placeholder={step} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  <button
                  onClick={(event) => deleteStep(index, event)}
                  className="ml-5 px-1 py-1 font-medium text-white bg-red-400 rounded-md hover:bg-red-600 ">
                    <span><Trash/></span>
                  </button>
              </div>    
            ))}   
            <div className="text-right mt-6">
              <button 
                onClick={(event) => createRecipe(event)}
                type="submit"
                className="px-4 py-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
                Submit
              </button>
            </div>
        </form>
      </div>
  )
}
