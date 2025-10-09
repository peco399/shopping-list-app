import React,{useState, useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import ItemForm from '../components/ItemForm'
import ItemList from '../components/ItemList'

export default function ShoppingList({onSaveList, savedLists,lang, t}) {// eslint-disable-line no-unused-vars
  const { dateId } = useParams()

  const [items, setItems] = useState([ ])

  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const existingList = savedLists.find(list => list.dateId === dateId)
    if (existingList) {
      // 既存のリストがある場合は読み込む
      setItems(existingList.items)
      setIsSaved(true)
    } else {
      // 新しいリストの場合は空から始める
      setItems([])
      setIsSaved(false)
    }
  }, [dateId, savedLists])


  const addItem=(itemName)=>{
    if (!itemName.trim()) return

    const newItem={
      id: Date.now(), // 簡単なID生成（時間ベース）
      name: itemName.trim(),
       completed: false // ← completedプロパティを追加
    }
    const updatedItems = [...items, newItem]
    setItems(updatedItems)
    onSaveList(dateId, updatedItems) // ← 直接保存
    setIsSaved(true) // ← 保存済み状態に
  }

  const deleteItem =(itemId)=>{
    const updatedItems = items.filter(item => item.id !== itemId)
    setItems(updatedItems)
    onSaveList(dateId, updatedItems) // ← 直接保存
    setIsSaved(true) // ← 保存済み状態に
  }
  
  const toggleComplete = (itemId)=>{
    const updatedItems = items.map(item=> item.id===itemId? {...item,completed: !item.completed} : item)
    setItems(updatedItems)
    onSaveList(dateId, updatedItems) // ← 直接保存
    setIsSaved(true) // ← 保存済み状態に
  }

 // const handleSaveList =()=>{
  //  onSaveList(dateId,items)
   // setIsSaved(true)
   // alert('リストを保存しました 📝')
 // }

  return (
    <main className="home-page-container">
      <div className="memo-page">
        <div className="memo-holes">
          <div className="hole"></div>
          <div className="hole"></div>
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
              <span className="page-icon">🛒</span>
              <h2 className="page-heading">{t('shoppingListTitle')}</h2>
              <div className="shopping-date-badge" >
                📅 {dateId}
              </div>
              <div className="back-to-home-container">
            <Link to="/" className="back-to-home-btn">
              <span className="back-icon">🏠</span>
              <span className="back-text">{t('backToHome')}</span>
            </Link>
          </div>
              
            </div>
          <div className="memo-title-underline"></div>

        </div>
      

      

          <div className="create-button-wrapper">
            <button 
              
              className={`shopping-save-button ${isSaved ? 'saved' : 'unsaved'} ${items.length === 0 ? 'disabled' : ''}`}
              disabled={items.length === 0}
            >
              <span className="create-icon">{isSaved ? '✅' : '💾'}</span>
              <span className="create-text">
                {isSaved ? t('listSaved') : t('saveList')}
              </span>
              
            </button>
          </div>

          <div className="memo-search-container">
            <div className="memo-search-header">
              <span className="search-icon">➕</span>
              <h3 className="search-title">{t('addNewItem')}</h3>
            </div>
            <div className="search-title-underline"></div>
            <ItemForm onAddItem={addItem} t={t} lang={lang} />
          </div>

          


      <div className="lists-title-underline"></div>
            <ItemList 
              items={items} 
              onDeleteItem={deleteItem}
              onToggleComplete={toggleComplete}
              t={t}
              lang={lang}  
            />
          </div>
        </div>
  
    </main>
  )
}
