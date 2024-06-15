import React from 'react';
import BreedSelection from './BreedSelection';

const Controls = ({
  breeds,
  filteredBreeds,
  selectedBreeds,
  handleBreedChange,
  handleFeelingLucky,
  handleClearSelection,
  searchTerm,
  handleSearchChange
}) => {
  return (
    <div className="controls">
      <label>Select Dog Breeds:</label>
      <input
        type="text"
        placeholder="Search breeds..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <BreedSelection
        breeds={breeds}
        filteredBreeds={filteredBreeds}
        selectedBreeds={selectedBreeds}
        handleBreedChange={handleBreedChange}
      />
      <button onClick={handleFeelingLucky}>I'm Feeling Lucky</button>
      <button onClick={handleClearSelection}>Clear Selection</button>
    </div>
  );
};

export default Controls;