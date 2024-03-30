import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import { settings } from '../DealSlider/DealSlider';
import Product from './Product';


const ProductSlider = ({ title, tagline }) => {

    const { loading, products } = useSelector((state) => state.products);

    return (
        <section className="bg-white w-full shadow overflow-hidden">
            {/* <!-- header --> */}
            <div className="flex px-6 py-4 justify-between items-center">
                <div className="title flex flex-col gap-0.5">
                    <h1 className="text-xl font-medium">{title}</h1>
                    <p className="text-sm text-gray-400">{tagline}</p>
                </div>
                <Link to="/products" className="bg-[#500dd6] text-xs font-medium text-white px-3 py-3 rounded-lg shadow-lg uppercase">view all</Link>
            </div>
            <hr />
            {loading ? null :
                <Slider {...settings} className="flex items-center justify-between p-1 " aria-hidden="true">
                    {products && getRandomProducts(products, 12).map((product) => (
                        <Product {...product} key={product._id} />
                    ))}
                </Slider>
            }

        </section>
    );
};

export default ProductSlider;
