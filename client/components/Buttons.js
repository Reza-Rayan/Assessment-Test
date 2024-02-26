import React from "react";

const Buttons = ({
  prevQuestion,
  activeQuestion,
  questions,
  checked,
  nextQuestion,
}) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        className="bg-yellow-600 px-6 py-3 rounded-lg border border-yellow-600 transition-all
    hover:bg-transparent hover:text-yellow-600 cursor-pointer font-semibold "
        onClick={prevQuestion}
        disabled={activeQuestion === 0}
      >
        قبلی
      </button>
      {checked ? (
        <button
          className="bg-yellow-600 px-6 py-3 rounded-lg border border-yellow-600 transition-all
          hover:bg-transparent hover:text-yellow-600 cursor-pointer font-semibold "
          onClick={nextQuestion}
        >
          {activeQuestion === questions.length - 1 ? "پایان" : "بعدی"}
        </button>
      ) : (
        <button
          className="bg-yellow-600 px-6 py-3 rounded-lg border border-yellow-600 transition-all
         hover:bg-transparent hover:text-yellow-600 cursor-pointer font-semibold "
          onClick={nextQuestion}
          disabled
        >
          {activeQuestion === questions.length - 1 ? "پایان" : "بعدی"}
        </button>
      )}
    </div>
  );
};

export default Buttons;
