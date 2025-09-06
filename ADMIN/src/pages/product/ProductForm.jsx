import { Button } from "../../components/ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/DiaLog";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select";
import { Textarea } from "../../components/ui/Textarea";
import { zodResolver } from "../../../node_modules/@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateProduct, CreateProductImage, UpdateProduct } from "../../services/Product.Service";
import { uploadImage } from "../../services/Upload.Service";
const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE;
// Dữ liệu cứng cho size theo danh mục
const sizeOptions = {
  clothing: ["S", "M", "L", "XL", "XXL"],
  shoes: ["38", "39", "40", "41", "42"],
  ring: ["6", "7", "8", "9"],
  perfume: [],
};

// Dữ liệu cứng cho màu sắc

const productSchema = z.object({
  producT_NAME: z.string().min(2, { message: "Tên sản phẩm phải có ít nhất 2 ký tự." }),
  producT_PRICE: z
    .string()
    .refine(val => !isNaN(Number(val)) && Number(val) >= 1000, { message: "Giá tối thiểu là 1.000đ." })
    .transform(val => Number(val)),
  producT_DETAIL: z.string().optional(),
  producT_DESCRIPTION: z.string().optional(),
  branD_ID: z.string().min(1, { message: "Vui lòng chọn thương hiệu." }),
  categorY_ID: z.string().min(1, { message: "Vui lòng chọn danh mục." }),
  producT_STATUS: z.enum(["ACTIVE", "INACTIVE"], { message: "Vui lòng chọn trạng thái hợp lệ." }),
  coloR_NAME: z.string().optional(),
  sizE_NAME: z.string().optional(),
  quantity: z.preprocess((val) => Number(val), z.number().min(1)),
});


