import { supabaseClient } from "@/utils/supabase"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import bg from '../../public/images/recipe cart.jpg'
import Image from "next/image";
import { Check } from "react-feather";
import RatingStar from "@/components/RatingStars";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/nextjs";
import NoProfile from '../../public/images/no-pic.jpg'
import { useState } from "react";
import ReactStars from 'react-stars'

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

interface FeedBack {
    id: number;
    user_image: string | null;
    review: string;
    rating: number;
    author: string;
}

export default function RecipeView ({recipe, feedbacks} : {recipe: Recipe, feedbacks: FeedBack[]}) {
  const {getToken} = useAuth()
  const {user} = useUser()
  const [review, setReview] = useState<string>("")
  const [rating, setRating] = useState<number | null> (null)
  const [comments, setComments] = useState<FeedBack[] | null>(feedbacks)

  const handleRecipeRating = () => {
    let average
    const ratingArray = comments?.map((item) => item.rating)
    const sum = ratingArray?.reduce((acc, curr) => acc + curr, 0);
    if (sum && ratingArray?.length) {
      average = sum / ratingArray?.length
    }
    return average
  }

  const handleRating = (newRating: number) => {
    setRating(newRating)
  }


  const createReview = async () => {
    const token = await getToken({template: 'supabase'})
    const response = await supabaseClient({ supabaseAccessToken: token!, requireAuthorization: true })
    const {error, status} = await response.from('Review').insert(
      {
        recipe_id: recipe.id,
        user_id : user?.id,
        user_image: user?.profileImageUrl,
        author: user?.fullName,
        review,
        rating,
      },
    );

    if (status == 201){
      setRating(null)
      setReview("")
      const { data } = await response
      .from('Review')
      .select('*')
      .eq('recipe_id', recipe.id)
      setComments(data as FeedBack[])
    } else {
      console.log(error)
    }
  }

    return(
      <>
      <div className="flex w-full w-100" style={{height: '30rem'}}>
        <video autoPlay loop muted playsInline className='w-full h-full object-cover'>
          <source src="https://otmhkfujxehpaywcdtxa.supabase.co/storage/v1/object/public/funCookStorage/video-2_.mp4"/>
        </video>      
      </div>
      <div className="flex flex-col mx-48 px-20 py-32 rounded-lg shadow-lg border-2">
        <div className="flex justify-between ">
          <div className="mr-4 p-10 pt-0" style={{flex: '70%'}}>
            <div className="flex items-center">
              <Image className="rounded-full h-10 w-10 object-cover mr-5" src={recipe?.user_image?.replace(/"/g, '') ?? NoProfile} alt="Feedback User Image" width={300} height={300}/>
              <div className="flex flex-col">
                <h2 className="text-gray-700 italic tracking-wide mb-2">{recipe?.recipe_name}</h2>
                <RatingStar rating={handleRecipeRating()}/>
              </div>
            </div>           
            <div className="flex mt-10">
              <h3 className="text-gray-700 italic tracking-wide mr-7">Ingredients:</h3>
              <div>
                {recipe?.ingredients?.map((ingredient, index) => {
                  return <div key={ingredient} className="mb-8">
                    <span className="number mr-3">{index + 1}</span><span>{ingredient}</span>
                  </div>
                })}
              </div>
            </div>
            <div className="flex mt-10 border-t-2 pt-10">
              <h3 className="text-gray-700 talic tracking-wide mr-24">Steps:</h3>
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
        <div className="flex flex-col border-t-2 pt-10 px-40">
          <h3>{comments?.length} Reviews</h3>
          <RatingStar rating={handleRecipeRating()}/>
          <div className="flex items-center mt-10">
            <SignedIn>
              <Image className="rounded-full h-10 w-10 object-cover mr-2" src={user?.profileImageUrl?.replace(/"/g, '') ?? NoProfile} alt="User Image" width={300} height={300}/>
            </SignedIn>
            <SignedOut>
              <Image className="rounded-full h-10 w-10 object-cover mr-2" src={NoProfile} alt="User Image" width={300} height={300}/>
            </SignedOut>
            <textarea
              id="feedback"
              name="feedback"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What do you think about this recipe?"
              className="p-3 border rounded-lg flex-1 outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="flex items-center justify-between pl-12 pt-5">
            <div className="flex items-center">
              <span className="text-base font-bold italic mr-5 text-slate-500">Your Rating</span>
              <ReactStars
              count={5}
              onChange={handleRating}
              size={30}
              color2={'#ffd700'} 
              />
            </div>
            <div className="text-right flex items-center">
              <button 
                onClick={createReview}
                disabled={!rating || review == ""}
                type="submit"
                className="px-4 py-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 mx-40 ">
          {comments?.map((feedback, index) => {
          return(
          <div key={index} className="flex border-t-2 pt-10 px-38 mb-10">
            <Image className="rounded-full h-10 w-10 object-cover mr-5" src={feedback.user_image?.replace(/"/g, '') ?? NoProfile} alt="Feedback User Image" width={300} height={300}/>
            <div className="flex flex-col">
              <h5 className="italic mr-5 mb-2">{feedback.author}</h5>
              <RatingStar rating={feedback.rating}/>
              <p className="text-slate-500 mt-5">
                {feedback.review}
              </p>
            </div>
          </div>
          )
        })}
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
    
    const { data: feedbacks } = await response
      .from('Review')
      .select('*')
      .eq('recipe_id', +params.id)
    
    return {
      props: {
        recipe: data,
        feedbacks
      }
    };
  };