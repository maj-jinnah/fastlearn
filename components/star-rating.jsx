import Image from 'next/image';
import star from '../public/assets/star.svg';

const StarRating = ({rating}) => {

    const stars = new Array(rating).fill(0);
    
    return (
        <>
         {stars.map((_, index) => (
            <Image key={index} src={star} alt="star" width={20} height={20} />
             
        ))}   
        </>
    );
};

export default StarRating;