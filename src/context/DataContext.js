import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [yearStart, setYearStart] = useState('');
  const [yearEnd, setYearEnd] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);
  const [thumbImage, setThumbImages] = useState('');
  const [singleItem, setSingleItem] = useState(null);
  const [images, setImages] = useState([]);
  const [item, setItem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      const imageRequests = data.map(async (item) => {
        try {
          const result = await axios.get(item.href);
          const thumb = result.data.find((el) => el.includes('thumb'));
          if (thumb) {
            setThumbImages((prevImages) => ({
              ...prevImages,
              [item.data[0].nasa_id]: thumb,
            }));
          }
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      });

      await Promise.all(imageRequests);
    };

    if (data.length > 0) {
      fetchImages();
    }
  }, [data]);

  const fetchData = async (event) => {
    event.preventDefault();
    if (searchItem.trim() === '') {
      setErrorMessage('Please enter a search term.');
    } else {
      setErrorMessage('');
      setLoading(true);
      const result = await axios.get(
        `https://images-api.nasa.gov/search?q=${searchItem}&media_type=image&${
          yearStart ? `year_start=${yearStart}` : ''
        }&${yearEnd ? `year_end=${yearEnd}` : ''}`
      );

      navigate('/results');
      setData(result.data.collection.items);
      setTimeout(() => setLoading(false), 1000);
      localStorage.setItem(
        'data',
        JSON.stringify(result.data.collection.items)
      );
    }
  };

  const fetchItem = async (itemId) => {
    setItemLoading(true);
    try {
      const result = await axios.get(
        `https://images-api.nasa.gov/metadata/${itemId}`
      );
      const result2 = await axios.get(result.data.location);
      const imageCollection = await axios.get(
        `https://images-api.nasa.gov/asset/${itemId}`
      );
      setItem(result2.data);

      const imag = imageCollection?.data.collection.items.filter(
        (img) => !img?.href.includes('metadata')
      );
      setImages(imag);
      setTimeout(() => setItemLoading(false), 1000);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchData,
        setSearchItem,
        setYearStart,
        setYearEnd,
        errorMessage,
        loading,
        images,
        thumbImage,
        singleItem,
        setSingleItem,
        setImages,
        item,
        fetchItem,
        itemLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
