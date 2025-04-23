import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import Input from "../../components/_archives/form/input/InputField";
import Label from "../../components/_archives/form/Label";
import { useModal } from "../../hooks/useModal";
import { useDropzone } from "react-dropzone";

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
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Elegant Evening Dress",
      category: "Clothing",
      description: "Black floor-length gown with lace details",
      stock: 25,
      price: 299.99,
      image: "/images/product/evening-dress.jpg",
    },
    {
      id: 2,
      name: "MAC Retro Matte Lipstick",
      category: "Makeup",
      description: "Long-lasting matte finish in Ruby Woo",
      stock: 150,
      price: 19.99,
      image: "/images/product/mac-lipstick.jpg",
    },
    {
      id: 3,
      name: "Designer Denim Jacket",
      category: "Clothing",
      description: "Vintage wash with distressed details",
      stock: 45,
      price: 159.99,
      image: "/images/product/denim-jacket.jpg",
    },
    {
      id: 4,
      name: "Fenty Beauty Foundation",
      category: "Makeup",
      description: "Pro Filt'r Soft Matte, 50 shades",
      stock: 200,
      price: 38.0,
      image: "/images/product/fenty-foundation.jpg",
    },
    {
      id: 5,
      name: "Silk Blouse",
      category: "Clothing",
      description: "100% natural silk in cream white",
      stock: 30,
      price: 129.99,
      image: "/images/product/silk-blouse.jpg",
    },
    {
      id: 6,
      name: "Urban Decay Eyeshadow Palette",
      category: "Makeup",
      description: "Naked3, 12 rose-hued neutrals",
      stock: 85,
      price: 54.99,
      image: "/images/product/urban-decay-palette.jpg",
    },
  ]);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "price" ? parseFloat(value) : value,
    }));
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

  const handleUpdate = (id: number) => {
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
  };

  const handleDelete = (id: number) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteProductId) {
      setProducts((prev) =>
        prev.filter((product) => product.id !== deleteProductId)
      );
      setShowDeleteModal(false);
      setDeleteProductId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && editingId !== null) {
      // Add null check
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId
            ? {
                ...product,
                ...formData,
                image: formData.image
                  ? URL.createObjectURL(formData.image)
                  : product.image,
              }
            : product
        )
      );
    } else {
      const newProduct: Product = {
        id: products.length + 1,
        ...formData,
        image: formData.image
          ? URL.createObjectURL(formData.image)
          : "/images/product/placeholder.jpg",
      };
      setProducts((prev) => [...prev, newProduct]);
    }

    // Reset everything
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
                      src={product.image}
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
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
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
                <Input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
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
                  type="number"
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
                <Button>Add Product</Button>
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
