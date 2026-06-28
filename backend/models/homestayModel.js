let homestays = [
  { id: 1, name: "River View Cottage", location: "Rishikesh", price: 1200 },
  { id: 2, name: "Mountain Eco Stay", location: "Chakrata", price: 1500 },
  { id: 3, name: "Forest Retreat", location: "Jim Corbett", price: 2000 }
];

const getAll = () => {
  return homestays;
};

const getById = (id) => {
  return homestays.find(item => item.id === id);
};

const create = (data) => {
  const newHomestay = {
    id: Date.now(), // unique numeric ID
    name: data.name,
    location: data.location,
    price: Number(data.price)
  };
  homestays.push(newHomestay);
  return newHomestay;
};

const update = (id, data) => {
  const index = homestays.findIndex(item => item.id === id);
  if (index === -1) return null;

  homestays[index] = {
    ...homestays[index],
    ...data,
    ...(data.price !== undefined ? { price: Number(data.price) } : {})
  };
  return homestays[index];
};

const deleteById = (id) => {
  const index = homestays.findIndex(item => item.id === id);
  if (index === -1) return null;

  const deleted = homestays.splice(index, 1);
  return deleted[0];
};

const search = ({ location, minPrice, maxPrice, sortBy, order }) => {
  let results = [...homestays];

  if (location) {
    const locLower = location.toLowerCase();
    results = results.filter(item => item.location.toLowerCase().includes(locLower));
  }

  if (minPrice !== undefined && minPrice !== "") {
    const minVal = Number(minPrice);
    if (!isNaN(minVal)) {
      results = results.filter(item => item.price >= minVal);
    }
  }

  if (maxPrice !== undefined && maxPrice !== "") {
    const maxVal = Number(maxPrice);
    if (!isNaN(maxVal)) {
      results = results.filter(item => item.price <= maxVal);
    }
  }

  if (sortBy) {
    const sortField = (sortBy === "price" || sortBy === "name") ? sortBy : null;
    if (sortField) {
      const direction = (order && order.toLowerCase() === "desc") ? -1 : 1;
      results.sort((a, b) => {
        if (a[sortField] < b[sortField]) return -1 * direction;
        if (a[sortField] > b[sortField]) return 1 * direction;
        return 0;
      });
    }
  }

  return results;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteById,
  search
};
