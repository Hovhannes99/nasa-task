import styles from '../../Search.module.css';
import { useDataContext } from '../../context/DataContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from '../../components/SearchResults';

export const Search = () => {
  const {
    data,
    fetchData,
    setSearchItem,
    setYearStart,
    setYearEnd,
    errorMessage,
    loading,
    setData,
  } = useDataContext();

  const pathname = useLocation();

  const handleKeyPress = (e) => {
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleNumberKeyPress = (e) => {
    const regex = /^[0-9]{1,4}$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('data'));
    if (savedData) {
      setData(savedData);
    } else {
    }
  }, []);

  return (
    <div>
      <form className={styles.inputContainer} onSubmit={fetchData}>
        <input
          type='text'
          className={styles.search}
          onChange={(event) => setSearchItem(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type='text'
          id='start'
          placeholder='year start'
          pattern='^[0-9]*$'
          onKeyPress={handleNumberKeyPress}
          onChange={(e) => setYearStart(e.target.value)}
          maxLength={4}
        />
        <input
          type='text'
          id='end'
          placeholder='year end'
          pattern='^[0-9]*$'
          onKeyPress={handleNumberKeyPress}
          onChange={(e) => setYearEnd(e.target.value)}
          maxLength={4}
        />
        <button className={styles.searchButton} type='submit'>
          <img
            src='../../images/search-icon.svg'
            alt='searchIcon'
            width='20px'
            height='20px'
          />
        </button>
      </form>
      <div className={styles.content}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : data.length > 0 && pathname.pathname.includes('/results') ? (
          <SearchResults />
        ) : "No Data"}
      </div>
    </div>
  );
};

export default Search;
