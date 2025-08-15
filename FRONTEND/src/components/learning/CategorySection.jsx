import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Config";

export default function CategorySection({ onCategoryClick }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/userquestion/distinct-categories`)
            .then((res) => {
                setCategories(res.data.data); // array of { _id, count }
            })
            .catch((err) => {
                console.error("Error loading categories", err);
            });
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <h2 className="text-xl font-bold mb-3 border-b pb-2">All Categories</h2>
            <ul className="space-y-2">
                {categories.map((cat, index) => (
                    <li
                        key={index}
                        className="text-blue-600 hover:underline cursor-pointer uppercase"
                        onClick={() => onCategoryClick(cat._id)} // pass the category name
                    >
                        {cat._id} ({cat.count})  {/* show count */}
                    </li>
                ))}
            </ul>
        </div>
    );
}
