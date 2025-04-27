import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { useModal } from "@/hooks/useModal";
import { useDropzone } from "react-dropzone";
import Select from "@/components/form/Select";
import { useProductsService } from "@/services/products.service";
import { toast } from "react-toastify";
import { getImageUrl } from "@/utils/url";

const PRODUCT_CATEGORIES = [
  { value: "Accessories", label: "Accessories" },
  { value: "Photocards", label: "Photocards" },
  { value: "Lightsticks", label: "Lightsticks" },
  { value: "Clothing", label: "Clothing" },
  { value: "Stationary", label: "Stationary" },
  { value: "Albums", label: "Albums" },
  { value: "Home Goods", label: "Home Goods" },
  { value: "Beauty Products", label: "Beauty Products" },
];

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  stock: number;
  price: number;
  image: string;
}

interface ProductFormData {
  name: string;
  category: string;
  description: string;
  stock: number;
  price: number;
  image: File | null;
}

export default function Products() {
  const { isOpen, openModal, closeModal } = useModal();
  const [products, setProducts] = useState<Product[]>([]);
  const { getProducts, createProduct, updateProduct, deleteProduct } =
    useProductsService();

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    description: "",
    stock: 0,
    price: 0,
    image: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFormData((prev) => ({ ...prev, image: acceptedFiles[0] }));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => {
    if (typeof e === "string") {
      // Handle select change
      setFormData((prev) => ({
        ...prev,
        category: e,
      }));
    } else {
      // Handle input change
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "stock" || name === "price" ? parseFloat(value) : value,
      }));
    }
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      category: "",
      description: "",
      stock: 0,
      price: 0,
      image: null,
    });
    openModal();
  };

  const handleUpdate = async (id: number) => {
    try {
      const productToEdit = products.find((product) => product.id === id);
      if (productToEdit) {
        setEditingId(id);
        setIsEditing(true);
        setFormData({
          name: productToEdit.name,
          category: productToEdit.category,
          description: productToEdit.description,
          stock: productToEdit.stock,
          price: productToEdit.price,
          image: null,
        });
        openModal();
      }
    } catch (error) {
      toast.error("Failed to load product details");
    }
  };

  const handleDelete = (id: number) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteProductId) {
      try {
        await deleteProduct(deleteProductId.toString());
        await fetchProducts();
        toast.success("Product deleted successfully");
        setShowDeleteModal(false);
        setDeleteProductId(null);
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields - remove image from validation when editing
    if (!formData.name || !formData.category || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    // For new products, image is required
    if (!isEditing && !formData.image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      if (isEditing && editingId !== null) {
        await updateProduct(editingId.toString(), {
          name: formData.name,
          category: formData.category,
          description: formData.description,
          stock: formData.stock,
          price: formData.price,
          ...(formData.image && { image: formData.image }), // Only include image if new one is selected
        });
        toast.success("Product updated successfully");
      } else {
        // Create new product
        await createProduct({
          name: formData.name,
          category: formData.category,
          description: formData.description,
          stock: formData.stock,
          price: formData.price,
          image: formData.image!, // We know it exists due to validation
        });
        toast.success("Product created successfully");
      }

      // Refresh products list
      await fetchProducts();

      // Reset form and close modal
      setFormData({
        name: "",
        category: "",
        description: "",
        stock: 0,
        price: 0,
        image: null,
      });
      setEditingId(null);
      setIsEditing(false);
      closeModal();
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error(
        isEditing ? "Failed to update product" : "Failed to create product"
      );
    }
  };

  const handleCloseModal = () => {
    setEditingId(null);
    setIsEditing(false);
    setFormData({
      name: "",
      category: "",
      description: "",
      stock: 0,
      price: 0,
      image: null,
    });
    closeModal();
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  return (
    <div>
      <PageMeta
        title="Manage Products | Bias Boutique Dashboard"
        description="Product management dashboard for Bias Boutique admin panel"
      />
      <PageBreadcrumb pageTitle="Manage Products" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={handleAddNew}>Add Product</Button>
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Image
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Product Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Stock
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Price
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="py-3">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </TableCell>
                  <TableCell className="py-3 text-gray-800 text-theme-sm dark:text-white/90">
                    {product.name}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {product.category}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {product.description}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {product.stock}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    PHP{product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdate(product.id)}
                        className="p-1 text-blue-500 hover:text-blue-700"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          className="w-3/4 max-w-4xl"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  options={PRODUCT_CATEGORIES}
                  placeholder="Select Category"
                  onChange={handleInputChange}
                  defaultValue={formData.category}
                  className="dark:bg-gray-900"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>

              <div>
                <Label>Product Image</Label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the image here ...</p>
                  ) : (
                    <p>Drag 'n' drop an image here, or click to select one</p>
                  )}
                  {formData.image && (
                    <p className="mt-2 text-sm text-gray-500">
                      Selected: {formData.image.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? "Save Changes" : "Add Product"}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal
          isOpen={showDeleteModal}
          onClose={cancelDelete}
          className="max-w-md"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="!bg-red-500 hover:!bg-red-600"
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
