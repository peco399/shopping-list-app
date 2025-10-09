import React, { useState } from 'react'

export default function ItemForm({onAddItem,lang, t}) {// eslint-disable-line no-unused-vars
const [itemName, setItemName] = useState('')

const handleSubmit = (e) => {
    e.preventDefault()
    
    // 親コンポーネントのaddItem関数を呼び出し
    onAddItem(itemName)
    
    // フォームをリセット
    setItemName('')
  }

  return (
    <form onSubmit={handleSubmit}  className="item-form">
      <div className="memo-search-box">
      <input type="text" 
      value={itemName}
      onChange={(e) => setItemName(e.target.value)}
      placeholder={t('itemPlaceholder')}
      required
      className="memo-search-input"
      />
      <button
      type="submit"
      className="item-add-button"
      disabled={!itemName.trim()}
      >
        <span className="add-icon">➕</span>
        <span className="add-text">{t('addButton')}</span>
      </button>
      </div>
      <div className="search-hint">
        <span className="hint-icon">💡</span>
        <span className="hint-text">{t('addHint')}</span>
      </div>
    </form>
  )
}
