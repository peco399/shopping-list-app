import React, { useState } from 'react'

export default function SearchBox({ onSearch, searchKeyword, lang, t }) {// eslint-disable-line no-unused-vars

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
        <h3 className="search-title">{t('searchTitle')}</h3>
        
      </div>
      <div className="search-title-underline"></div>
    
      <div className="memo-search-box">
        <input
          type="text"
          name='search'
          placeholder={t('searchPlaceholder')}
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
            <span className="clear-text">{t('clearSearch')}</span>
          </button>
        )}
      </div>
      <div className="search-hint">
        <span className="hint-icon">💡</span>
        <small className="hint-text">
          {t('searchHint')}<br className='sp-only'></br>{t('searchHintLine2')}
      </small>
      </div>
    </div>
  
  )
}