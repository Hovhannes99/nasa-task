import styles from '../Search.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';

const SearchedItem = ({ item }) => {
  const { thumbImage } = useDataContext();

  return (
    <Link
      to={`/results/${item.data[0].nasa_id}`}
      className={styles.linkContainer}
    >
      <div className={styles.itemContainer}>
        <div>
          <LazyLoadImage
            src={thumbImage[item.data[0].nasa_id]}
            alt='img'
            width={100}
            height={100}
            loading='lazy'
          />
        </div>
        <p>{item.data[0].title}</p>
        <p>{item.data[0].location}</p>
        <p
          style={{
            paddingRight: 10,
            wordBreak: 'break-word',
            overflow: 'hidden',
          }}
        >
          {item.data[0].secondary_creator}
        </p>
      </div>
    </Link>
  );
};

export default SearchedItem;
