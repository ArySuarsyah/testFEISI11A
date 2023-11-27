import { useState } from "react";

export default function TestLogic() {
  const [inputString, setInputString] = useState("");
  const [titleCaseResult, setTitleCaseResult] = useState("");
  const [hyphenatedResult, setHyphenatedResult] = useState("");
  const [n, setN] = useState(10);
  const [numberString, setNumberString] = useState("");

  // Format string action
  const formatString = (input) => {
    // Title case
    const cleanedString = input.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
    const titleCaseString = cleanedString.replace(/\b\w/g, (match) =>
      match.toUpperCase()
    );

    // change spaces to -
    const hyphenatedString = cleanedString.replace(/\s+/g, "-");

    setTitleCaseResult(titleCaseString);
    setHyphenatedResult(hyphenatedString);
  };

  // Handle input
  const handleInputChange = (event) => {
    setInputString(event.target.value);
  };

  // Handle input untuk numberString
  const handleNumberStringChange = (event) => {
    setNumberString(event.target.value);
  };

  // Handle input untuk n
  const handleNChange = (event) => {
    setN(parseInt(event.target.value, 10));
  };

  // submit action
  const handleSubmit = (event) => {
    event.preventDefault();
    formatString(inputString);
  };

  // string count
  const charCount = {};
  for (const char of inputString) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // detret angka
  const firstSeries = Array.from({ length: n }, (_, i) => (i + 1) ** 2);
  const secondSeries = Array.from(
    { length: n },
    (_, i) => ((i + 1) * (i + 2)) / 2
  );
  const thirdSeries = Array.from({ length: n }, (_, i) =>
    i <= 1 ? i : firstSeries[i - 1] + firstSeries[i - 2]
  );

  // statistik angka
  const numbers = numberString.split(/[,\s]+/).map(Number);
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);
  const average =
    numbers.reduce((sum, num) => sum + num, 0) / numbers.length || 0;

  return (
    <div className="flex flex-col gap-10 p-10">
      {/* String format */}
      <div>
        <h3 className="font-bold text-lg mb-3">Test String Format</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 items-center">
            <label>Input String:</label>
            <input
              className="h-8 p-5 rounded-md"
              type="text"
              value={inputString}
              onChange={handleInputChange}
            />
            <button className="btn" type="submit">
              Format
            </button>
          </div>
        </form>

        <div>
          <p>Result: {titleCaseResult}</p>
          <p>Result: {hyphenatedResult}</p>
        </div>
      </div>
      {/* End String format */}

      {/* Caracter count */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Hitung Jumlah Karakter</h3>
        <ul>
          {Object.entries(charCount).map(([char, count]) => (
            <li key={char} className="list-disc ml-4">
              {char} = {count}
            </li>
          ))}
        </ul>
      </div>
      {/* End Caracter count */}

{/* Deret */}
      <div className="mb-8 flex flex-col gap-5">
        <h3 className="text-xl font-bold mb-2">
          Deret Pertama, Kedua, dan Ketiga
        </h3>
        <div className="flex items-center gap-5 ">
          <label>Input n (untuk deret angka):</label>
          <input
            className="h-8 p-5 rounded-md"
            type="number"
            value={n}
            onChange={handleNChange}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h4 className="font-bold mb-2">Deret Pertama</h4>
            <p>{firstSeries.join(" ")}</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Deret Kedua</h4>
            <p>{secondSeries.join(" ")}</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Deret Ketiga</h4>
            <p>{thirdSeries.join(" ")}</p>
          </div>
        </div>
      </div>
      {/* End Deret */}

      {/* Statistik */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Statistik Angka</h3>
        <div className="flex items-center gap-5 ">
          <label>Input Angka (pisahkan dengan koma):</label>
          <input
            className="h-8 p-5 rounded-md"
            type="text"
            value={numberString}
            onChange={handleNumberStringChange}
          />
        </div>

        <p className="mb-2">Maks: {max}</p>
        <p className="mb-2">Min: {min}</p>
        <p className="mb-2">Rata-rata: {average}</p>
      </div>
      {/* End */}
    </div>
  );
}
