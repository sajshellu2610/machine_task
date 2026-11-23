import React, { useState, useEffect } from "react";

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => {
        setData(result.products);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = data.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchPrice = price === "" || product.price <= Number(price);

    return matchSearch && matchPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Products List</h1>

      <div className="flex gap-3 mb-5">
        <input
          type="search"
          placeholder="Search product..."
          value={search}
          onChange={handleSearch}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Max price"
          value={price}
          onChange={handlePrice}
          className="border p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((pro) => (
          <div key={pro.id} className="border p-3 rounded">
            <h3 className="font-semibold mt-2">{pro.title}</h3>

            <p>Price: ${pro.price}</p>

            <p>{pro.description}</p>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="mt-5">No products found.</p>
      )}

      {totalPages > 0 && (
        <div className="flex gap-3 justify-center mt-5">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="py-1">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
