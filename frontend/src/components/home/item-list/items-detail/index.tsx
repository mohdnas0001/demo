import React, { useEffect, useState } from "react";
import useItemStore from "src/hooks/useItemStore";
import { Item } from "types";
import { useNavigate } from "react-router-dom";
import { fetchItemById } from "src/api/item/item-by-id";

const ItemDetails = () => {
  const selectedItem = useItemStore((state) => state.selectedItem);
  const [itemDetails, setItemDetails] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedItem?.id) {
      const fetchDetails = async () => {
        setLoading(true);
        setError(null);

        try {
          const data = await fetchItemById(selectedItem.id);
          setItemDetails(data);
        } catch {
          setError("Failed to fetch item details. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [selectedItem]);

  const handleBackClick = () => {
    navigate(".."); // Navigate one level back
  };

  if (!selectedItem) {
    return <div>No item details available.</div>;
  }

  if (loading) {
    return (
      <div
        data-testid="loading-spinner"
        className="flex items-center justify-center h-screen"
      >
        <div className="w-full max-w-4xl p-8 space-y-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg animate-pulse">
          <div className="w-1/3 h-8 mx-auto bg-gray-200 rounded"></div>
          <div className="w-2/3 h-6 mx-auto bg-gray-200 rounded"></div>
          <div className="w-1/4 h-6 mx-auto bg-gray-200 rounded"></div>
          <div className="w-1/4 h-6 mx-auto bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!itemDetails) {
    return <div>No item details available.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex justify-start w-full max-w-4xl">
        <button
          onClick={handleBackClick}
          className="p-2 mb-4 text-black rounded-full hover:bg-primary-500"
        >
          &larr; Back
        </button>
      </div>
      <div className="relative w-full max-w-4xl p-8 space-y-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-center">
          {itemDetails.name}
        </h1>
        <p className="mb-4 text-lg text-center text-gray-700">
          {itemDetails.description}
        </p>
        <div>
          <p className="text-sm text-center text-gray-500">
            Created at: {itemDetails.createdAt}
          </p>
          {itemDetails.updatedAt &&
            itemDetails.updatedAt !== itemDetails.createdAt && (
              <p className="text-sm text-center text-gray-500">
                Last updated: {itemDetails.updatedAt}
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
