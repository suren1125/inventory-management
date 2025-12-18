import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../(components)/Rating";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-surface shadow-md rounded-2xl pb-16 transition-colors duration-300">
      {isLoading ? (
        <div className="m-5 text-foreground">Loading...</div>
      ) : (
        <>
          {/* header */}
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2 text-foreground">
            Popular Products
          </h3>
          <hr className="border-border-main" />
          {/* body */}
          <div className="overflow-y-auto h-full pb-2">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b border-border-main"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-background rounded flex items-center justify-center text-xs text-foreground">
                    IMG
                  </div>

                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-foreground">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2 text-foreground opacity-30">|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                <div className="text-xs flex items-center text-foreground">
                  <button
                    title="shopping-bag"
                    className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2 hover:opacity-80"
                  >
                    <ShoppingBag className="size-4" />
                  </button>
                  <span className="font-medium">
                    {Math.round(product.stockQuantity / 1000)}k Sold
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
