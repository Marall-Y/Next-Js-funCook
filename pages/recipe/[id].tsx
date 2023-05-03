import { supabaseClient } from "@/utils/supabase"
import { GetStaticPaths, GetStaticProps } from "next"
import bg from '../../public/images/recipe cart.jpg'
import Image from "next/image";

type RecipeParams = {
    id: string;
    [key: string]: string | undefined;
  };

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

export default function RecipeView ({recipe} : {recipe: Recipe}) {
    console.log(recipe)
    return(
      <>
      <div className="flex w-full w-100" style={{height: '30rem'}}>
        <video autoPlay loop muted playsInline className='w-full h-full object-cover'>
          <source src="https://otmhkfujxehpaywcdtxa.supabase.co/storage/v1/object/public/funCookStorage/video-2.mp4?t=2023-05-03T14%3A57%3A55.066Z"/>
        </video>      
      </div>
      <div className="flex justify-center px-48 py-32">
        <div className="mr-4">
          <h3 className="text-base text-slate-400">Reviewd By 1000 People</h3>
        </div>
        <div className="bg-white rounded-lg shadow-lg">
          <Image className="object-cover rounded-t-lg object-center w-full h-auto m-auto"  src={recipe.recipe_image ?? bg} alt="Card Image" width={300} height={1000}/>                 
        </div>
      </div>
    </>
    )
   
}

  
export const getStaticPaths: GetStaticPaths<RecipeParams> = async () => {
    const response = await supabaseClient({ supabaseAccessToken: null, requireAuthorization: false })
    let { data, error } = await response.from('Recipe').select('*');
    if (error) {
      console.log(error)
    }
    const paths = data!.map((item) => ({ params: { id: item.id.toString() } }))
  
    return {
      paths,
      fallback: true,
    }
  }

  export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params || !params.id) {
      return { notFound: true };
    }
  
    const response = await supabaseClient({ supabaseAccessToken: null, requireAuthorization: false });
    const { data } = await response
      .from('Recipe')
      .select('*')
      .eq('id', +params.id)
      .single();
  
    return {
      props: {
        recipe: data
      }
    };
  };