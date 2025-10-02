import React, { useState } from 'react'

export default function ItemForm({onAddItem}) {
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
      placeholder="アイテム名" 
      required
      className="memo-search-input"
      />
      <button
      type="submit"
      className="item-add-button"
      disabled={!itemName.trim()}
      >
        <span className="add-icon">➕</span>
        <span className="add-text">追加</span>
      </button>
      </div>
      <div className="search-hint">
        <span className="hint-icon">💡</span>
        <span className="hint-text">Enter キーでも追加できます</span>
      </div>
    </form>
  )
}
