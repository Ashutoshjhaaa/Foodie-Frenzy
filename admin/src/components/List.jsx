import React, { useEffect, useState } from 'react';
import { styles } from '../assets/dummyadmin';
import axios from 'axios';
import { FiTrash2, FiStar, FiHeart } from 'react-icons/fi';

const List = () => {
    const [list, setList] = useState([]);
    const API_URL = "http://localhost:4000";

    const fetchList = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/items`);
            if (response.status === 200) {
                // If the response is an array directly or inside a data property
                const data = Array.isArray(response.data) ? response.data : response.data.data;
                setList(data || []);
            }
        } catch (error) {
            console.error("Error fetching list", error);
        }
    };

    const removeFood = async (foodId) => {
        try {
            const response = await axios.delete(`${API_URL}/api/items/${foodId}`);
            await fetchList();
            if (response.status === 200) {
                alert("Item Removed");
            }
        } catch (error) {
            console.error("Error removing item", error);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className={styles.pageWrapper}>
            <div className='max-w-7xl mx-auto'>
                <div className={styles.cardContainer}>
                    <h2 className={styles.title}>Manage Menu Items</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead className={styles.thead}>
                                <tr>
                                    <th className={styles.th}>Image</th>
                                    <th className={styles.th}>Name</th>
                                    <th className={styles.th}>Category</th>
                                    <th className={styles.th}>Price</th>
                                    <th className={styles.thCenter}>Rating</th>
                                    <th className={styles.thCenter}>Popularity</th>
                                    <th className={styles.thCenter}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item, index) => (
                                    <tr key={index} className={styles.tr}>
                                        <td className={styles.imgCell}>
                                            <img src={`${API_URL}${item.imageUrl}`} alt="" className={styles.img} />
                                        </td>
                                        <td className={styles.nameCell}>
                                            <p className={styles.nameText}>{item.name}</p>
                                            <p className={styles.descText}>{item.description.substring(0, 50)}...</p>
                                        </td>
                                        <td className={styles.categoryCell}>{item.category}</td>
                                        <td className={styles.priceCell}>₹{item.price}</td>
                                        <td className={styles.ratingCell}>
                                            <div className='flex items-center justify-center gap-1 text-amber-500'>
                                                <FiStar className='fill-amber-500' />
                                                <span>{item.rating}</span>
                                            </div>
                                        </td>
                                        <td className={styles.heartsCell}>
                                            <div className={styles.heartsWrapper + " justify-center"}>
                                                <FiHeart className='fill-amber-500' />
                                                <span>{item.hearts}</span>
                                            </div>
                                        </td>
                                        <td className='p-4 text-center'>
                                            <button onClick={() => removeFood(item._id)} className={styles.deleteBtn}>
                                                <FiTrash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {list.length === 0 && (
                            <div className={styles.emptyState}>No items found in the menu.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List
