import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = {
  categories: [
    {
      id: 'Women Fashion',
      name: 'Women Fashion',
      featured: [
        {
          name: 'New Arrivals',
          to: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          to: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'Women clothing',
          name: 'Women Clothing',
          items: [
            { name: 'Tops', to: '/products?category=Fashion' },
            { name: 'Dresses', to: '/products?category=Fashion' },
            { name: 'Pants', to: '/products?category=Fashion' },
            { name: 'Denim', to: '/products?category=Fashion' },
            { name: 'Sweaters', to: '/products?category=Fashion' },
            { name: 'T-Shirts', to: '/products?category=Fashion' },
            { name: 'Jackets', to: '/products?category=Fashion' },
            { name: 'Activewear', to: '/products?category=Fashion' },
            { name: 'Browse All', to: '/products?category=Fashion' },
          ],
        },
        {
          id: 'Women accessories',
          name: 'Women Accessories',
          items: [
            { name: 'Watches', to: '/' },
            { name: 'Wallets', to: '/' },
            { name: 'Bags', to: '/' },
            { name: 'Sunglasses', to: '/' },
            { name: 'Hats', to: '/' },
            { name: 'Belts', to: '/' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', to: '/' },
            { name: 'My Way', to: '/' },
            { name: 'Re-Arranged', to: '/' },
            { name: 'Counterfeit', to: '/' },
            { name: 'Significant Other', to: '/' },
          ],
        },
      ],
    },
    {
        id: 'men Fashion',
        name: 'Men Fashion',
        featured: [
          {
            name: 'New Arrivals',
            to: '/',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
            imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
          },
          {
            name: 'Artwork Tees',
            to: '/',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
            imageAlt:
              'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
          },
        ],
        sections: [
          {
            id: 'Mens clothing',
            name: 'Mens Clothing',
            items: [
              { name: 'Tops', to: '/products?category=Fashion' },
              { name: 'Pants', to: '/products?category=Fashion' },
              { name: 'Sweaters', to: '/products?category=Fashion' },
              { name: 'T-Shirts', to: '/products?category=Fashion' },
              { name: 'Jackets', to: '/products?category=Fashion' },
              { name: 'Activewear', to: '/products?category=Fashion' },
              { name: 'Browse All', to: '/products?category=Fashion' },
            ],
          },
          {
            id: 'Mens accessories',
            name: 'Mens Accessories',
            items: [
              { name: 'Watches', to: '/' },
              { name: 'Wallets', to: '/' },
              { name: 'Bags', to: '/' },
              { name: 'Sunglasses', to: '/' },
              { name: 'Hats', to: '/' },
              { name: 'Belts', to: '/' },
            ],
          },
          {
            id: 'brands',
            name: 'Brands',
            items: [
              { name: 'Re-Arranged', to: '/' },
              { name: 'Counterfeit', to: '/' },
              { name: 'Full Nelson', to: '/' },
              { name: 'My Way', to: '/' },
            ],
          },
        ],
      },
    {
        id: 'Electronics',
        name: 'Electronics',
        featured: [
          {
            name: 'New Arrivals',
            to: '/',
            imageSrc: 'https://rukminim2.flixcart.com/image/416/416/xif0q/television/p/n/y/-original-imagxyxzyvweg64x.jpeg?q=70&crop=false',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Basic Tees',
            to: '/',
            imageSrc: 'https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/l/p/4/-original-imagtvqpkzkedv8p.jpeg?q=70&crop=false',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
        ],
        sections: [
          {
            id: 'Setups',
            name: 'Setups',
            items: [
              { name: 'Laptops', to: '/products?category=Laptops' },
              { name: 'Computers', to: '/products?category=Laptops' },
              { name: 'Gaming', to: '/products?category=Laptops' },
              { name: 'Laptop Accessories', to: '/products?category=Laptops' },
              { name: 'Headphones', to: '/products?category=Electronics' },
              { name: 'Tv', to: '/products?category=Appliances' },
              { name: 'Browse All', to: '/products?category=Appliances' },
            ],
          },
          {
            id: 'Mobile  accessories',
            name: 'Mobile Accessories',
            items: [
              { name: 'Charger', to: '/' },
              { name: 'Usb cables', to: '/' },
              { name: 'Template', to: '/' },
              { name: 'Covers', to: '/' },
           
            ],
          },
          {
            id: 'brands',
            name: 'Brands',
            items: [
              { name: 'Samsung', to: '/' },
              { name: 'Mi', to: '/' },
              { name: 'Acer', to: '/' },
              { name: 'Lenovo', to: '/' },
              { name: 'Significant Other', to: '/' },
            ],
          },
        ],
      },
    
    
      {
        id: 'Home ',
        name: 'Home',
        featured: [
          {
            name: 'New Arrivals',
            to: '/',
            imageSrc: 'https://rukminim2.flixcart.com/image/416/416/k8by93k0/table-cover/g/z/e/4-seater-table-cover-1-ghd1010tc-gaurang-original-imafqdhhfhyqmf9d.jpeg?q=70&crop=false',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Basic Tees',
            to: '/',
            imageSrc: 'https://rukminim2.flixcart.com/image/416/416/k612pow0/mattress-protector/d/j/a/saviour113-cloth-fusion-original-imafk5p76xedkrab.jpeg?q=70&crop=false',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
        ],
        sections: [
          {
            id: 'Home furnishing',
            name: 'Home furnishing',
            items: [
              { name: 'Bed lines', to: '/products?category=Home' },
              { name: 'Bed sheet', to: '/products?category=Home' },
              { name: 'Blankets', to: '/products?category=Home' },
              { name: 'Curtains', to: '/products?category=Home' },
              { name: 'Floor cover', to: '/products?category=Home' },
              { name: 'covers', to: '/products?category=Home' },
              { name: 'Cusions', to: '/products?category=Home' },
              { name: 'Pillows', to: '/products?category=Home' },
              { name: 'Browse All', to: '/products?category=Home' },
            ],
          },
          {
            id: 'Others',
            name: 'others',
            items: [
              { name: 'kitchen', to: '/' },
              { name: 'Bedroom', to: '/' },
              { name: 'Tools', to: '/' },
              { name: 'Utility', to: '/' },
              { name: 'Dinning', to: '/' },
              { name: 'Furniture', to: '/' },
            ],
          },
          {
            id: 'brands',
            name: 'Brands',
            items: [
              { name: 'Full Nelson', to: '/' },
              { name: 'My Way', to: '/' },
              { name: 'Re-Arranged', to: '/' },
              { name: 'Counterfeit', to: '/' },
              { name: 'Significant Other', to: '/' },
            ],
          },
        ],
      },
   
  ],

  pages: [
    { name: 'Tv and Appliances', to: '/products?category=Appliances' },
    { name: 'Mobiles', to: '/products?category=Mobiles' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Categories() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 py-2.5 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                             <Link to={item.to} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                            </Link>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                 <Link to={item.to} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                     <Link to={page.to} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                    </Link>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto mt-12 max-w-7xl px-10 sm:px-10 lg:px-10 py-2.5  ">
          <div className="border-b border-[#510aad]">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-[#510aad] p-2 text-white lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>


              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-[17rem] lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-[#500dd6] text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-[501] transition-colors duration-200 ease-out px-2.5 mt-2'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                         <Link to={item.to} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                        </Link>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                               <Link to={item.to} className="hover:text-gray-800">
                                                  {item.name}
                                              </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                   <Link
                      key={page.name}
                      to={page.to}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                  </Link>
                  ))}
                </div>
              </Popover.Group>

             
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
