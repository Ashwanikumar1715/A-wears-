import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-3/3 sm:w-8/12 px-2.5 sm:px-10 py-2.5 flex  items-center shadow-md  rounded-lg">
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="text-sm w-full flex-1 outline-none border-none placeholder-gray-500" type="text" placeholder="Search products" />
        <button type="submit" className="text-[#6a09e8] relative " aria-label="Click me to submit the form"><SearchIcon /></button>
    </form>
    );
};

export default Searchbar;
