import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import '../Slider/sliderStiles.css'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// External Data import
const url = 'http://localhost:3000/Products';
/**
 * Компонент для отображения слайдера товаров.
 *
 * Этот компонент использует библиотеку Swiper для отображения списка товаров
 * в виде слайдера. При загрузке отображается скелетон.
 *
 * @component
 * @param {Array} data - Массив объектов товаров, который включает информацию о каждом товаре.
 * @param {boolean} loading - Индикатор загрузки. Если true, отображается скелетон.
 * @returns {JSX.Element} Элемент слайдера товаров.
 *
 * @example
 * const products = [
 *     { id: 1, name: 'Товар 1', imgSrc: '/images/product1.jpg', category: 'Категория 1', color: ['#ff0000', '#00ff00'], price: '\$10' },
 *     { id: 2, name: 'Товар 2', imgSrc: '/images/product2.jpg', category: 'Категория 2', color: '#0000ff', price: '\$20' },
 * ];
 * 
 * return <CustomSlider2 data={products} loading={false} />;
 */

const Slider = ({ data, loading }) => {
    if (loading) {
      return (
        <div>
          <Skeleton height={200} count={3} /> {/* Скелетон для слайдера */}
        </div>
      );
    }
  
    return (
      <div>
        {/* Логика отображения слайдера с данными */}
        <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    slidesPerView={1}
                    spaceBetween={15}
                    navigation
                    breakpoints={{
                        480: { slidesPerView: 2 },
                        740: { slidesPerView: 3 },
                        1275: { slidesPerView: 4 },
                    }}
                    pagination={{
                        clickable: true, // Позволяет делать пули кликабельными
                        dynamicBullets: true, // Динамические пули
                    }}
                >
                    {data.map((item) => (
                        <SwiperSlide key={item.id} className='bg-zinc-400 !flex justify-center items-center'>
                            <div className='border-2 border-blue-500 rounded-lg overflow-hidden w-[200px] h-[250px] flex flex-col items-center'>
                                <img src={item.imgSrc || '/path/to/default-image.jpg'} alt={item.name} />
                                <h2>{item.name}</h2>
                                <p>{item.category}</p>
                                <div className='inline-flex'>
                                    {Array.isArray(item.color) ? (
                                        item.color.map((color, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    backgroundColor: color,
                                                    borderRadius: '10%',
                                                }}
                                            ></div>
                                        ))
                                    ) : (
                                        <div
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: item.color,
                                                borderRadius: '50%',
                                            }}
                                        ></div>
                                    )}
                                </div>
                                <p>{item.price}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
      </div>
    );
  };

export default Slider;