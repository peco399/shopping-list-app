import React from 'react'
import ItemCard from './ItemCard'

export default function ItemList({
  items,
  onDeleteItem,
  onToggleComplete,
  onMoveToShopping,     // Wishlist用（オプショナル）
  showCompleteButton = true,   // 完了ボタンを表示するか
  showMoveButton = false,
  lang,// eslint-disable-line no-unused-vars
  t  
}) {

  if (!items || items.length === 0) {
    return (
      <div className="memo-empty-state">
        <div className="empty-state-header">
          <span className="empty-icon">📝</span>
          <h3 className="empty-title">{t('itemList')}</h3>
          <div className="empty-doodle">✨</div>
        </div>
        <div className="empty-title-underline"></div>
        
        <div className="empty-content">
          <div className="empty-no-lists">
            <span className="no-lists-icon">🛒</span>
            <p className="empty-message">{t('noItemsYet')}</p>
            <div className="empty-suggestion">
            {/* <span className="empty-create-link">{t('addItemSuggestion')}</span> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
  

  return (
    <div className="item-list-container">
  
      <ul className="item-cards-grid">
        {items.map(item => (
          <ItemCard key={item.id} 
          item={item}
          onDeleteItem={onDeleteItem}
          onToggleComplete={onToggleComplete}
          onMoveToShopping={onMoveToShopping}
          showCompleteButton={showCompleteButton}
          showMoveButton={showMoveButton}
          t={t} lang={lang}
          />
          
        ))}
      </ul>
    </div>
  )
}
