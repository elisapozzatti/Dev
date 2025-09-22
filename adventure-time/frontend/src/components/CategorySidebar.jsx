import React from "react";
import PropTypes from 'prop-types';

const CategorySidebar = ({ 
  categories, 
  mode = "select", // "select" o "navigate"
  onCategorySelect 
}) => {
  const handleClick = (category, e) => {
    e.preventDefault();
    onCategorySelect(category);
  };

  return (
    <div className="categorie-sidebar">
      <h2>Categorie</h2>
      <ul>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.category_id} className="categorie-item">
              <a
                href="#"
                className="categorie-title"
                onClick={(e) => handleClick(category, e)}
              >
                {category.name}
              </a>
            </li>
          ))
        ) : (
          <li>Non ci sono categorie disponibili.</li>
        )}
      </ul>
    </div>
  );
};

CategorySidebar.propTypes = {
  categories: PropTypes.array.isRequired,
  mode: PropTypes.oneOf(["select", "navigate"]),
  onCategorySelect: PropTypes.func.isRequired
};

export default CategorySidebar;