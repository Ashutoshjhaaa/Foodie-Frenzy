import React, { useState } from 'react';
import { styles } from '../assets/dummyadmin';
import { FiUpload, FiHeart, FiStar } from 'react-icons/fi';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Additems = () => {

      const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    rating: 0,
    hearts: 0,
    total: 0,
    image: null,
    preview: ''
  });
  const [categories] = useState([
    'Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'
  ]);
  const [hoverrating, setHoverRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }
  // FOR IMAGE HANDLING
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }))
    }
  }

  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  }
   const hendleHearts = () => {
    setFormData(prev => ({ ...prev, hearts: prev.hearts + 1 }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'preview') return;
        payload.append(key, value);
      });
      const response = await axios.post(`${API_URL}/api/items`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 201 || response.data.success) {
        alert("Item added successfully!");
        setFormData({
          name: '',
          description: '',
          category: '',
          price: '',
          rating: 0,
          hearts: 0,
          total: 0,
          image: null,
          preview: ''
        });
      }
    } catch (error) {
      console.error("Submission error", error);
    }
  }

  return (
    <div className={styles.formWrapper}>
      <div className='max-w-4xl mx-auto'>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Add New Item</h2>

          <form className='space-y-6 sm:space-y-8' onSubmit={handleSubmit}>
            <div className={styles.uploadWrapper}>
              <label className={styles.uploadLabel}>
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {formData.preview ? (
                                <img src={formData.preview} alt="Preview" className={styles.previewImage} />
                            ) : (
                                <div className='text-center p-4'>
                                    <FiUpload className={styles.uploadIcon} />
                                    <p className={styles.uploadText}>Click to upload product image</p>

                                </div>

                            )}

                        </label>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-amber-100 mb-2'>Item Name</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder='Enter product name'
                  required
                />
              </div>
              <div>
                <label className='block text-amber-100 mb-2'>Price</label>
                <div className='relative'>
                  <span className='absolute left-4 top-1/2 -translate-y-1/2 text-amber-500'>₹</span>
                  <input
                    type='number'
                    name='price'
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`${styles.inputField} pl-8`}
                    placeholder='0.00'
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label className='block text-amber-100 mb-2'>Description</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                className={styles.inputField}
                rows='4'
                placeholder='Enter product description'
                required
              />
            </div>
            <div>
              <label className='block text-amber-100 mb-2 font-medium'>Category</label>
              <select
                name='category'
                value={formData.category}
                onChange={handleInputChange}
                className={styles.inputField}
                required
              >
                <option value=''>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-amber-100 mb-2 font-medium'>Rating</label>
                <div className='flex items-center gap-3 w-full bg-[#3a2b2b]/50 border border-amber-500/20 rounded-xl px-4 py-2 focus-within:border-amber-400 group h-[52px] sm:h-[60px] transition-all'>
                  <div className='flex items-center gap-1 flex-shrink-0'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        className={`text-xl cursor-pointer transition-colors ${
                          (hoverrating || formData.rating) >= star ? 'text-amber-500 fill-amber-500' : 'text-amber-100/30'
                        }`}
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    ))}
                  </div>
                  <input
                    type='number'
                    name='rating'
                    min='0'
                    max='5'
                    step='0.1'
                    value={formData.rating}
                    onChange={handleInputChange}
                    className='bg-transparent border-none focus:ring-0 text-amber-100 w-full placeholder:text-amber-100/20 text-sm'
                    placeholder='0.0'
                  />
                  {formData.rating > 0 && (
                    <button 
                      type='button'
                      onClick={() => handleRating(0)}
                      className='text-xs text-red-400 hover:text-red-300 underline flex-shrink-0'
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className='block text-amber-100 mb-2 font-medium'>Popularity (Hearts)</label>
                <div className='flex items-center gap-3 w-full bg-[#3a2b2b]/50 border border-amber-500/20 rounded-xl px-4 py-2 focus-within:border-amber-400 group h-[52px] sm:h-[60px] transition-all'>
                  <button
                    type='button'
                    onClick={hendleHearts}
                    className='p-1.5 rounded-lg text-amber-500 hover:bg-amber-500/10 transition-all flex-shrink-0'
                  >
                    <FiHeart className={formData.hearts > 0 ? 'fill-amber-500' : ''} size={24} />
                  </button>
                  <input
                    type='number'
                    name='hearts'
                    value={formData.hearts}
                    onChange={handleInputChange}
                    className='bg-transparent border-none focus:ring-0 text-amber-100 w-full placeholder:text-amber-100/20'
                    placeholder='Enter Hearts'
                  />
                  {formData.hearts > 0 && (
                    <button 
                      type='button'
                      onClick={() => setFormData(p => ({ ...p, hearts: 0 }))}
                      className='text-xs text-red-400 hover:text-red-300 underline flex-shrink-0'
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            <button type='submit' className={styles.actionBtn}>
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}


export default Additems
