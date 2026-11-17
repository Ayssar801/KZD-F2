import { useEffect, useState } from 'react';

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/categories.json')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Fout bij ophalen:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1>Categories</h1>

      <div className="row">
        {categories.map(category => (
          <div className="col-md-4 mb-3" key={category.id}>
            <div className="card p-3">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App