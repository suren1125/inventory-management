"use client";

import { useDebounce } from "use-debounce";
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "../(components)/Header";
import Rating from "../(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(debouncedSearchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) {
    return <div className="py-4 text-foreground">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full transition-colors duration-300">
      {/* search bar */}
      <div className="mb-5">
        <div className="flex items-center border-2 border-border-main rounded bg-surface">
          <SearchIcon className="size-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-surface text-foreground focus:outline-none"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* header bar */}
      <div className="flex justify-between items-center mb-6 ">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Create Product
        </button>
      </div>

      {/* body products list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {products?.map((product) => {
          const imageNumber =
            (product.productId.charCodeAt(product.productId.length - 1) % 3) +
            1;
          return (
            <div
              key={product.productId}
              className="bg-surface shadow rounded-md p-4 max-w-full w-full mx-auto border border-border-main transition-colors duration-300"
            >
              <div className="flex flex-col items-center">
                {/* image placeholder */}
                <div className="size-32 bg-background rounded-lg mb-4 flex items-center justify-center text-gray-400 border border-border-main">
                  <Image
                    src={`/product${imageNumber}.png`}
                    alt={product.name}
                    width={128}
                    height={128}
                  />
                </div>

                <h3 className="text-lg text-foreground font-semibold">
                  {product.name}
                </h3>
                <p className="text-foreground opacity-80">
                  ${product.price.toFixed(2)}
                </p>
                <div className="text-sm text-gray-500 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* create modal */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
