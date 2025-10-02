import React from 'react'
import { Link } from 'react-router-dom'

export default function ShoppingListCard({savedLists,onDeleteList,searchKeyword}) {
    if (!savedLists || savedLists.length === 0){
    return (
      <div className="memo-empty-state">
        <div className="empty-state-header">
          <span className="empty-icon">📋</span>
          <h3 className="empty-title">Shopping Lists</h3>
          <div className="empty-doodle">✨</div>
        </div>
        <div className="empty-title-underline"></div>

        <div className="empty-content">
        {searchKeyword ? (
          <div className="empty-search-result">
              <span className="search-result-icon">🔍</span>
              <p className="empty-message">
          「{searchKeyword}」に一致するリストがありません。</p>
          </div>
          ) : (
          <div className="empty-no-lists">
              <span className="no-lists-icon">📝</span>
              <p className="empty-message">まだ保存されたリストがありません。</p>
              <div className="empty-suggestion">
                <span className="suggestion-arrow">↗</span>
                <Link to="/shopping/2025-08-13" className="empty-create-link">
                  新しいリストを作成する
                </Link>
              </div>
            </div>
        )}
        
      </div>
      </div>
    )

    }
    const handleDeleteClick = (e, dateId) => {
    // リンクのクリックイベントを無効化
    e.preventDefault()
    e.stopPropagation()
    
    // 削除関数を呼び出し
    onDeleteList(dateId)
  }

  
  return (
    <div className="memo-lists-container">
      <div className="memo-lists-header">
        <span className="lists-icon">📋</span>
        <h3 className="lists-title">Shopping Lists</h3>
        
      </div>
      <div className="lists-title-underline"></div>
      
      <ul className="memo-cards-grid">
        {savedLists.map(list => (
          <li key={list.dateId} className="memo-list-card">
            <div className="card-pin"></div>
            <div className="card-corner-fold"></div>

            <Link to={`/shopping/${list.dateId}`} className="memo-card-link">
              <div className="card-header">
                <span className="card-date-icon">📅</span>
                <h4 className="card-date">{list.dateId}</h4>
              </div>

              <div className="card-content">
                <div className="card-stats">
                  <div className="stat-item">
                    <span className="stat-icon">🛒</span>
                    <span className="stat-text">
                      アイテム数: <strong>{list.items.length}個</strong>
                      </span>
                </div>
                <div className="stat-item">
                    <span className="stat-icon">✅</span>
                    <span className="stat-text">
                      完了済み: <strong>{list.items.filter(item => item.completed).length}個</strong>
                    </span>
                  </div>
                </div>
                
                <div className="card-timestamp">
                  <span className="timestamp-icon">🕒</span>
                  <small className="timestamp-text">
                    最終更新: {new Date(list.updatedAt || list.createdAt).toLocaleString('ja-JP')}
                  </small>
                </div>
              </div>
            </Link>
            <button onClick={(e) => handleDeleteClick(e, list.dateId)}
              className="memo-delete-button"
              title="リストを削除"
              >
                <span className="delete-icon">🗑️</span>
              <span className="delete-text">削除</span>
              
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
