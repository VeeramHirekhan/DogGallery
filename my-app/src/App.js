import React, { useState, useEffect } from 'react';
import './App.css';
import BreedSelection from './componets/BreedSelection';
import Gallery from './componets/Gallery';
import Controls from './componets/Controls';

function App() {
  const [breeds, setBreeds] = useState({});
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetches the list of breeds when the component mounts
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        setBreeds(data.message);
      } catch (err) {
        console.error('Error fetching breeds:', err);
      }
    };

    fetchBreeds();
  }, []);

  // Fetches images of the selected breeds
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const imagePromises = selectedBreeds.map(async (breed) => {
          const [mainBreed, subBreed] = breed.split('-');
          const url = subBreed 
            ? `https://dog.ceo/api/breed/${mainBreed}/${subBreed}/images`
            : `https://dog.ceo/api/breed/${mainBreed}/images`;
          const response = await fetch(url);
          const data = await response.json();
          return data.message;
        });
        const imageArrays = await Promise.all(imagePromises);
        setImages(imageArrays.flat());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to fetch images.');
        setLoading(false);
      }
    };

    if (selectedBreeds.length > 0) {
      fetchImages();
    } else {
      setImages([]);
    }
  }, [selectedBreeds]);

  // Handles changes to breed selections
  const handleBreedChange = (event) => {
    const breed = event.target.value;
    setSelectedBreeds((prevSelectedBreeds) =>
      prevSelectedBreeds.includes(breed)
        ? prevSelectedBreeds.filter((b) => b !== breed)
        : [...prevSelectedBreeds, breed]
    );
  };

  // Handles the "I'm Feeling Lucky" button
  const handleFeelingLucky = async () => {
    const breedKeys = Object.keys(breeds);
    if (breedKeys.length > 0) {
      const randomMainBreed = breedKeys[Math.floor(Math.random() * breedKeys.length)];
      const subBreeds = breeds[randomMainBreed];
      const randomBreed = subBreeds.length > 0
        ? `${randomMainBreed}-${subBreeds[Math.floor(Math.random() * subBreeds.length)]}`
        : randomMainBreed;
      setSelectedBreeds([randomBreed]);
    }
  };

  // Clears the selected breeds and images
  const handleClearSelection = () => {
    setSelectedBreeds([]);
    setImages([]);
  };

  // Updates the search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filters the breeds based on the search term
  const filteredBreeds = Object.keys(breeds).filter((breed) =>
    breed.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="App">
      <h1>Dog Breed Gallery</h1>
      <Controls
        breeds={breeds}
        filteredBreeds={filteredBreeds}
        selectedBreeds={selectedBreeds}
        handleBreedChange={handleBreedChange}
        handleFeelingLucky={handleFeelingLucky}
        handleClearSelection={handleClearSelection}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      {selectedBreeds.length > 0 && (
        <div className="selected-breeds">
          <strong>Selected Breeds:</strong> {selectedBreeds.join(', ')}
        </div>
      )}
      {loading && <p>Loading images...</p>}
      {error && <p>{error}</p>}
      <Gallery images={images} />
    </div>
  );
}

export default App;