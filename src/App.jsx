import React, { useCallback, useState, useEffect, useRef } from 'react';

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (character) str += '!@#$%^&*(){}[]:;<>?/';

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, character]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, character, passwordGenerator]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="text-4xl mb-6 font-bold text-center">Password Generator</h1>

      <div className="bg-slate-400 w-80 p-4 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-4">
          <input
            type="text"
            value={password}
            placeholder="Generated Password"
            readOnly
            className="w-full h-12 rounded-lg p-2 text-center border-none outline-none bg-white text-black"
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-4 w-full flex items-center justify-between">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-2/3"
            />
            <span className="ml-2 text-lg">Length: {length}</span>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className="mr-2"
            />
            <label className="text-lg">Include Numbers</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={character}
              onChange={() => setCharacter(prev => !prev)}
              className="mr-2"
            />
            <label className="text-lg">Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
