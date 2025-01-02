import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FoodRecipe from './components/FoodRecipe';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import RecipePage from './pages/RecipePage';
import TagPage from './pages/TagPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FoodRecipe />} />
        <Route path='/category' element={<CategoryPage />}/>
        <Route path='/search' element={<SearchPage />} />
        <Route path='/search/:query' element={<SearchPage />} />
        <Route path='/recipes/:id' element={<RecipePage />} />
        <Route path='/tag/:query' element={<TagPage />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
