import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import ShoppingListCard from '../components/shoppingListCard'
import SearchBox from '../components/SearchBox'

export default function HomePage({savedLists, onDeleteList,onSearch, searchKeyword}) {
  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]

  //連番付きdateIdを生成する関数
  const generateUniqueeDateId = (baseDate) => {
    // 同じベース日付で始まる既存のリストを検索
    const sameDateLists = savedLists.filter(list => 
      list.dateId === baseDate || list.dateId.startsWith(baseDate + '(')
    )
    
    if (sameDateLists.length === 0) {
      // 同じ日付のリストが存在しない場合はそのまま返す
      return baseDate
    }
    
    // 同じ日付のリストが存在する場合は連番を付与
    let counter = 2 // (2)から開始
    let newDateId = `${baseDate}(${counter})`
    
    // 重複しない連番を見つけるまでループ
    while (savedLists.some(list => list.dateId === newDateId)) {
      counter++
      newDateId = `${baseDate}(${counter})`
    }
    
    return newDateId
  }

  // 新しいリスト作成ボタンのハンドラ
  const handleCreateNewList = () => {
    const uniqueDateId = generateUniqueeDateId(today)
    navigate(`/shopping/${uniqueDateId}`)
  }

  return (
    <main className="home-page-container">

      <div className="memo-page">
        {/* 左側の穴 */}
        <div className="memo-holes">
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
        </div>

        <div className="memo-content-area">
          {/* ページヘッダー */}
          <div className="memo-page-header">
            <div className="memo-page-title">
              <span className="page-icon">🏠</span>
              <h2 className="page-heading">ホーム</h2>
            
            </div>
            <div className="memo-title-underline"></div>
          </div>
      
      <div className="create-button-wrapper">
              
                <button className="memo-create-button" onClick={handleCreateNewList}>
                  <span className="create-icon">✎</span>
                  <span className="create-text">新しい買い物リストを作成</span>
                  <div className="button-doodle">→</div>
                </button>
              
      </div>
      <SearchBox onSearch={onSearch} searchKeyword={searchKeyword} />
      <ShoppingListCard savedLists={savedLists}
      onDeleteList={onDeleteList}
      searchKeyword={searchKeyword}
      />
      </div>
      </div>
    </main>
  )
}
