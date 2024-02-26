"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

import { quiz } from "../data/test";
import Result from "@/components/Result";
import Buttons from "@/components/Buttons";

export default function Page() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
  });
  const [scoreIncrement, setScoreIncrement] = useState(0);
  const [ageScoreAdded, setAgeScoreAdded] = useState(false);
  const [selectedAnswersArray, setSelectedAnswersArray] = useState([]);

  const age =
    typeof localStorage !== "undefined" ? localStorage.getItem("age") : null;
  const fullname =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("fullname")
      : null;
  const nationalCode =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("nationalCode")
      : null;

  const { questions } = quiz;
  const { answers } = questions[activeQuestion];

  const router = useRouter();
  // Redirect Handler
  useEffect(() => {
    if (!nationalCode || nationalCode === "") {
      router.push("/");
    }
  }, []);

  // Save Data In DB By API
  const answersHandler = async () => {
    const currentQuestion = questions[activeQuestion];
    const selectedAnswerText =
      selectedAnswerIndex !== null
        ? answers[selectedAnswerIndex].answer
        : "Not answered";

    // Accumulate selected question and answer
    setSelectedAnswersArray((prevState) => [
      ...prevState,
      { question: currentQuestion.question, answer: selectedAnswerText },
    ]);

    // If it's the last question, send all answers to the server
    if (activeQuestion === questions.length - 1) {
      try {
        await axios
          .post(
            `http://localhost:5000/api/real-users/add-answers/${nationalCode}`,
            { answers: selectedAnswersArray, score: result.score }
          )
          .then(() => {
            setTimeout(() => {
              localStorage.removeItem("age");
              localStorage.removeItem("nationalCode");
              localStorage.removeItem("fullname");
            }, 6);
          });
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  // Select And Check
  const onAnswerSelected = (answer, index) => {
    const selectedAnswerIndex = index;

    setChecked(true);
    setSelectedAnswerIndex(selectedAnswerIndex);

    const selectedQuestion = questions[activeQuestion];
    const selectedAnswer = selectedQuestion.answers[selectedAnswerIndex];

    if (selectedAnswer.value !== scoreIncrement) {
      setScoreIncrement(selectedAnswer.value);
    }
  };

  // Calculate score and increment to next question
  const nextQuestion = () => {
    let ageScoreIncrement = 0;

    if (!ageScoreAdded) {
      // Add Age Score to First Question
      if (age < 35) {
        ageScoreIncrement = 1.5;
      } else if (age >= 35 && age < 45) {
        ageScoreIncrement = 1;
      } else if (age >= 45 && age < 55) {
        ageScoreIncrement = 0.5;
      } else if (age >= 65 && age < 75) {
        ageScoreIncrement = -0.5;
      } else if (age >= 75) {
        ageScoreIncrement = -1;
      }

      setAgeScoreAdded(true);
    }

    // Combine age-based score with the selected answer-based score
    setResult((prev) => {
      const newScore = prev.score + ageScoreIncrement + scoreIncrement;
      return { score: newScore };
    });

    setScoreIncrement(0);
    setSelectedAnswerIndex(null);

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }

    setChecked(false);
    answersHandler();
  };

  // Previous Question
  const prevQuestion = () => {
    setSelectedAnswerIndex(null);

    // Remove the last answer from selectedAnswersArray if going to the previous question
    setSelectedAnswersArray((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers.pop(); // Remove the last answer
      return updatedAnswers;
    });

    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1);
    }
    setChecked(false);
  };

  const progressBarWidth = ((activeQuestion + 1) / questions.length) * 100;
  return (
    <div className="container mx-auto flex flex-col gap-10 min-h-screen items-center justify-center">
      <h1 className="text-center text-3xl font-semibold">صفحه آزمون</h1>
      <div>
        {!showResult ? (
          <h2 className="text-[15px]">
            آزمون : {activeQuestion + 1} از <span>{questions.length}</span>
          </h2>
        ) : null}
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container  lg:w-[750px] rounded-lg flex flex-col justify-end w-full relative overflow-hidden">
            <div
              className={` h-[6px] rounded-full bg-yellow-600 absolute top-0 right-0`}
              style={{ width: `${progressBarWidth}%` }}
            ></div>
            <h3 className="font-[600] text-xl text-[#333333]">
              {activeQuestion + 1}-{questions[activeQuestion].question}
            </h3>
            <ul
              className={`grid gap-x-6 ${
                !answers[0].answer ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {answers.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => onAnswerSelected(item.text, index)}
                    className={`mx-2 my-2 border  cursor-pointer font-[300] text-[15px] py-6 px-3  ${
                      selectedAnswerIndex === index
                        ? "bg-slate-900 text-white rounded-lg w-full"
                        : "li-hover rounded-lg transition-all hover:bg-slate-200"
                    } ${
                      !answers[0].answer
                        ? "mx-auto w-full flex justify-center"
                        : ""
                    }`}
                  >
                    {item.answer ? (
                      <span>{item.answer}</span>
                    ) : (
                      <Image
                        src={item.imageAnswer}
                        width={160}
                        height={160}
                        alt="نمودار"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
            <Buttons
              activeQuestion={activeQuestion}
              checked={checked}
              prevQuestion={prevQuestion}
              questions={questions}
              nextQuestion={nextQuestion}
            />
          </div>
        ) : (
          <Result result={result} questions={questions} fullname={fullname} />
        )}
      </div>
    </div>
  );
}
