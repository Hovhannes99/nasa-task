import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDataContext } from '../../context/DataContext';
import styles from '../../Search.module.css';

const Show = () => {
  const { item, images, fetchItem, itemLoading } = useDataContext();
  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItem(itemId);
  }, []);

  return (
    <div>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img
          src='../../images/back-Icon.svg'
          alt='backIcon'
          width={20}
          height={20}
        />
        <span>Back</span>
      </button>
      <div className={styles.detailsContainer}>
        <h1>Details about Image</h1>
        {itemLoading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{ display: 'flex', justifyContent: 'center', width: '50%' }}
          >
            <div className={styles.info}>
              <div>
                <div>
                  <h3>Title</h3>
                  <span> {item?.['AVAIL:Title']}</span>
                </div>
                <div>
                  <h3>Location</h3>
                  <p>{item?.['AVAIL:Location']}</p>
                </div>
                <div>
                  <h3>Photographer</h3>
                  <p>{item?.['AVAIL:Photographer']}</p>
                </div>
                <div>
                  <h3>Description</h3>
                  <div>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.['AVAIL:Description'],
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h3>Date Created</h3>
                  <p>{item?.['AVAIL:DateCreated']}</p>
                </div>
              </div>
              <div>
                <h3>Keywords</h3>
                {item?.['AVAIL:Keywords']?.map((el, index) => {
                  return <p key={index}>{el}</p>;
                })}
              </div>
              <div>
                {images?.map((img, index) => {
                  return (
                    <img
                      src={img.href}
                      alt='nasa'
                      key={index}
                      width={100}
                      height={100}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Show;
