import React from 'react';

const BreedSelection = ({ breeds, filteredBreeds, selectedBreeds, handleBreedChange }) => {
  return (
    <div className="checkbox-group">
      <div className="scrollable-checkboxes">
        {filteredBreeds.map((breed) => (
          <div key={breed}>
            <label>
              <input
                type="checkbox"
                value={breed}
                checked={selectedBreeds.includes(breed)}
                onChange={handleBreedChange}
              />
              {breed}
            </label>
            {breeds[breed].length > 0 && (
              <div className="sub-breeds">
                {breeds[breed].map((subBreed) => (
                  <label key={subBreed}>
                    <input
                      type="checkbox"
                      value={`${breed}-${subBreed}`}
                      checked={selectedBreeds.includes(`${breed}-${subBreed}`)}
                      onChange={handleBreedChange}
                    />
                    {subBreed}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreedSelection;