import { Star } from 'react-feather';

interface RatingProps {
rating: number;
}

function RatingStars({ rating}: RatingProps) {
    const fullStars = Math.floor(rating)
    const emptyStars = 5 - fullStars;

    return (
    <div className={`flex`}>
        {Array.from({ length: fullStars }, (star, index) => (
        <Star key={index} className="text-yellow-400" fill="rgb(250 204 21)" size={20}/>
        ))}
        {Array.from({ length: emptyStars }, (star, index) => (
        <Star key={index} className="text-gray-400" size={20}/>
        ))}
    </div>
    );
}

export default RatingStars