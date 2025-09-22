import React from 'react';
import PropTypes from 'prop-types';
import './CategoryInfoCard.css';

const CategoryInfoCard = ({ 
  categoryDetails, 
  title = "Dettagli Categoria",
  showDescription = true,
  showRules = true,
  className = ""
}) => {
  return (
    <div className={`category-info-card ${className}`}>
      <h2 className="category-info-title">{title}</h2>
      <div className="scrollable-content">
        <div className="category-details">
          {showDescription && (
            <>
              <h3>Descrizione</h3>
              <p>{categoryDetails.description || "Nessuna descrizione disponibile"}</p>
            </>
          )}
          
          {showRules && categoryDetails.rules && (
            <>
              <h3>Regole</h3>
              <div className="rules-container">
                <div className="rules-list">
                  {categoryDetails.rules.split('\n').map((rule, index) => (
                    rule.trim() && (
                      <div key={index} className="rule-item">
                        <span className="rule-bullet">•</span>
                        <span className="rule-text">{rule}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

CategoryInfoCard.propTypes = {
  categoryDetails: PropTypes.shape({
    description: PropTypes.string,
    rules: PropTypes.string
  }).isRequired,
  title: PropTypes.string,
  showDescription: PropTypes.bool,
  showRules: PropTypes.bool,
  className: PropTypes.string
};

export default CategoryInfoCard;