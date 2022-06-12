import { useState, useEffect } from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Spinner from './Spinner';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const { width } = useWindowDimensions();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) =>
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      );

      setListings(listings);
      setLoading(false);
    };

    fetchFeaturedListings();
  }, []);

  if (loading) return <Spinner />;

  if (listings.length === 0) return <></>;

  return (
    listings && (
      <>
        <p className='exploreHeading'>Recommended</p>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                  height: `${width < 1200 ? '200px' : '400px'}`,
                }}
                className='swiperSlideDiv'
              >
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ${data.discountedPrice ?? data.regularPrice}
                  {data.type === 'rent' && ' / Month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
export default Slider;
