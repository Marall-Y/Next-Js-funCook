import { supabaseClient } from "@/utils/supabase"
import { GetStaticPaths, GetStaticProps } from "next"
import bg from '../../public/images/recipe cart.jpg'
import Image from "next/image";
import { Check } from "react-feather";

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
    
    return(
      <>
      <div className="flex w-full w-100" style={{height: '30rem'}}>
        <video autoPlay loop muted playsInline className='w-full h-full object-cover'>
          <source src="https://otmhkfujxehpaywcdtxa.supabase.co/storage/v1/object/public/funCookStorage/video-2_.mp4"/>
        </video>      
      </div>
      <div className="flex justify-between mx-48 px-20 py-32 rounded-lg shadow-lg border-2">
        <div className="mr-4 p-10 pt-0" style={{flex: '70%'}}>
          <h1 className="font-bold text-gray-700 text-3xl italic tracking-wide mb-2">{recipe?.recipe_name}</h1>
          <h3 className="text-base text-slate-400 mb-12">Reviewd By 1000 People</h3>
          <div className="flex mt-10">
            <h2 className="font-bold text-gray-700 text-2xl italic tracking-wide mr-7">Ingredients:</h2>
            <div>
              {recipe?.ingredients?.map((ingredient, index) => {
                return <div key={ingredient} className="mb-8">
                  <span className="number mr-3">{index + 1}</span><span>{ingredient}</span>
                </div>
              })}
            </div>
          </div>
          <div className="flex mt-10 border-t-2 pt-10">
            <h2 className="font-bold text-gray-700 text-2xl italic tracking-wide mr-24">Steps:</h2>
            <div className="pr-32">
              {recipe?.steps?.map((step, index) => {
                return (
                  <div key={step} className="numbered-list">
                    <div className="numbered-list-number">
                      <div className="number mb-3"> {index + 1} </div>
                      <div className="numbered-list-line"></div>
                    </div>
                    <div className="numbered-list-text">{step}</div>
                  </div>
                )
              })}
              <div className="check-icon">
                <Check size={35} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex sticky top-20 h-96 mb-5" style={{flex: '30%'}}>
          <Image
            className="object-contain rounded-lg object-center w-full h-full"
            src={recipe?.recipe_image ?? bg}
            alt="Card Image"
            width={600}
            height={400}
          />
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