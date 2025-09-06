import { ArrowLeft, Calendar, Clock, Copy, Facebook, Heart, Instagram, Mail, Share2, Star, Tag, Twitter, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogFooter from '../../components/layout/BlogFooters';
import BlogHeader from '../../components/layout/BlogHeader';
import BlogSidebar from '../../components/layout/BlogSideBar';
// import { relatedProducts } from '../../service/ProductData';
import samplePosts from '../../service/BlogService';
import ProductBestSellerList from '../products/best_seller/BestSellerList';
const fakeFetchPost = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundPost = samplePosts.find(p => p.id === parseInt(id));
      if (foundPost) {
        const postData = {
          ...foundPost,
          subtitle: foundPost.excerpt,
          content: `
            <p>${foundPost.excerpt}</p>
            <p>Đây là nội dung chi tiết hơn cho bài viết "${foundPost.title}". Bạn có thể thêm nhiều đoạn văn, hình ảnh và các yếu tố khác vào đây để làm cho bài viết phong phú hơn.</p>
            <h2>${foundPost.category}</h2>
            <p>Khám phá thêm về chủ đề này và những điều thú vị khác.</p>
            <h3>Tác giả: ${foundPost.author}</h3>
            <p>Trong thời trang, ${foundPost.author} nổi tiếng với những đóng góp quan trọng và góc nhìn độc đáo. Bài viết này là một minh chứng nữa cho sự am hiểu sâu sắc của họ về các xu hướng hiện tại và tương lai.</p>
          `,
          tags: [foundPost.category, 'Thời trang', 'Phong cách', 'Mùa hè', 'Xu hướng'].filter((value, index, self) => self.indexOf(value) === index), 
          author: {
            name: foundPost.author,
            avatar: foundPost.image, 
            bio: 'Chuyên gia thời trang với nhiều năm kinh nghiệm trong ngành. Thường xuyên đưa ra những phân tích sâu sắc về xu hướng thời trang toàn cầu.'
          },
          views: Math.floor(Math.random() * 1000) + 500, 
        };
        resolve(postData);
      } else {
        reject(new Error('Bài viết không tồn tại'));
      }
    }, Math.floor(Math.random() * 1000) + 500); 
  });
};

const BlogPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {

    setIsLoading(true);
    setError(null);
    if (!id) {
      setError('ID bài viết không hợp lệ');
      setIsLoading(false);
      return;
    }
    
    const fetchPostData = async () => {
      try {
        const postData = await fakeFetchPost(id);
        setPost(postData);
   
        const commentsData = [
        ];
        setComments(commentsData)

      } catch (err) {
        setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu bài viết');
        console.error('Error fetching post data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostData();
  }, [id]);

  

  if (isLoading) {
    return (
      <div>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <BlogFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <BlogHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Lỗi</h2>
          <p className="text-red-500">{error}</p>
          <Link to="/blog" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Quay lại Blog
          </Link>
        </div>
        <BlogFooter />
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <BlogHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h2>
          <Link to="/blog" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Quay lại Blog
          </Link>
        </div>
        <BlogFooter />
      </div>
    );
  }
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    if (!newComment.name || !newComment.email || !newComment.content) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    const newCommentObj = {
      id: comments.length + 1,
      name: newComment.name,
      date: new Date().toISOString().split('T')[0],
      content: newComment.content,
      rating: rating
    };
    setComments(prev => [newCommentObj, ...prev]);
    setNewComment({ name: '', email: '', content: '' });
    setRating(0);
  };
  const handleLikeClick = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
      setShowShareOptions(false);
    }, 2000);
  };

  return (
    <div>
      <BlogHeader />
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <Link to="/blog" className="flex items-center mb-4 text-blue-600 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại Blog
          </Link>

          <img src={post.image} alt={post.title} className="rounded-lg w-full mb-4" />

          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-600 mb-4">{post.subtitle}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center"><User className="w-4 h-4 mr-1" /> {post.author.name}</div>
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {post.date}</div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {post.views} lượt xem</div>
          </div>

          <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="flex items-center gap-4 mb-8">
            <button
              className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-gray-600'}`}
              onClick={handleLikeClick}
            >
              <Heart className="w-5 h-5" /> {likeCount}
            </button>

            <button
              className="flex items-center gap-1 text-gray-600"
              onClick={() => setShowShareOptions(prev => !prev)}
            >
              <Share2 className="w-5 h-5" /> Chia sẻ
            </button>

            {showShareOptions && (
              <div className="flex gap-3 bg-gray-100 p-2 rounded-md">
                <Facebook className="w-5 h-5 text-blue-600 cursor-pointer" />
                <Twitter className="w-5 h-5 text-blue-400 cursor-pointer" />
                <Instagram className="w-5 h-5 text-pink-500 cursor-pointer" />
                <Mail className="w-5 h-5 cursor-pointer" />
                <Copy className="w-5 h-5 cursor-pointer" onClick={copyLinkToClipboard} />
                {linkCopied && <span className="text-sm text-green-500">Đã sao chép!</span>}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span key={index} className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                <Tag className="w-4 h-4" /> {tag}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mb-4">Bình luận ({comments.length})</h2>
          <form onSubmit={handleSubmitComment} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Tên của bạn"
                value={newComment.name}
                onChange={handleCommentChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newComment.email}
                onChange={handleCommentChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <textarea
              name="content"
              placeholder="Viết bình luận..."
              value={newComment.content}
              onChange={handleCommentChange}
              className="border p-2 rounded w-full mb-4"
              rows="4"
            />
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  fill={hoveredRating >= star || rating >= star ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Gửi bình luận
            </button>
          </form>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border rounded p-4">
                <div className="flex justify-between mb-2 text-sm text-gray-500">
                  <span>{comment.name}</span>
                  <span>{comment.date}</span>
                </div>
                <p className="mb-2">{comment.content}</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${comment.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-4">
          <BlogSidebar 
            popularPosts={[post].filter(Boolean)} 
            categories={['Thời trang', 'Phong cách', 'Mùa hè', 'Xu hướng']} 
          />
        </div>
      </div>
 <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              
            </div>
            <div className="">
              <ProductBestSellerList />
            </div>
          </div>
        </div>

      <BlogFooter />
    </div>
  );
};

export default BlogPostDetail;