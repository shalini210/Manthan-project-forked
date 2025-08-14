import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Config";

export default function CategorySection({ onCategoryClick }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/userquestion/distinct-categories`)
            .then((res) => {
                setCategories(res.data.data);
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
                        onClick={() => onCategoryClick(cat)}
                    >
                        {cat}
                    </li>
                ))}
            </ul>
        </div>
    );
}
