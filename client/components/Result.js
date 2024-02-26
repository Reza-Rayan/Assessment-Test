import React from "react";

const Result = ({ result, questions, fullname }) => {
  return (
    <div className="quiz-container rounded-lg lg:w-[700px] m-4">
      <p>کل سوالات : {questions.length}</p>
      <h3 className="text-center mt-4 font-semibold">
        نتیجه تست شما:{fullname}
      </h3>
      {result.score <= 18 && (
        <div className="text-center">
          <h3>نتیجه میزان ریسک پذیری شما در بازار سرمایه:</h3>
          <h3 className="text-lg font-semibold"> محافظه کار </h3>
        </div>
      )}
      {result.score >= 19 && result.score <= 36 && (
        <div className="text-center">
          <h3>امتیاز شما: {result.score}</h3>
          <h3 className="text-lg font-semibold"> تا حدودی محافظه‌کار </h3>
        </div>
      )}
      {result.score >= 37 && result.score <= 54 && (
        <div className="text-center">
          <h3>امتیاز شما: {result.score}</h3>
          <h3 className="text-lg font-semibold"> متعادل </h3>
        </div>
      )}
      {result.score >= 55 && result.score <= 72 && (
        <div className="text-center">
          <h3>امتیاز شما: {result.score}</h3>
          <h3 className="text-lg font-semibold"> تا حدودی ریسک‌پذیر </h3>
        </div>
      )}
      {result.score >= 75 && result.score <= 90 && (
        <div className="text-center">
          <h3>امتیاز شما: {result.score}</h3>
          <h3 className="text-lg font-semibold"> ریسک‌پذیر </h3>
        </div>
      )}

      <div>
        <div className="flex gap-5 w-full justify-center my-6">
          <h4>سبد پیشنهادی ما به شما:</h4>
          <h4 className="text-lg font-semibold"> ---- </h4>
        </div>
        <p className="text-center text-lg italic text-yellow-600">
          با تشکر از شرکت شما در آزمون{" "}
        </p>
      </div>
    </div>
  );
};

export default Result;