const ProductForm = ({ isOpen, onClose, onSave, product, categories, brands }) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch, control } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      producT_NAME: "",
      producT_PRICE: "",
      pricE_ROOT: "",
      producT_DETAIL: "",
      producT_DESCRIPTION: "",
      branD_ID: "",
      categorY_ID: "",
      producT_STATUS: "INACTIVE",
      coloR_NAME: "",
      sizE_NAME: "",
      quantity: 1,
      content: ""
    },
  });


  const [imageName, setImageName] = useState("");
  const selectedBrand = watch("branD_ID");
  const selectedCategory = watch("categorY_ID");
  const selectedStatus = watch("producT_STATUS");


  const selectedBrandStr = selectedBrand ? String(selectedBrand) : "";
  const selectedCategoryStr = selectedCategory ? String(selectedCategory) : "";
  const selectedStatusStr = selectedStatus ? String(selectedStatus) : "";

  useEffect(() => {
    if (product) {
      reset({
        producT_ID: product.producT_ID,
        producT_NAME: product.producT_NAME || "",
        producT_PRICE: product.producT_PRICE?.toString() || "",
        pricE_ROOT: product.pricE_ROOT?.toString() || "",
        producT_DETAIL: product.producT_DETAIL || "",
        producT_DESCRIPTION: product.producT_DESCRIPTION || "",
        branD_ID: product.branD_ID ? String(product.branD_ID) : "",
        categorY_ID: product.categorY_ID ? String(product.categorY_ID) : "",
        producT_STATUS: product.producT_STATUS || "INACTIVE",
        coloR_NAME: product.coloR_NAME || "",
        sizE_NAME: product.sizE_NAME || "",
        quantity: product.quantity || 1,
        content: product.content || ""
      });
    } else {
      reset({
        producT_NAME: "",
        producT_PRICE: "",
        pricE_ROOT: "",
        producT_DETAIL: "",
        producT_DESCRIPTION: "",
        branD_ID: "",
        categorY_ID: "",
        producT_STATUS: "INACTIVE",
        coloR_NAME: "",
        sizE_NAME: "",
        quantity: 1,
        content: ""
      });
    }
  }, [product, reset]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file || file === null) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      try {
        const res = await uploadImage(file);
        setImageName(res);
      } catch (err) {
        console.error("Upload thất bại:", err);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      if (product) {
        const updateData = {
          ...data,
          producT_ID: product.producT_ID,
        };
        const response = await UpdateProduct(updateData);
        if (response.code === 200) {
          const request = {
            productId: parseInt(response.result),
            imageName: imageName,
          };
          if(imageName) {
            await CreateProductImage(request);
          }
        }
      } else {
        const response = await CreateProduct(data);
        const request = {
          productId: parseInt(response.result),
          imageName: imageName,
        };
        await CreateProductImage(request);
      }
      onSave(data);
      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
    }
  };

  const isPerfume = categories.find(c => c.categorY_ID === selectedCategory)?.categorY_NAME.toLowerCase() === "nước hoa";

  const getSizeOptions = () => {
    const categoryName = categories.find(c => c.categorY_ID === selectedCategory)?.categorY_NAME.toLowerCase();
    return sizeOptions[categoryName] || [];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>{product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


<div className="grid grid-cols-5 items-center gap-4">
  <Label htmlFor="producT_NAME" className="col-span-1 text-right">Tên sản phẩm</Label>
  <Input id="producT_NAME" {...register("producT_NAME")} className="col-span-4" />
</div>


<div className="grid grid-cols-5 items-start gap-4">
  <Label htmlFor="producT_IMAGE" className="col-span-1 text-right">Ảnh</Label>
  <div className="col-span-4">
    <Input id="producT_IMAGE" type="file" accept="image/*" onChange={handleFileChange} />
    {imageName && <p className="text-sm text-green-600 mt-1">Đã chọn: {imageName}</p>}
    {!imageName && product?.imagE_NAME && (
      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm text-gray-500">Ảnh hiện tại:</span>
        <img src={`${API_IMAGE_URL}/${product.imagE_NAME}`} alt={product.producT_NAME} className="w-16 h-16 object-cover" />
      </div>
    )}
  </div>
</div>


<div className="grid grid-cols-5 items-center gap-4">
  <Label htmlFor="producT_PRICE" className="col-span-1 text-right">Giá (VNĐ)</Label>
  <Input id="producT_PRICE" type="number" {...register("producT_PRICE")} className="col-span-4" />
</div>


<div className="grid grid-cols-5 items-center gap-4">
  <Label htmlFor="pricE_ROOT" className="col-span-1 text-right">Giá gốc (VNĐ)</Label>
  <Input id="pricE_ROOT" type="number" {...register("pricE_ROOT")} className="col-span-4" />
</div>


<div className="grid grid-cols-5 items-start gap-4">
  <Label htmlFor="producT_DETAIL" className="col-span-1 text-right">Chi tiết</Label>
  <Textarea id="producT_DETAIL" {...register("producT_DETAIL")} className="col-span-4" />
</div>


<div className="grid grid-cols-5 items-start gap-4">
  <Label htmlFor="producT_DESCRIPTION" className="col-span-1 text-right">Mô tả</Label>
  <Textarea id="producT_DESCRIPTION" {...register("producT_DESCRIPTION")} className="col-span-4" />
</div>


<div className="grid grid-cols-5 items-start gap-4">
  <Label htmlFor="content" className="col-span-1 text-right">Nội dung</Label>
  <Textarea id="content" {...register("content")} className="col-span-4" />
</div>


<div className="grid grid-cols-5 items-center gap-4">
  <Label className="col-span-1 text-right">Danh mục</Label>
  <Select
    onValueChange={(value) => {
      setValue("categorY_ID", value);
      setValue("variants", []);
    }}
    value={selectedCategoryStr}
    className="col-span-4"
  >
    <SelectTrigger>
      <SelectValue placeholder="Chọn danh mục" />
    </SelectTrigger>
    <SelectContent>
      {categories.map((category) => (
        <SelectItem key={category.categorY_ID} value={String(category.categorY_ID)}>
          {category.categorY_NAME}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

{/* Thương hiệu */}
<div className="grid grid-cols-5 items-center gap-4">
  <Label className="col-span-1 text-right">Thương hiệu</Label>
  <Select
    onValueChange={(value) => setValue("branD_ID", value)}
    value={selectedBrandStr}
    className="col-span-4"
  >
    <SelectTrigger>
      <SelectValue placeholder="Chọn thương hiệu" />
    </SelectTrigger>
    <SelectContent>
      {brands.map((brand) => (
        <SelectItem key={brand.branD_ID} value={String(brand.branD_ID)}>
          {brand.branD_NAME}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

{/* Trạng thái */}
<div className="grid grid-cols-5 items-center gap-4">
  <Label className="col-span-1 text-right">Trạng thái</Label>
  <Select
    onValueChange={(value) => setValue("producT_STATUS", value)}
    value={selectedStatusStr}
    className="col-span-4"
  >
    <SelectTrigger>
      <SelectValue placeholder="Chọn trạng thái" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="ACTIVE">Hiển thị</SelectItem>
      <SelectItem value="INACTIVE">Ẩn</SelectItem>
    </SelectContent>
  </Select>
</div>

{/* Biến thể */}
{!isPerfume && (
  <div className="grid grid-cols-5 items-center gap-4">
    <Label className="col-span-1 text-right">Biến thể</Label>
    <div className="col-span-4 flex items-center gap-4">
      <Input type="color" {...register("coloR_NAME")} className="w-10 h-10 p-1" />
      <span className="text-sm text-gray-600">{watch("coloR_NAME") || "#000000"}</span>
      <Input {...register("sizE_NAME")} placeholder="Size" className="w-24" />
      <Input {...register("quantity")} type="number" min={1} className="w-20" />
    </div>
  </div>
)}

{/* Footer */}
<DialogFooter className="pt-4">
  <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
  <Button type="submit">Lưu</Button>
</DialogFooter>
</form>


      </DialogContent>
    </Dialog>

  );
};

export default ProductForm;