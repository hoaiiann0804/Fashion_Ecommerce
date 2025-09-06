import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { Button } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/DiaLog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/Tabs";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import useToast from "../../hooks/use-toast";
import { getBrands } from "../../services/Brand.Service";
import { getCategories } from "../../services/Category.Service";
import { ProductPaging } from '../../services/Product.Service';
import { UpdateProduct } from "../../services/Product.Service";
import DeleteProductDialog from "./DeleteProductDialog";
import { DeleteProduct } from "../../services/Product.Service";
import ImageForm from "./ImageForm";
import ProductForm from "./ProductForm";
import { ProductsFilter } from "./ProductsFilter";
import { ProductsGrid } from "./ProductsGrid";
import { ProductsList } from "./ProductsList";
import ProductsPagination from "./ProductsPagination";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [productToEdit, setProductToEdit] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [newProductId, setNewProductId] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [totalProduct, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await ProductPaging(currentPage, productsPerPage);
      setProducts(response.data);
      setTotalProducts(response.totalRecords);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    //setCurrentPage(1);
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, [searchTerm, selectedCategory, priceRange.min, priceRange.max, currentPage]);
  
  const handleApplyFilter = (filterOptions) => {
    const { min, max } = filterOptions.priceRange;
    if (min !== "" && max !== "" && Number(min) > Number(max)) {
      toast({
        title: "Lỗi",
        description: "Giá tối thiểu không thể lớn hơn giá tối đa",
        variant: "destructive",
      });
      return;
    }
    setSelectedCategory(filterOptions.categorY_ID);
    setSelectedBrandId(filterOptions.branD_ID);
    setPriceRange(filterOptions.priceRange);
    toast({
      title: "Đã áp dụng bộ lọc",
      description: "Các tiêu chí lọc đã được cập nhật.",
    });
  };

  const filteredProducts = products.filter((product) => {
    // const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = product.producT_NAME.toLowerCase().includes(searchTerm.toLowerCase()) 
    
    const matchesCategory = selectedCategory === "" || product.categorY_ID === selectedCategory;
    const matchesBrand = selectedBrandId === "" || product.branD_ID === selectedBrandId;
    
    const matchesPrice = (
      (priceRange.min === "" || product.producT_PRICE >= Number(priceRange.min)) &&
      (priceRange.max === "" || product.producT_PRICE <= Number(priceRange.max))
    );
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + "đ";
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await addProduct({
        producT_NAME: newProduct.producT_NAME,
        producT_PRICE: newProduct.producT_PRICE,
        producT_DETAIL: newProduct.producT_DETAIL,
        producT_DESCRIPTION: newProduct.producT_DESCRIPTION,
        branD_ID: newProduct.branD_ID,
        categorY_ID: newProduct.categorY_ID,
        producT_STATUS: newProduct.producT_STATUS,
      });
      if (response.code === 201) {
        const highestId = products.reduce((max, product) => Math.max(max, product.id), 0);
        const productToAdd = {
          id: highestId + 1,
          ...newProduct,
          stock: 0,
          image: "/placeholder.svg", // Default image
        };
        setProducts([...products, productToAdd]);
        setIsAddDialogOpen(false);
        setNewProductId(response.data.producT_ID);
        setIsImageDialogOpen(true); // Open ImageForm after success
      } else {
        throw new Error("Thêm sản phẩm thất bại");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleAddImage = async (imageData) => {
    try {
      const response = await addImage({
        imagE_NAME: imageData.imagE_NAME,
        producT_ID: imageData.producT_ID,
        imagE_STATUS: imageData.imagE_STATUS,
      });
      if (response.code === 201) {
        // Update product with new image
        setProducts(products.map(product =>
          product.id === imageData.producT_ID
            ? { ...product, image: imageData.imagE_NAME }
            : product
        ));
        setIsImageDialogOpen(false);
        toast({
          title: "Thêm hình ảnh thành công",
          description: "Hình ảnh đã được thêm cho sản phẩm.",
        });
      } else {
        throw new Error("Thêm hình ảnh thất bại");
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Thêm hình ảnh thất bại. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map(product => {
      if (product.producT_ID === updatedProduct.producT_ID) {

        return {
          ...updatedProduct,
          stock: updatedProduct.stock || 0,
          image: updatedProduct.image || product.image,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    setProductToEdit(null);
    toast({
      title: "Cập nhật thành công",
      description: `Sản phẩm "${updatedProduct.producT_NAME}" đã được cập nhật.`,
    });
  };

  const handleDeleteProduct = (id) => {
    DeleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
    toast({
      title: "Xóa sản phẩm thành công",
      description: "Sản phẩm đã được xóa khỏi danh sách.",
    });
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
  };

  const handleDeleteClick = (product) => {
    if (product) {
      setProductToDelete(product);
      setIsDeleteDialogOpen(true);
    }
  };




  const filterProductsByStatus = (products, status) => {
    if (status === "in-stock") {
      return products.filter(p => p.stock > 0);
    } else if (status === "out-of-stock") {
      return products.filter(p => p.stock === 0);
    } else if (status === "draft") {
      return products.filter(p => p.producT_STATUS === "DRAFT");
    }
    return products;
  };

  const getProductsForCurrentPage = (products) => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const renderEmptyState = () => (
    <div className="p-8 text-center bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5"></path>
          <path d="M18 2v4"></path>
          <path d="M6 2v4"></path>
          <path d="M3 10h18"></path>
          <line x1="9" y1="16" x2="15" y2="16"></line>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Không có sản phẩm nào</h3>
      <p className="text-gray-500 mb-6">Không tìm thấy sản phẩm nào phù hợp với điều kiện lọc.</p>
      <Button onClick={() => {
        setSearchTerm("");
        setSelectedCategory("");
        setSelectedBrandId("");
        setPriceRange({ min: "", max: "" });
      }}>
        Xóa bộ lọc
      </Button>
    </div>
  );

  return (
    <React.Fragment>
      <DashboardLayout>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Sản Phẩm</h1>
              <p className="text-gray-500">Quản lý sản phẩm thời trang của bạn</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle size={18} />
                  <span>Thêm Sản Phẩm</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Thêm Sản Phẩm Mới</DialogTitle>
                  <DialogDescription>
                    Điền thông tin chi tiết về sản phẩm mới bên dưới.
                  </DialogDescription>
                </DialogHeader>
                <ProductForm
                  isOpen={isAddDialogOpen}
                  onClose={() => setIsAddDialogOpen(false)}
                  onSave={handleAddProduct}
                  categories={categories}
                  brands={brands}
                />
              </DialogContent>
            </Dialog>
          </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="all">
              <span>Tất cả</span>
            </TabsTrigger>
            <TabsTrigger value="in-stock">
              <span>Còn hàng</span>
            </TabsTrigger>
            <TabsTrigger value="out-of-stock">
              <span>Hết hàng</span>
            </TabsTrigger>
            <TabsTrigger value="draft">
              <span>Bản nháp</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Nội dung các tab */}
          {["all", "in-stock", "out-of-stock"].map((tab) => {
            const statusFilteredProducts = filterProductsByStatus(filteredProducts, tab);
            return (
              <TabsContent key={tab} value={tab}>
                <div className="space-y-4">
                  <ProductsFilter 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    onApplyFilter={handleApplyFilter} 
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                  />

                  {statusFilteredProducts.length > 0 ? (
                    <>
                      {viewMode === "grid" ? (
                        <ProductsGrid 
                          products={products}
                          formatPrice={formatPrice}
                          onEdit={handleEditProduct}
                          onDelete={handleDeleteClick}
                        />
                      ) : (
                        <ProductsList
                          products={products}
                          formatPrice={formatPrice}
                          onEdit={handleEditProduct}
                          onDelete={handleDeleteClick}
                        />
                      )}
                      
                      <ProductsPagination 
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        productsPerPage={productsPerPage}
                        totalProducts={totalProduct}
                      />
                    </>
                  ) : (
                    renderEmptyState()
                  )}
                </div>
              </TabsContent>
            );
          })}
          
          <TabsContent value="draft">
            <div className="p-4 text-center text-gray-500">
              <p>Không có sản phẩm nào ở trạng thái bản nháp.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

        <Dialog open={!!productToEdit} onOpenChange={(open) => !open && setProductToEdit(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Chỉnh Sửa Sản Phẩm</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin cho sản phẩm này.
              </DialogDescription>
            </DialogHeader>
            {productToEdit && (
              <ProductForm
                isOpen={!!productToEdit}
                onClose={() => setProductToEdit(null)}
                onSave={handleUpdateProduct}
                product={productToEdit}
                categories={categories}
                brands={brands}
              />
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm Hình Ảnh</DialogTitle>
              <DialogDescription>
                Thêm hình ảnh cho sản phẩm vừa tạo.
              </DialogDescription>
            </DialogHeader>
            <ImageForm
              isOpen={isImageDialogOpen}
              onClose={() => setIsImageDialogOpen(false)}
              onSave={handleAddImage}
              productId={newProductId}
            />
          </DialogContent>
        </Dialog>

        <DeleteProductDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          item={productToDelete}
          onConfirm={() => productToDelete && handleDeleteProduct(productToDelete.producT_ID)}
          itemType="Sản phẩm"
        />
      </DashboardLayout>
    </React.Fragment>
  );
};

export default Products;