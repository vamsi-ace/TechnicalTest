import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
 //
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const minStepsToStrongPassword = (password) => {
    var s = password;
    var requiredChar = GetRequiredChar(s);
    if (s.length < 6) return Math.max(requiredChar, 6 - s.length);

    // only need replacement and deletion now when s.Length >= 6
    var replace = 0; // total replacements for repeated chars. e.g. "aaa" needs 1 replacement to fix
    var oned = 0; // total deletions for 3n repeated chars. e.g. "aaa" needs 1 deletion to fix
    var twod = 0; // total deletions for 3n+1 repeated chars. e.g. "aaaa" needs 2 deletions to fix.

    for (var i = 0; i < s.length;) {
        var len = 1; // repeated len
        while (i + len < s.length && s[i + len] === s[i + len - 1]){
            len++;
        }
        if (len >= 3) {
            replace += Math.floor(len / 3); // Fix: Use Math.floor to get integer replacements
            if (len % 3 === 0) oned += 1;
            if (len % 3 === 1) twod += 1; // Fix: Use 1 instead of 2
        }
        i += len;
    }

    // no need deletion when s.Length <= 20
    if (s.length <= 20) return Math.max(requiredChar, replace);

    var deleteCount = s.length - 20;
    
    // deleting 1 char in (3n) repeated chars will save one replacement
    replace -= Math.min(deleteCount, oned);

    // deleting 2 chars in (3n+1) repeated chars will save one replacement
    replace -= Math.min(Math.max(deleteCount - oned, 0), twod * 2); // Fix: Multiply twod by 2

    // deleting 3 chars in (3n+2) repeated chars will save one replacement
    replace -= Math.max(deleteCount - oned * 2, 0) / 3; // Fix: Multiply oned by 2

    return deleteCount + Math.max(requiredChar, replace);
};

const GetRequiredChar = (s) => {
    var lowercase = 1, uppercase = 1, digit = 1;
    
    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if (c >= 'a' && c <= 'z') lowercase = 0;
        else if (c >= 'A' && c <= 'Z') uppercase = 0;
        else if (c >= '0' && c <= '9') digit = 0;
    }

    return lowercase + uppercase + digit;
};

  const calculateResults = async () => {
    // Perform your calculations here based on the inputValue
    const calculatedResult = Math.floor(minStepsToStrongPassword(inputValue)).toString();
    setResults([...results, { input: inputValue, output: calculatedResult }]);
    // Save the result to the database

    try {
      await axios.post('http://localhost:5000/saveResult', {
        input: inputValue,
        output: calculatedResult,
      }, 
      {
        headers: {
        'Content-Type': 'application/json',
      },
    });
      setSavedMessage('Result saved successfully');
    } catch (error) {
      console.error('Error saving result:', error);
      setSavedMessage('Error saving result');
    }
  };

  // Fetch all results from the database when the component mounts
  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await axios.get('http://localhost:5000/getAllResults');
        // console.log('Fetched results:', response.data);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    }
  
    console.log('Fetching results...');
    fetchResults();
  }, []);
  

  return (
    <div className="App">
      <h1>Simple React Input and Display</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter something"
        />
        <button onClick={calculateResults}>Calculate</button>
      </div>
      {results.length > 0 && (
        <div className="results">
          <h2>Results:</h2>
          <ul>
            {/* Loop through each result and display input and output pairs */}
            {results.map((result, index) => (
              <li key={index}>
                Input: {result.input}, Output: {result.output}
              </li>
            ))}
          </ul>
        </div>
      )}
      {savedMessage && <p className="saved-message">{savedMessage}</p>
}
    </div>
  );
}

export default App;

