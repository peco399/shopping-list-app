import React, { useState } from 'react'

export default function SearchBox({ onSearch, searchKeyword }) {
  const [inputValue, setInputValue] = useState(searchKeyword || '')

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    onSearch(value) // リアルタイム検索
  }

  const handleClear = () => {
    setInputValue('')
    onSearch('')
  }

  return (
        <div className="memo-search-container">
      <div className="memo-search-header">
        <span className="search-icon">🔍</span>
        <h3 className="search-title">リスト検索</h3>
        
      </div>
      <div className="search-title-underline"></div>
    
      <div className="memo-search-box">
        <input
          type="text"
          name='search'
          placeholder="日付で検索 (例: 2025-08, 08-01, 2025)"
          value={inputValue}
          onChange={handleInputChange}
          className="memo-search-input"
          
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="memo-clear-button"
            >
            <span className="clear-icon">✕</span>
            <span className="clear-text">クリア</span>
          </button>
        )}
      </div>
      <div className="search-hint">
        <span className="hint-icon">💡</span>
        <small className="hint-text">
          日付の一部を入力して検索できます。<br className='sp-only'></br>（年、月、日付など）
      </small>
      </div>
    </div>
  
  )
}