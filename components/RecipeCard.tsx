import Image from "next/image";
import { Clock } from "react-feather";
import Logo from '../public/images/logo.png'
import styles from '../styles/RecipeCard.module.css'

interface Recipe {
  data: {
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
}

export default function RecipeCard({data}: Recipe) {
  
  const createdDate = new Date(data.created_at)
  const handleCookingTime = (timeString: string) => {
    const [hour, minute] = timeString.split(",").map((str) => str.trim());
    return (
      <div>
        {hour && (minute ? timeString : hour)}
        {!hour && minute}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110">
        <div>
          <img className="object-cover rounded-t-lg object-center w-full h-auto m-auto"  src={data.recipe_image ?? Logo} alt="Card Image"/>          
        </div>
        <div className="px-4 py-3 flex items-center text-slate-400"><Clock className="text-slate-400 mr-1" size={20}/>{handleCookingTime(data.cooking_time)}</div>
        <div className="flex flex-col px-4">
            <h1 className="font-bold my-2 text-base text-slate-600">{data.recipe_name}</h1>
            <div className="h-12">
              <h2 className={`font-bold my-2 text-base text-slate-400 ${styles.show_three_rows}`}>
              {data.steps?.join(',')}
              </h2>
            </div>
            <div className="flex items-center justify-start mb-10 mt-16">
                <Image className="rounded-full h-12 w-12 object-cover mr-2" src={data.user_image.replace(/"/g, '')} alt="User Image" width={300} height={300}/>
                <div className="flex flex-col">
                    <h6 className="font-bold tracking-wider text-sm text-slate-600 my-0">{data.recipe_creator}</h6>
                    <h6 className="text-sm text-slate-400 mt-1">
                      {createdDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        })}
                    </h6>
                </div>
            </div>
        </div>
    </div>
  )
}
