import React, {type Dispatch, type SetStateAction, useCallback} from 'react'
import {useAppDispatch} from '@/store/reduxHook.ts';
import {getNews} from '@pages/HomePage/slice/slice.ts';
import type {NewsFilters} from '@pages/HomePage/types/new.ts';


const categories = [
  { id: "general", name: "All News", icon: "fas fa-globe" },
  { id: "technology", name: "Technology", icon: "fas fa-microchip" },
    { id: "entertainment", name: "Entertainment", icon: "fas fa-film" },
  { id: "business", name: "Business", icon: "fas fa-chart-line" },
  { id: "sports", name: "Sports", icon: "fas fa-futbol" },
  { id: "health", name: "Health", icon: "fas fa-heartbeat" },
  { id: "science", name: "Science", icon: "fas fa-flask" },

]

interface CategoryProps {
    filters: NewsFilters;
    setFilters: Dispatch<SetStateAction<NewsFilters>>;
    newsLoading:boolean;
}


const CategoryFilter: React.FC<CategoryProps> = (props) => {
    const dispatch = useAppDispatch();
  const { filters,setFilters,newsLoading } = props

  const handleCategoryChange = useCallback(
    (categoryId: string) => {
        setFilters((prev) => ({
            ...prev,
            query:'',
            category:categoryId,
            selectedChannel: '',
        }));
      if (categoryId !== filters?.category) {
          dispatch(getNews({q:categoryId}));
      }
    },
    [filters?.category, getNews],
  )

  return (
    <div className="text-center">
      <h3 className="text-white mb-4 fw-bold">
        <i className="fas fa-filter me-2"></i>
        Explore Categories
      </h3>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`btn ${
                filters?.category === category.id ? "btn-primary" : "btn-outline-light"
            } rounded-pill px-4 py-2`}
            onClick={() => handleCategoryChange(category.id)}
            disabled={newsLoading}
          >
            <i className={`${category.icon} me-2`}></i>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default React.memo(CategoryFilter)
