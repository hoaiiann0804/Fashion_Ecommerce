import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { ProductSearch, getProductImage } from '../service/Product.Service';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
const API_IMAGE = import.meta.env.VITE_API_IMAGE;

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [filteredResults, setFilteredResults] = useState([]);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');

    const validateSearch = (term) => {
        if (!term || term.length < 1) {
            setError({ message: 'Vui lòng nhập ít nhất 1 ký tự' });
            return false;
        }
        return term.trim();
    };
    

    const debouncedSearch = useCallback(
        debounce(async (term, page) => {
            if (!term) return;
            
            setLoading(true);
            try {
                const response = await ProductSearch(term, page, 10);
                console.log("Raw search response:", response);

                if (!Array.isArray(response)) {
                    throw new Error("Kết quả tìm kiếm không hợp lệ");
                }

                const validatedResults = response.map(product => {
                    if (!product.producT_ID && product.producT_ID !== 0) {
                        console.warn("Sản phẩm thiếu ID:", product);
                    }
                    return product;
                });

                setSearchResults(prev => page === 1 ? validatedResults : [...prev, ...validatedResults]);
                setShowResults(true);
                setError(null);
            } catch (error) {
                console.error('Search error:', error);
                setError(error.message ? { message: error.message } : { message: 'Lỗi tìm kiếm' });
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        const validTerm = validateSearch(searchTerm);
        if (validTerm) {
            debouncedSearch(validTerm, pageNumber);
        } else {
            setSearchResults([]);
            setShowResults(false);
            setPageNumber(1);
        }

        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm, pageNumber]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle scroll for infinite loading
    const handleScroll = useCallback((e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 50 && !loading) {
            setPageNumber(prev => prev + 1);
        }
    }, [loading]);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!showResults) return;

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < searchResults.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                if (selectedIndex >= 0) {
                    const product = searchResults[selectedIndex];
                    if (product.producT_ID === undefined || product.producT_ID === null) {
                        setError({ message: "ID sản phẩm không hợp lệ" });
                        return;
                    }
                    navigate(`/details/${product.producT_ID}`);
                    setShowResults(false);
                    setIsOpen(false);
                    setSearchTerm("");
                }
                break;
            case 'Escape':
                setShowResults(false);
                setIsOpen(false);
                break;
        }
    };


    useEffect(() => {
        if (!showResults) {
            setFilteredResults([]);
            return;
        }
        const isNumber = !isNaN(Number(searchTerm)) && searchTerm.trim() !== '';
        if (isNumber) {
            const searchPrice = Number(searchTerm);
            setFilteredResults(
                searchResults.filter(product => {
                    const price = product.producT_PRICE || 0;
                    return Math.abs(price - searchPrice) <= searchPrice * 0.1;
                })
            );
        } else {
            setFilteredResults(searchResults);
        }
    }, [searchResults, searchTerm, showResults]);

    useEffect(()=>{
        const fetchImage = async () => {
          try{
            const response = await getProductImage(product.producT_ID);
            setImageUrl(response[0].imagE_NAME);  
          }
          catch(error){
            console.error('Error fetching product image:', error);
          }
        }
        fetchImage();
      },[])

    return (
        <div ref={searchRef} className={`flex items-center justify-center w-full transition-all duration-300 
            ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
            {isOpen ? (
                <form onSubmit={(e) => e.preventDefault()} className='relative flex items-center justify-center w-full'>
                    <div className='relative w-1/2'>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder='Tìm kiếm sản phẩm... '
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full
                                 text-gray-500 focus:ring-2 focus:ring-blue-300"
                        />
                        <button 
                            type='button'
                            onClick={() => setSearchTerm('')}
                            className='absolute right-12 top-1/2 transform -translate-y-1/2
                                text-gray-400 hover:text-gray-600'
                        >
                            {searchTerm && <HiMiniXMark className='h-5 w-5'/>}
                        </button>
                        <button 
                            type='submit'
                            className='absolute right-2 top-1/2 transform -translate-y-1/2
                                text-gray-600 hover:text-gray-800'
                        >
                            <HiMagnifyingGlass className='h-6 w-6'/>
                        </button>
                    </div>

                    <button
                        type='button'
                        onClick={() => {
                            setIsOpen(false);
                            setShowResults(false);
                            setSearchTerm('');
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 
                            text-gray-600 hover:text-gray-800"
                    >
                        <HiMiniXMark className='h-6 w-6'/>
                    </button>

                    {(showResults || loading) && (
                        <div 
                            className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg 
                                max-h-[80vh] overflow-y-auto mt-2 border border-gray-200"
                            onScroll={handleScroll}
                        >
                            {loading && (
                                <div className="p-4 text-center text-gray-500">
                                    <span className="animate-spin mr-2">⌛</span>
                                    Đang tìm kiếm...
                                </div>
                            )}

                            {!loading && searchResults.length === 0 && searchTerm && (
                                <div className="p-8 text-center text-gray-500">
                                    <div className="mb-4">🔍</div>
                                    <p className="font-medium">Không tìm thấy sản phẩm phù hợp</p>
                                    <p className="text-sm mt-1">Vui lòng thử với từ khóa khác</p>
                                </div>
                            )}

                            <div className='py-2'>
                                {!loading && searchResults.length > 0 && (
                                    <div className="px-4 py-2 text-sm text-gray-700">
                                        Đã tìm thấy {searchResults.length} sản phẩm
                                    </div>
                                )}
                                {filteredResults.map((product, index) => (
                                    console.log("Product ID from search results:", product),
                                         <Link
                                         key={product.producT_ID}
                                         to={`/details/${product.producT_ID}`}
                                         className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50
                                             ${index === selectedIndex ? 'bg-blue-50' : ''}`}
                                         onClick={(e) => {
                                            if (product.producT_ID === undefined || product.producT_ID === null) {
                                                 e.preventDefault();
                                                 setError({ message: "ID sản phẩm không hợp lệ" });
                                                 return;
                                             }
                                             setShowResults(false);
                                             setIsOpen(false);
                                             setSearchTerm('');
                                         }}
                                     >
                                            {/* <img 
                                                src={imageUrl ? `${API_IMAGE}/${imageUrl}` : '/placeholder-image.jpg'}
                                                alt={product.producT_NAME}
                                                className="w-20 h-20 object-cover rounded"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            /> */}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold  truncate text-black">
                                                {product.producT_NAME}
                                            </div>
                                            <div className="text-sm text-purple-400">
                                                {product.producT_PRICE?.toLocaleString()}₫
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                            </div>

                            {error && (
                                <div className="p-4 text-center text-red-500">
                                    {error.message || 'Có lỗi xảy ra khi tìm kiếm'}
                                </div>
                            )}
                        </div>
                    )}
                </form>
            ) : (
                <button 
                    onClick={() => {
                        setIsOpen(true);
                        setTimeout(() => inputRef.current?.focus(), 100);
                    }}
                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                >
                    <HiMagnifyingGlass className='h-6 w-6 text-white'/>
                </button>
            )}
        </div>
    );
};

export default SearchBar;