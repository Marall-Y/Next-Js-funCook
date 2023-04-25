import Image from "next/image";
import { Clock } from "react-feather";
import Food1 from '../public/images/recipe cart.jpg'
import User from '../public/images/pexels-andrea-piacquadio-3763152.jpg'
import styles from '../styles/RecipeCard.module.css'

export default function RecipeCard() {

  return (
    <div className="bg-white rounded-lg shadow-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110">
        <Image className="w-full object-cover rounded-t-lg" src={Food1} alt="Card Image" width={300} height={400}/>
        <div className="px-4 py-3 flex items-center text-slate-400"><Clock className="text-slate-400 mr-1" size={20}/>30 Minutes</div>
        <div className="flex flex-col px-4">
            <h1 className="font-bold my-2 text-base text-slate-600">Cheesy pasta</h1>
            <h2 className={`font-bold my-2 text-base text-slate-400 ${styles.show_three_rows}`}>
            Make the base: Put the flour into a large bowl, then stir in the yeast and salt. Make a well, pour in 200ml warm water and the olive oil and bring together with a wooden spoon until you have a soft, fairly wet dough. 
            Make the sauce: Mix the passata, basil and crushed garlic together, then season to taste. Leave to stand at room temperature while you get on with shaping the base.
            </h2>
            <div className="flex items-center justify-start my-6">
                <Image className="rounded-full h-12 w-12 object-cover mr-2" src={User} alt="Card Image" width={300} height={300}/>
                <div className="flex flex-col">
                    <h6 className="font-bold tracking-wider text-sm text-slate-600 my-0">MARAL</h6>
                    <h6 className="text-sm text-slate-400 mt-1">May 13, 2019</h6>
                </div>
            </div>
        </div>
    </div>
  )
}
