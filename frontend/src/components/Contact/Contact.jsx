import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FiMapPin, FiPhone, FiGlobe, FiMail, FiUser, FiSmartphone, FiHome, FiAward, FiMessageSquare, FiArrowRight } from "react-icons/fi";

const Contact = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-900 via-[#2D1B0E] to-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 font-[Poppins] relative overflow-hidden'>
      <Toaster position='top-center' reverseOrder={false} toastOptions={{ duration: 4000 }} />

      <div className='max-w-6xl w-full relative z-10'>
        {/* HEADER SECTION */}
        <div className='text-left mb-12'>
          <h1 className='text-5xl md:text-6xl font-extrabold tracking-tight'>
            <span className='text-amber-500'>Connect</span>{' '}
            <span className='text-amber-400/90'>With</span>{' '}
            <span className='text-amber-200/80'>Us</span>
          </h1>
          <div className='h-1.5 w-32 bg-gradient-to-r from-amber-600 to-transparent mt-4 rounded-full' />
        </div>

        <div className='flex flex-col space-y-6'>
          {/* HEADQUARTERS */}
          <div className='relative bg-[#3E2716]/60 backdrop-blur-md rounded-2xl p-8 shadow-[10px_10px_20px_rgba(0,0,0,0.4),-5px_-5px_15px_rgba(255,255,255,0.02)] border-l-4 border-amber-600 transition-all duration-300 hover:translate-y-[-4px] group'>
            <div className='flex items-center space-x-6'>
              <div className='p-3 bg-amber-600/20 rounded-xl shadow-inner'>
                <FiMapPin className='text-amber-500 text-3xl' />
              </div>
              <div className='flex flex-col'>
                <h3 className='text-xl font-bold text-white tracking-wide'>Our Headquater</h3>
                <p className='text-amber-100/60 mt-2 text-lg font-light'>Delhi, India</p>
              </div>
            </div>
          </div>

          {/* CONTACT NUMBER */}
          <div className='relative bg-[#3E2716]/60 backdrop-blur-md rounded-2xl p-8 shadow-[10px_10px_20px_rgba(0,0,0,0.4),-5px_-5px_15px_rgba(255,255,255,0.02)] border-l-4 border-green-600 transition-all duration-300 hover:translate-y-[-4px] group'>
            <div className='flex items-center space-x-6'>
              <div className='p-3 bg-green-600/20 rounded-xl shadow-inner'>
                <FiPhone className='text-green-500 text-3xl' />
              </div>
              <div className='flex flex-col'>
                <h3 className='text-xl font-bold text-white tracking-wide'>Contact Number</h3>
                <div className='flex items-center space-x-3 mt-2'>
                  <div className='p-1 bg-green-500/20 rounded-full'>
                    <FiGlobe className='text-green-500 text-sm' />
                  </div>
                  <p className='text-amber-100/60 text-lg font-light'>+91 7070706131</p>
                </div>
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div className='relative bg-[#3E2716]/60 backdrop-blur-md rounded-2xl p-8 shadow-[10px_10px_20px_rgba(0,0,0,0.4),-5px_-5px_15px_rgba(255,255,255,0.02)] border-l-4 border-orange-600 transition-all duration-300 hover:translate-y-[-4px] group'>
            <div className='flex items-center space-x-6'>
              <div className='p-3 bg-orange-600/20 rounded-xl shadow-inner'>
                <FiMail className='text-orange-500 text-3xl' />
              </div>
              <div className='flex flex-col'>
                <h3 className='text-xl font-bold text-white tracking-wide'>Email Address</h3>
                <p className='text-amber-100/60 mt-2 text-lg font-light lowercase'>ashujha707070@gmail.com</p>
              </div>
            </div>
          </div>

          {/* ORDER FORM */}
          <div className='relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500'>
            <div className='absolute -top-3 -right-3 w-10 h-10 bg-amber-500/40 rounded-full blur-sm' />
            
            <form className='space-y-5 relative z-10' onSubmit={(e) => {
              e.preventDefault();
              toast.success('Information received successfully!');
            }}>
              {/* FULL NAME */}
              <div className='space-y-2'>
                <label className='text-amber-100 text-sm font-semibold ml-1'>Full Name</label>
                <div className='relative group'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <FiUser className='text-amber-500/60 transition-colors group-focus-within:text-amber-500' />
                  </div>
                  <input 
                    type='text' 
                    placeholder='Enter your full name'
                    className='w-full bg-[#1A1A1A]/40 border border-amber-900/30 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all'
                    required
                  />
                </div>
              </div>

              {/* PHONE NUMBER */}
              <div className='space-y-2'>
                <label className='text-amber-100 text-sm font-semibold ml-1'>Phone Number</label>
                <div className='relative group'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <FiSmartphone className='text-amber-500/60 transition-colors group-focus-within:text-amber-500' />
                  </div>
                  <input 
                    type='tel' 
                    placeholder='+91 12345 67890'
                    className='w-full bg-[#1A1A1A]/40 border border-amber-900/30 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all'
                    required
                  />
                </div>
              </div>

              {/* EMAIL ADDRESS */}
              <div className='space-y-2'>
                <label className='text-amber-100 text-sm font-semibold ml-1'>Email Address</label>
                <div className='relative group'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <FiMail className='text-amber-500/60 transition-colors group-focus-within:text-amber-500' />
                  </div>
                  <input 
                    type='email' 
                    placeholder='your.email@example.com'
                    className='w-full bg-[#1A1A1A]/40 border border-amber-900/30 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all'
                    required
                  />
                </div>
              </div>

              {/* ADDRESS */}
              <div className='space-y-2'>
                <label className='text-amber-100 text-sm font-semibold ml-1'>Address</label>
                <div className='relative group'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <FiHome className='text-amber-500/60 transition-colors group-focus-within:text-amber-500' />
                  </div>
                  <input 
                    type='text' 
                    placeholder='Enter your delivery address'
                    className='w-full bg-[#1A1A1A]/40 border border-amber-900/30 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all'
                    required
                  />
                </div>
              </div>

              {/* DISH NAME */}
              <div className='space-y-2'>
                <label className='text-amber-100 text-sm font-semibold ml-1'>Dish Name</label>
                <div className='relative group'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <FiAward className='text-amber-500/60 transition-colors group-focus-within:text-amber-500' />
                  </div>
                  <input 
                    type='text' 
                    placeholder='Enter dish name (e.g., Butter Chicken)'
                    className='w-full bg-[#1A1A1A]/40 border border-amber-900/30 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all'
                    required
                  />
                </div>
              </div>

              {/* YOUR QUERY */}
              <div className='space-y-2'>
                <label className='text-amber-100 text-sm font-semibold ml-1'>Your Query</label>
                <div className='relative group'>
                  <div className='absolute top-4 left-4 pointer-events-none'>
                    <FiMessageSquare className='text-amber-500/60 transition-colors group-focus-within:text-amber-500' />
                  </div>
                  <textarea 
                    placeholder='Enter your query here'
                    rows='4'
                    className='w-full bg-[#1A1A1A]/40 border border-amber-900/30 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none'
                    required
                  />
                </div>
              </div>

              <button 
                type='submit'
                className='w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-amber-600/40 transform transition-all hover:scale-[1.01] active:scale-[0.99] mt-2 flex items-center justify-center space-x-2'
              >
                <span>Submit Query</span>
                <FiArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}




  


export default Contact
