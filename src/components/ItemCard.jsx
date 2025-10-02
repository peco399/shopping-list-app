import React from 'react'

export default function ItemCard({ 
  item, 
  onDeleteItem,
  onToggleComplete,
  onMoveToShopping,    
  showCompleteButton = true, 
  showMoveButton = false    
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
                {item.completed ? '購入済み' : '未購入'}
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
              {item.completed ? '購入済み' : '未購入'}
            </span>
          </button>
        )}

        {showMoveButton && onMoveToShopping && (
          <button 
            onClick={handleMoveToShopping}
            className="item-action-button move-button"
          >
            <span className="action-icon">🛒</span>
            <span className="action-text">買い物へ</span>
          </button>
        )}
        
        <button 
          onClick={handleDelete}
          className="item-action-button delete-button"
          title="アイテムを削除"
        >
          <span className="action-icon">🗑️</span>
          <span className="action-text">削除</span>
        </button>
      </div>
      
    </li>
  )
}
