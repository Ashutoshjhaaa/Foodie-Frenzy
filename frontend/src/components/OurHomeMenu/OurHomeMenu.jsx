import React, { useState } from 'react'
import { useCart } from '../../CartContext/CartContext';
import { dummyMenuData } from '../../assets/OmhDD'
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './OurHomeMenu.css';

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

const OurHomeMenu = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [showAll, setShowAll] = useState(false);

    // Automatically reset showAll when category changes to avoid confusion
    React.useEffect(() => {
        setShowAll(false);
    }, [activeCategory]);

    const items = dummyMenuData[activeCategory] || [];
    const displayItems = showAll ? items : items.slice(0, 4);

    const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
    const getQuantity = (id) => {
        const item = (cartItems || []).find(i => i.id === id);
        return item ? item.quantity : 0;
    };


    return (
        <div id='menu-section' className='bg-[#1a120b] min-h-screen py-16 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200'>
                    <span className='font-dancingscript block text-5xl md:text-7xl sm:text-6xl mb-2 text-center'>
                        Our Exquisite Menu

                    </span>
                    <span className='block text-xl sm:text-2xl md:text-3xl font-cinzel mt-4 text-amber-100/80 text-center'>
                        A Symphony of Flavours

                    </span>

                </h2>
                <div className='flex flex-wrap justify-center gap-4 mb-16'>
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-cinzel text-sm sm:text-lg tracking-widest backdrop-blur-sm ${activeCategory === cat ? 'bg-gradient-to-r from-amber-900/80 to-amber-700/80 border-amber-800 scale-105 shadow-xl shadow-amber--900/30'
                            : 'bg-amber-900/20 border-amber-800/30 text-amber-100/80 hover:bg-amber-800/40 hover:scale-95'}`}>
                            {cat}

                        </button>
                    ))}
                </div>

                <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
                    {displayItems.map((item, i) => {
                        const quantity = getQuantity(item.id);
                        return (
                            <div key={item.id} className='group relative bg-amber-900/25 rounded-3xl overflow-hidden border border-amber-800/20 backdrop-blur-sm flex flex-col transition-all duration-500' style={{ '---index': i }}>
                                <div className='relative h-56 overflow-hidden flex items-center justify-center p-6 bg-gradient-to-b from-black/20 to-transparent'>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className='w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-2xl'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-[#1a120b]/60 to-transparent pointer-events-none' />
                                </div>
                                <div className='p-4 sm:p-6  flex flex-col flex-grow'>

                                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-amber-800/50 to-transparent opacity-50 transition-all duration-300' />
                                    <h3 className='text-xl sm:text-2xl mb-2 font-dancingscript text-amber-100 transition-colors'>
                                        {item.name}


                                    </h3>
                                    <p className='text-amber-100/80 text-xs sm:text-sm mb-4 font-cinzel leading-relaxed'>
                                        {item.description}

                                    </p>
                                    <div className='mt-auto flex items-center gap-4 justify-between'>
                                        <div className='bg-amber-100/10 backdrop-blur-sm px-3 py-1 rounded-2xl shadow-lg'>
                                            <span className='text-xl font-bold text-amber-300 font-dancingscript'>
                                                ₹{item.price}

                                            </span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            {quantity > 0 ? (
                                                <>
                                                    <button className='w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors' onClick={() => quantity > 1 ? updateQuantity(item, quantity - 1) : removeFromCart(item)}>
                                                        <FaMinus className='text-amber-100' />
                                                    </button>
                                                    <span className='w-8 text-center text-amber-100'>
                                                        {quantity}
                                                    </span>
                                                    <button onClick={() => updateQuantity(item, quantity + 1)} className='w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors'>
                                                        <FaPlus className='text-amber-100' />
                                                    </button>
                                                </>
                                            ) : (
                                                <button onClick={() => addToCart(item, 1)} className='bg-amber-900/40 px-4 py-1.5 rounded-full font-cinzel text-xs uppercase sm:text-sm tracking-wider transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-900/20 relative overflow-hidden border-none'>
                                                    <span className='relative z-10 text-xs text-amber-100'>
                                                        Add to Cart
                                                    </span>
                                                </button>
                                            )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className='flex flex-wrap justify-center items-center gap-6 mt-16 px-4 py-8 bg-black/40 border border-amber-500/10 rounded-[3rem] shadow-2xl backdrop-blur-xl relative z-[99999] opacity-100 visible'>
                    <button
                        type="button"
                        onClick={() => {
                            if (showAll) {
                                setShowAll(false);
                                // Smooth scroll back to category tabs
                                const categoryTabs = document.querySelector('.flex.flex-wrap.justify-center.gap-4');
                                if (categoryTabs) {
                                    categoryTabs.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            } else {
                                setShowAll(true);
                            }
                        }}
                        className='min-w-[200px] bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-cinzel text-sm sm:text-base uppercase tracking-widest shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer block text-center font-bold border border-white/20 hover:brightness-110'
                    >
                        {showAll ? 'Show Less items' : 'Show More items'}
                    </button>

                    <Link
                        className='min-w-[200px] bg-amber-900/90 border border-amber-500/30 text-amber-50 px-8 py-4 rounded-full font-cinzel text-sm sm:text-base uppercase tracking-widest backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-amber-800 hover:text-white hover:scale-105 block text-center font-bold hover:brightness-110'
                        to='/menu'
                    >
                        Explore Full Menu
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default OurHomeMenu;
