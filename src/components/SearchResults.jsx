import { useDataContext } from '../context/DataContext';
import SearchedItem from './SearchedItem';
import styles from '../Search.module.css';

const SearchResults = () => {
  const { data } = useDataContext();

  return (
    <div className={styles.searchResults}>
      {data.map((item) => (
        <SearchedItem key={item.href} item={item} />
      ))}
    </div>
  );
};

export default SearchResults;
