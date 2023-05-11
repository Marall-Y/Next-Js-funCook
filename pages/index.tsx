import Image from "next/image";
import { useState } from "react";
import { useAuth} from "@clerk/nextjs"
import { Search } from "react-feather";
import RecipeCard from "@/components/RecipeCard";
import { supabaseClient } from '@/utils/supabase';
import Food1 from '../public/images/home-transparent-1.png'
import Food2 from '../public/images/home-transparent-2.png'
import Food3 from '../public/images/home-transparent-3.png'
import 'animate.css'
import { createClient } from "@supabase/supabase-js";

interface Recipe {
  created_at: string;
  id: number;
  user_image: string;
  recipe_image: string;
  ingredients: string[];
  recipe_creator: string;
  recipe_name: string;
  steps: string[];
  cooking_time: string;
}

interface Props {
  recipes: Recipe[];
}

const Home: React.FC<Props> = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [recipeList, setRecipeList] = useState (recipes)
  const [filteredOptions, setFilteredOptions] = useState<Recipe[]>([]);

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)

    // Filter the options based on the search term
    const filtered = recipes.filter((recipe) =>
      recipe.recipe_name.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    //not show anything if the user entered space without any word
    (newSearchTerm !== " " && newSearchTerm !== "") && setFilteredOptions(filtered);
    // reset search
    (newSearchTerm === " " || newSearchTerm === "") && setRecipeList(recipes)
  };

  const handleSearch = (searchedItem: string) => {
    setFilteredOptions([])
    const filteredRecipes = recipes.filter(item => item.recipe_name === searchedItem)
    setRecipeList(filteredRecipes)
  }

  return (
  <>
  <div className="flex flex-col justify-center items-center w-full bg-orange-100 p-10">
    <h1 className="mb-5 mt-20 tracking-wide text-slate-600 ">Find a Recipe</h1>
    <div className="relative mb-5 flex items-center z-10">
      <Search size={25} className="absolute top-3 left-3 text-slate-400"/>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleInputChange(e)}
        style={{width: '37rem'}}
        className="bg-white h-12 px-12 pr-10 text-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
       {filteredOptions.length > 0 && (
        <ul 
        className="absolute top-full left-0 bg-white list-none p-0 mt-2 shadow-md cursor-pointer" 
        style={{width: '37rem'}}>
          {filteredOptions.map((recipe, index) => (
            <li
              key={index}
              onClick={() => handleSearch(recipe.recipe_name)}
              style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}
            >
              {recipe.recipe_name}
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="relative">
      <Image src={Food1} alt="food gif1" width={500} height={500} className="absolute top-[-12rem] left-[-36rem] animate__animated animate__bounceInLeft "/>
      <Image src={Food2} alt="food gif2" width={600} height={600} style={{ margin: '-6rem auto'}} className="animate__animated animate__bounceInDown"/>
      <Image src={Food3} alt="food gif3" width={400} height={400} className="absolute top-[-13rem] right-[-28rem] animate__animated animate__bounceInRight"/>
    </div>
  </div>
  <div className={`grid gap-20 px-48 md:grid-cols-3 sm:grid-cols-2 max-[1024px]:px-32 py-32`}>
    {recipeList.map((recipe) => {
      return <RecipeCard key={recipe.id} data={recipe}/>
    })}
  </div>
  </>
  )
}


export async function getStaticProps() {
  const response = await supabaseClient({ supabaseAccessToken: null, requireAuthorization: false })
  let { data, error } = await response.from('Recipe').select('*');

  if (error) {
    console.log(error)
  }

  return {
    props: {
      recipes: data,
    },
    revalidate: 120, // Regenerate the page every 120 seconds
  };
}


export default Home