
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/Home'
import ShoppingList from './pages/ShoppingList'
import  WishList from './pages/WishList'
import { useState, useEffect } from 'react'
import translations from './Translations'

import './App.css'

function App() {
  const [savedLists, setSavedLists] = useState([])

  const [wishlistItems, setWishlistItems] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [initialized, setInitialized] = useState(false)
  const [lang, setLang] = useState('ja')

  const t = (key) => {
    return translations[lang][key] || key
  }

  useEffect(() => {
    const saved = localStorage.getItem('shopping-data')

    if (saved) {
      try {
        const data = JSON.parse(saved)
        setSavedLists(data.lists || [])
        setWishlistItems(data.wishlist || [])
      } catch (e) {
        console.error('localStorageのJSONが不正です', e)
      }
    }
    setInitialized(true)
  }, [])

  useEffect(() => {
  const saved = localStorage.getItem('shopping-data');

  if (saved) {
    try {
      const data = JSON.parse(saved);
      // データが正しくパースできたらそのままセット
      setSavedLists(data.lists || []);
      setWishlistItems(data.wishlist || []);
    } catch (e) {
      console.error('localStorageのJSONが不正です', e);
      
    }
  } setInitialized(true); // ← 読み込み完了
}, []);


  // ← 【追加2】データが変更されたらlocalStorageに保存
  useEffect(() => {
    if (!initialized) return; 
    console.log("★ localStorage保存発火", savedLists, wishlistItems);
    localStorage.setItem('shopping-data', JSON.stringify({
    lists: savedLists,
      wishlist: wishlistItems
    }));
  }, [savedLists, wishlistItems,initialized]);


  // 連番付きdateIdを生成する関数
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

  // リスト保存関数
  const saveShoppingList = (dateId, items) => {
    // 既存のリストがあるかチェック
    const existingListIndex = savedLists.findIndex(list => list.dateId === dateId)
    if (existingListIndex >= 0){
    const listData = {
      dateId,
      items: [...items], // アイテムのコピーを保存
      createdAt: savedLists[existingListIndex].createdAt,
      updatedAt: new Date().toISOString()
    }
    setSavedLists(prevLists => 
        prevLists.map((list, index) => 
          index === existingListIndex ? listData : list
        )
      )
    } else {
      // 新しいリストを追加（連番チェック）
      let finalDateId = dateId
      
      // dateIdが既に連番付き（括弧を含む）でない場合のみ連番生成
      if (!dateId.includes('(')) {
        finalDateId = generateUniqueeDateId(dateId)
      }
      const listData = {
        dateId:  finalDateId, // 連番付きIDを使用
        items: [...items],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      setSavedLists(prevLists => [...prevLists, listData])
    }
  }

  
  // 検索機能（新規追加）
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword)
  }

  // 検索結果のフィルタリング
  const getFilteredLists = () => {
    if (!searchKeyword.trim()) {
      return savedLists // 検索キーワードが空の場合は全て表示
    }
    
    return savedLists.filter(list => 
      list.dateId.indexOf(searchKeyword) !== -1 // indexOfを使用して日付で検索
    )
  }


  const deleteShoppingList =(dateId)=>{
    const confirmDelete =window.confirm(`${dateId} ${t('confirmDelete')}`)
    if (confirmDelete) {
      setSavedLists(prevLists => 
        prevLists.filter(list => list.dateId !== dateId)
      )
    }
  
  }

  const moveToShoppingList = (wishlistItem, targetDateId) => {
  const targetList = savedLists.find(list => list.dateId === targetDateId)
  
  if (!targetList) {
    alert(`${targetDateId}${t('noShoppingLists')}`)
    return false
  }
  
  const shoppingItem = {
    id: Date.now(),
    name: wishlistItem.name,
    completed: false
  }
  
  const updatedItems = [...targetList.items, shoppingItem]
  saveShoppingList(targetList.dateId, updatedItems)
  
  setWishlistItems(prevItems =>
    prevItems.filter(item => item.id !== wishlistItem.id)
  )
  
  return true
}
    
  const addWishlistItem = (itemName) => {
    if (!itemName.trim()) return
    
    const newItem = {
      id: Date.now(), // 簡単なID生成（時間ベース）
      name: itemName.trim(),
      createdAt: new Date().toISOString()
    }
    
    setWishlistItems(prevItems => [...prevItems, newItem])
    
  }

  const deleteWishlistItem = (itemId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId))
    
  }

  //const saveWishlist = () => {
   // console.log('Wishlistを保存しました:', wishlistItems)
   // alert('Wishlistを保存しました')
  //}

  return (
    <>
      <Router>
      <Header  lang={lang} setLang={setLang} t={t} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              savedLists={getFilteredLists()} 
              onDeleteList={deleteShoppingList}
              onSearch={handleSearch}
              searchKeyword={searchKeyword}
              lang={lang}
              t={t}
            />
          } 
        />
        <Route path='/shopping/:dateId' 
        element={<ShoppingList onSaveList={saveShoppingList}
        savedLists={savedLists}  lang={lang}
                t={t}
                />
                }
                />
        <Route path='/wishlist' element={<WishList 
            wishlistItems={wishlistItems}
            onAddWishlistItem={addWishlistItem}
            onDeleteWishlistItem={deleteWishlistItem}
            onMoveToShopping={moveToShoppingList} 
          savedLists={savedLists}
          lang={lang}
                t={t} />}/>
      </Routes>
    
      <Footer lang={lang} t={t} />
    </Router>
      
    </>
  )
}

export default App
