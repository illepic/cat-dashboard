import { useState, useEffect } from 'react';

import CurrentButton from './CurrentButton';
import BranchSelect from './BranchSelect';
import JobPhaseSelect from './JobPhaseSelect';

const CAT_API_HEADERS = {
  headers: { 'x-api-key': 'edb7379a-179a-4b5a-bde3-1560648da137' },
};

function App() {
  const [current, setCurrent] = useState('appts');
  const [cat, setCat] = useState(null);
  const [jobPhase, setJobPhase] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [results, setResults] = useState([]);

  // Run something immedaitely on boot-up, based on the value of current
  useEffect(() => {
    fetchCatBreeds();
  }, []);

  // Fetch data to fill in dropdowns
  const fetchCatBreeds = async () => {
    const response = await fetch(
      'https://api.thecatapi.com/v1/breeds/',
      CAT_API_HEADERS
    );
    // This is just cat data for now
    const data = await response.json();
    setBreeds(data);
  };

  // Data that is fetched when clicking "load"
  const fetchResults = async (search) => {
    const response = await fetch(
      `https://api.thecatapi.com/v1/breeds/search?q=${search}`,
      CAT_API_HEADERS
    );
    const data = await response.json();
    setResults(data);
  };

  // Helper functions that need the state above
  const getCatNameFromId = (id) => breeds.find((cat) => cat.id === id).name;

  return (
    <div className="h-screen flex flex-col w-full">
      <div>Section: {current}</div>
      <div>Cat: {cat}</div>
      <div>Job phase: {jobPhase}</div>

      <header className="bg-green-500 ">
        <div className="container mx-auto flex items-center py-4">
          <div className="px-2">
            <CurrentButton
              text="Appts"
              isCurrent={current === 'appts'}
              doStuff={() => setCurrent('appts')}
            />
            <CurrentButton
              text="Crews"
              isCurrent={current === 'crews'}
              doStuff={() => setCurrent('crews')}
            />
          </div>

          <div className="px-2">
            <BranchSelect branches={breeds} changeCallback={setCat} />
          </div>

          {current === 'appts' && (
            <div className="px-2">
              <JobPhaseSelect changeCallback={setJobPhase} />
            </div>
          )}

          <div className="px-2">
            <button
              className="btn-gray"
              onClick={() => fetchResults(getCatNameFromId(cat))}
            >
              Load
            </button>
          </div>

          {current === 'appts' && (
            <div className="px-2">
              <button className="btn-gray">Cumulative Load</button>
            </div>
          )}
        </div>
      </header>

      <main className="bg-gray-200 flex flex-1">
        <div className="left w-1/3 p-4 border border-black">
          {results.map((result) => (
            <div key={result.id}>
              <ul>
                <li>Name: {result.name}</li>
                <li>Weight: {result.weight.imperial} lbs</li>
                <li>Lifespan: {result.life_span} years</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="right p-4 border border-black flex-1"></div>
      </main>
    </div>
  );
}

export default App;
