import { useEffect, useState } from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Edit, Trash2 } from "lucide-react";
import { getProductImage } from "../../services/Product.Service";

const API_IMAGE = import.meta.env.VITE_API_IMAGE;

export const ProductsList = ({ products, formatPrice, onEdit, onDelete }) => {
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    const fetchAllImages = async () => {
      const result = {};
      for (const product of products) {
        try {
          const images = await getProductImage(product.producT_ID);
          result[product.producT_ID] = images?.[0] || null;  // chỉ lấy ảnh đầu tiên
        } catch (error) {
          console.error("Error loading image for product", product.producT_ID, error);
          result[product.producT_ID] = null;
        }
      }
      setImageMap(result);
    };

    if (products.length) {
      fetchAllImages();
    }
  }, [products]);

  return (
    <Card>
      <div className="divide-y">
        {products.map((product) => {
          const imageName = imageMap[product.producT_ID];
          const imageUrl = imageName ? `${API_IMAGE}/${imageName.imagE_NAME}` : "/placeholder-image.jpg";

          return (
            <div key={product.producT_ID} className="flex items-center p-4 gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                <img
                  src={imageUrl}
                  alt={product.producT_NAME}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium">{product.producT_NAME}</h3>
              </div>
              <div className="hidden md:block text-right">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.producT_STATUS === "ACTIVE"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.producT_STATUS}
                </span>
              </div>
              <div className="text-right">
                <div className="font-bold">{formatPrice(product.producT_PRICE)}</div>
                <div className="text-sm text-gray-500">
                  <span>Kho: </span>
                  {product.quantity}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" onClick={() => onEdit(product)}>
                  <Edit size={18} />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => onDelete(product)}>
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
