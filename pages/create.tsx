import { supabaseClient } from "@/utils/supabase"
import { useAuth, useUser } from "@clerk/nextjs"
import { Check,Trash, X } from "react-feather"
import { useState } from "react"
import styles from '../styles/CreateRecipe.module.css'
import Image from "next/image"
import foodGif from '../public/images/create-recipe-success.gif'
import Dropdown from "@/components/Dropdown"

type Recipe = {
  name: string | null,
  ingredients: string[],
  steps: string[]
}

const hourList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
const minuteList = [0,5,10,15,20,25,30,35,40,45,50,55]

export default function Create() {
  const {getToken} = useAuth()
  const {user} = useUser()
  const [tempIngredient, setTempIngredient] = useState('')
  const [tempStep, setTempStep] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [recipe, setRecipe] = useState<Recipe>({
    name: null,
    ingredients: [],
    steps: [],
    hour: null,
    minute: null
  });

  const addIngredientInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    let ingredients = [...recipe.ingredients]
    ingredients.push(tempIngredient)
    setRecipe({...recipe, ingredients})
    setTempIngredient("")
  }

  const deleteIngredient = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
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
    try{
      const rescipeResponse = await response.from('Recipe').insert({
            user_id : user?.id,
            user_image_url: user?.profileImageUrl,
            recipe_creator: user?.fullName,
            recipe_name: recipe.name,
            ingredients: recipe.ingredients,
            steps: recipe.steps
          })
      if (rescipeResponse) {
        setSubmitSuccess(true)
        setRecipe({
          name: null,
          ingredients: [],
          steps: []
        })
      }
    } catch (error) {
      console.log(error)
    }
   
  }

  return (
    <div className={styles.container}>
        {!submitSuccess ? <form className={styles.formContainer}>
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
            <h6 className="mt-2 font-bold"><span role="img" aria-label="baking"></span> That&apos;s it! By following these simple steps, you&apos;ll be able to create a delicious recipe that you can enjoy and share with others</h6>
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
          <div className="mb-6 mt-10">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Total Cooking Time</label>
            <div className="flex">
              <Dropdown placeHolder={"Hour"} options={hourList} onChange={(value: number) => setRecipe({...recipe, hour: value})}/>
              <Dropdown placeHolder={"Min"} options={minuteList} onChange={(value : number) => setRecipe({...recipe, minute: value})}/>
            </div>
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
                <a className="group m-2" key={ingredient}>
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
              <div className="flex mt-3" key={step}>
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
        :
        <div className={`${styles.formContainer} flex flex-col justify-center items-center`}> 
          <div>
            <Image src={foodGif} alt="food.gif" width={200} height={200}/>
          </div>
          <h2 className="font-bold text-2xl mt-5">Great job! Your recipe has been successfully created.</h2>
          <h4 className="text-md mt-3 text-gray-600">You can now view your posted recipes on your recipe page.</h4>
          <div className="flex justify-center items-center mt-10">
              <button 
                // onClick={(event) => createRecipe(event)}
                type="submit"
                className="px-4 py-2 font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none w-48 mr-5">
                Go to My Recipes
              </button>
              <button 
                onClick={() => setSubmitSuccess(false)}
                type="submit"
                className="px-4 py-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none w-48">
                Create New Recipe
              </button>
          </div>
        </div>
        }
      </div>
  )
}
