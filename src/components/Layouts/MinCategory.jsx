import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const categories = [
   "get all Products"
]

const MinCategory = () => {
    return (
        <section className="hidden sm:block bg-white w-full px-2 sm:px-12 overflow-hidden border-b mt-14">
            <div className="flex items-center justify-between p-0.5">
                {categories.map((el, i) => (
                  <Link to="/products" key={i} className="text-sm p-2 text-gray-800 font-medium hover:text-[red] flex items-center gap-0.5 group bg-yellow-400 rounded-sm">{el} </Link>

                ))}
            </div>
        </section>
    );
};

export default MinCategory;
