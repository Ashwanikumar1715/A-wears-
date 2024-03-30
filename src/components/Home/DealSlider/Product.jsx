import { Link } from 'react-router-dom';

const Product = ({ image, name, offer, tag }) => {
    return (
        <Link to="/products" className="flex flex-col items-center justify-center gap-1.5 p-10 cursor-pointer">
            <div className="w-40 h-40 transform hover:scale-110 transition-transform duration-150 ease-out">
                <img draggable="false" className="w-full h-full object-contain" src={image} alt={name} />
            </div>
            <h2 className="font-[501] text-md mt-2">{name}</h2>
            <span className="text-[#500dd6] text-sm">{offer}</span>
            <span className="text-gray-500 text-sm">{tag}</span>
        </Link>
    );
};

export default Product;
