import React from 'react'

export default function ItemCard({ 
  item, 
  onDeleteItem,
  onToggleComplete,
  onMoveToShopping,    
  showCompleteButton = true, 
  showMoveButton = false,
  lang,// eslint-disable-line no-unused-vars
  t  
  }) {
  
  const handleDelete=()=>{
    onDeleteItem(item.id)
  }
  const handleToggleComplete =()=> {
    onToggleComplete(item.id)
  }

  const handleMoveToShopping = () => {
    if (onMoveToShopping) {
      onMoveToShopping(item)
    }
  }
  return (
    <li className={`item-card ${item.completed ? 'completed' : 'pending'}`}>
      <div className="item-card-pin"></div>
      <div className="item-content">
        <div className="item-main">
          <div className="item-status-icon">
            {item.completed ? '✅' : '⭕'}
          </div>
          <div className="item-info">
            <span className={`item-name ${item.completed ? 'completed-text' : ''}`}>
              {item.name}
            </span>
            <div className="item-status-badge">
              <span className="status-icon">
                {item.completed ? '🎉' : '📝'}
              </span>
              <span className="status-text">
                {item.completed ? t('completed') : t('pending')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="item-actions">
        {showCompleteButton && onToggleComplete && (
          <button 
            onClick={handleToggleComplete}
            className={`item-action-button ${item.completed ? 'uncomplete-button' : 'complete-button'}`}
          >
            <span className="action-icon">
              {item.completed ? '↩️' : '✓'}
            </span>
            <span className="action-text">
              {item.completed ? t('uncomplete') : t('complete')}
            </span>
          </button>
        )}

        {showMoveButton && onMoveToShopping && (
          <button 
            onClick={handleMoveToShopping}
            className="item-action-button move-button"
          >
            <span className="action-icon">🛒</span>
            <span className="action-text">{t('move')}</span>
          </button>
        )}
        
        <button 
          onClick={handleDelete}
          className="item-action-button delete-button"
          title={t('delete')}
        >
          <span className="action-icon">🗑️</span>
          <span className="action-text">{t('delete')}</span>
        </button>
      </div>
      
    </li>
  )
}
