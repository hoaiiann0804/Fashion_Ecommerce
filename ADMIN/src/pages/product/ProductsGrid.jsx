import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getProductImage } from "../../services/Product.Service";

const API_IMAGE = import.meta.env.VITE_API_IMAGE;

export const ProductsGrid = ({
  products,
  formatPrice,
  onEdit,
  onDelete,
  categories,
}) => {
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    const fetchAllImages = async () => {
      const result = {};
      for (const product of products) {
        try {
          const images = await getProductImage(product.producT_ID);
          result[product.producT_ID] = images?.[0] || null;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {products.map((product) => {
        const imageName = imageMap[product.producT_ID];
        const imageUrl = imageName ? `${API_IMAGE}/${imageName.imagE_NAME}` : "/placeholder-image.jpg";

        return (
          <Card key={product.producT_ID} className="overflow-hidden">
            <div className="aspect-square relative bg-gray-100">
              <img
                src={imageUrl}
                alt={product.producT_NAME}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.producT_STATUS === "ACTIVE"
                      ? "bg-green-100 text-green-800"
                      : product.producT_STATUS === "DRAFT"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.producT_STATUS}
                </span>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-white hover:bg-gray-100"
                  onClick={() => onEdit(product)}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-white hover:bg-gray-100"
                  onClick={() => onDelete(product)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="text-sm text-gray-500 mb-1">{product.category}</div>
              <h3 className="font-medium text-base mb-2 truncate">{product.producT_NAME}</h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-base">{formatPrice(product.producT_PRICE)}</span>
                <span className="text-sm text-gray-500">
                  <span>Kho: </span>
                  {product.quantity}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
