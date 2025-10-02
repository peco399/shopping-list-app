import React,{useState} from 'react'
import ItemForm from '../components/ItemForm'
import ItemList from '../components/ItemList'
import { Link } from 'react-router-dom'

export default function WishlistPage({
  wishlistItems,
  onAddWishlistItem,
  onDeleteWishlistItem,
  onSaveWishlist,
  onMoveToShopping,
  savedLists}) {

const [isSaved, setIsSaved] = useState(false)


  
  const handlemoveToShoppingList = (item) =>{
     // 1. 既存の買い物リストがあるかチェック
      
  
    if (!savedLists || savedLists.length === 0) {
      alert('買い物リストがありません。\n先にホーム画面で買い物リストを作成してください。')
      return
    }

    // 2. リストが1つだけの場合は自動選択
    if (savedLists.length === 1) {
      const targetList = savedLists[0]
      const success = onMoveToShopping(item, targetList.dateId)
      
      if (success) {
        alert(`「${item.name}」を ${targetList.dateId} の買い物リストに移行しました！`)
      }
      return
    }

    // 3. 複数のリストがある場合は選択肢を表示
    // リストを新しい順に並び替え（最新のものを上に）
    const sortedLists = [...savedLists].sort((a, b) => 
      new Date(b.updatedAt) - new Date(a.updatedAt)
    )

    // 選択肢のテキストを作成
    const listOptions = sortedLists.map((list, index) => 
      `${index + 1}. ${list.dateId} (${list.items.length}個のアイテム)`
    ).join('\n')
    
    const choice = prompt(
      `「${item.name}」をどの買い物リストに移行しますか？\n\n${listOptions}\n\n番号を入力してください（1-${sortedLists.length}）:`
    )

    // 4. キャンセルまたは無効な入力の場合
    if (choice === null || choice.trim() === '') {
      return // キャンセル
    }

    const choiceIndex = parseInt(choice.trim()) - 1

    if (isNaN(choiceIndex) || choiceIndex < 0 || choiceIndex >= sortedLists.length) {
      alert('無効な選択です。1から' + sortedLists.length + 'の番号を入力してください。')
      return
    }

    // 5. 選択されたリストに移行
    const selectedList = sortedLists[choiceIndex]
    const success = onMoveToShopping(item, selectedList.dateId)
    
    if (success) {
      alert(`「${item.name}」を ${selectedList.dateId} の買い物リストに移行しました！`)
    }
    
  }


  
  const handleDeleteItem = (itemId) => {
    onDeleteWishlistItem(itemId)
     onSaveWishlist()       // ← 削除と同時に保存
     setIsSaved(true)       // ← 保存済みに
  }

  const handleAddItem = (itemName) => {
    if (!itemName.trim()) return
    onAddWishlistItem(itemName)
    onSaveWishlist()       // ← 追加と同時に保存
    setIsSaved(true)       // ← 保存済みに
  }
  
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
        
        
        <div className="memo-page-header">
            <div className="memo-page-title">
              <span className="page-icon">⭐</span>
              <h2 className="page-heading">ほしいものリスト</h2>
              <div className="wishlist-badge">
                <span className="wishlist-count">{wishlistItems.length}</span>
                <span className="wishlist-label">アイテム</span>
                
          </div>
          <div className="back-to-home-container">
            <Link to="/" className="back-to-home-btn">
              <span className="back-icon">🏠</span>
              <span className="back-text">ホームに戻る</span>
            </Link>
          </div>
        </div>
        <div className="memo-title-underline"></div>
      </div>
      
      <div className="create-button-wrapper">
        <button 
        className={`wishlist-save-button ${isSaved ? 'saved' : 'unsaved'}`}>
          
          <span className="create-icon">{isSaved ? '✅' : '⭐'}</span>
              <span className="create-text">ほしいものリストを保存</span>
              <div className="button-doodle">{isSaved ? '✓' : '→'}</div>
        </button>
      </div>

      <div className="memo-search-container">
            <div className="memo-search-header">
              <span className="search-icon">✨</span>
              <h3 className="search-title">ほしいアイテムを追加</h3>
            </div>
            <div className="search-title-underline"></div>
            <ItemForm onAddItem={handleAddItem} />
          </div>
          <div className="memo-lists-container">
            <div className="memo-lists-header">
              <span className="lists-icon">📝</span>
              <h3 className="lists-title">ほしいものリストアイテム</h3>
            </div>
            <div className="lists-title-underline"></div>
      
      <ItemList items={wishlistItems}
      onDeleteItem={handleDeleteItem}
      onMoveToShopping={handlemoveToShoppingList}
      showCompleteButton={false}  
      showMoveButton={true}     />
      </div>
      </div>
      </div>
    </main>
  )
}
