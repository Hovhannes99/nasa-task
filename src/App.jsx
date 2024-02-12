import './App.css';
import SearchResults from './components/SearchResults';
import Search from './pages/Search/Search';
import Show from './pages/Show/Show';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Search />}>
        <Route path='/results' element={<SearchResults />} />
      </Route>
      <Route path='/results/:itemId' element={<Show />} />
    </Routes>
  );
}

export default App;
