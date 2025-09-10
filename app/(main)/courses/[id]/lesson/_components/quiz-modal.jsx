"use client"

import { addQuizAssessment } from "@/app/actions/quiz"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle, Trophy, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

function QuizModal({ courseId, quizSetId, quizzes, open, setOpen }) {
  const [quizIndex, setQuizIndex] = useState(0)
  const totalQuizzes = quizzes?.length ?? 0
  const lastQuizIndex = totalQuizzes - 1
  const currentQuiz = quizzes[quizIndex]

  const router = useRouter();

  // answers + UI state
  const [userAnswers, setUserAnswers] = useState([]) // [{quizId, selected, correct}]
  const [selectedOptions, setSelectedOptions] = useState([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  // review mode
  const [isReviewing, setIsReviewing] = useState(false)

  // find saved answer for current quiz
  const savedAnswer = userAnswers.find((a) => a.quizId === currentQuiz?.id)

  // sync UI state when changing quiz
  useEffect(() => {
    if (!currentQuiz) return
    if (savedAnswer) {
      setSelectedOptions([savedAnswer.selected])
      setIsAnswered(true)
      setShowExplanation(true)
    } else {
      setSelectedOptions([])
      setIsAnswered(false)
      setShowExplanation(false)
    }
  }, [quizIndex, currentQuiz?.id]) // only runs on quiz change

  // select an option
  const optionChangeHandler = (option) => {
    if (isAnswered || savedAnswer) return // prevent changing once answered

    const picked = option.id
    const correct = option.isCorrect

    setSelectedOptions([picked])
    setIsAnswered(true)
    setShowExplanation(true)

    setUserAnswers((prev) => {
      const filtered = prev.filter((a) => a.quizId !== currentQuiz.id)
      return [...filtered, { quizId: currentQuiz.id, selected: picked, correct, option }]
    })
  }

  // navigate
  const quizChangeHandler = (type) => {
    if (type === "prev" && quizIndex > 0) {
      setQuizIndex((i) => i - 1)
    }
    if (type === "next") {
      if (!savedAnswer) return // block next if unanswered
      if (quizIndex < lastQuizIndex) {
        setQuizIndex((i) => i + 1)
      } else {
        setIsReviewing(true)
      }
    }
  }

  const handleSubmitQuiz = async () => {
    try {
      await addQuizAssessment(courseId, quizSetId, userAnswers)
      // console.log("final data --- ", finalData);
      router.refresh()
      toast.success("Quiz submitted")
      

      setOpen(false)
    } catch (error) {
      console.error("Error submitting quiz:", error)
      toast.error(error.message || "There is a problem in submitting the quiz.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[95%] block max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-white border-0 shadow-2xl">
        {/* ===================== REVIEW ===================== */}
        {isReviewing ? (
          <div className="animate-slideIn">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-4 animate-pulse">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Review Your Performance
              </h2>
              <p className="text-slate-600 mt-2">
                {userAnswers.filter((ans) => ans.correct).length} out of {totalQuizzes} correct
              </p>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {quizzes.map((quiz, index) => {
                const userAnswer = userAnswers.find((ans) => ans.quizId === quiz.id)
                const isCorrect = userAnswer?.correct

                return (
                  <div
                    key={quiz.id}
                    className="group p-6 border-0 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-lg leading-relaxed">{quiz.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-end text-emerald-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-end text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                            {isCorrect ? "Correct" : "Incorrect"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {quiz.options.map((opt) => {
                        const isSelected = userAnswer?.selected === opt.id
                        let optionClasses =
                          "relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2"

                        if (isSelected && opt.isCorrect) {
                          optionClasses +=
                            " bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-500 shadow-lg"
                        } else if (isSelected && !opt.isCorrect) {
                          optionClasses +=
                            " bg-gradient-to-r from-red-500 to-rose-500 text-white border-red-500 shadow-lg"
                        } else if (!isSelected && opt.isCorrect) {
                          optionClasses += " bg-emerald-50 border-emerald-300 text-emerald-800"
                        } else {
                          optionClasses += " bg-slate-50 border-slate-200 text-slate-600"
                        }

                        return (
                          <div key={opt.id} className={optionClasses}>
                            <div className="flex items-center justify-between">
                              <span>{opt.label}</span>
                              {opt.isCorrect && <CheckCircle className="w-4 h-4 text-current" />}
                              {isSelected && !opt.isCorrect && <XCircle className="w-4 h-4 text-current" />}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {quiz.explanation && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs">💡</span>
                          </div>
                          <p className="text-blue-800 text-sm leading-relaxed">{quiz.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <DialogFooter className="mt-8 flex justify-center">
              <Button
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={handleSubmitQuiz}
              >
                Submit Quiz Results
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            {/* ===================== QUIZ ===================== */}
            <div className="pb-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{quizIndex + 1}</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-slate-800">Question {quizIndex + 1}</span>
                    <p className="text-sm text-slate-500">of {totalQuizzes} questions</p>
                  </div>
                </div>
                <div className="text-right">
                  {/* <p className="text-sm text-slate-500">Progress</p> */}
                  <p className="text-lg font-bold text-indigo-600">
                    {Math.round(((quizIndex + 1) / totalQuizzes) * 100)}%
                  </p>
                </div>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((quizIndex + 1) / totalQuizzes) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="py-8">
              <DialogTitle className="text-2xl font-bold text-slate-800 mb-6 leading-relaxed">
                {currentQuiz?.title}
              </DialogTitle>
              <div className="flex items-center gap-2 text-sm text-slate-500 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                There are no negative marks for a wrong answer
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {currentQuiz?.options.map((option, index) => {
                const isSelected = selectedOptions.includes(option.id)
                const isCorrect = option.isCorrect

                let optionClasses =
                  "group relative border-2 rounded-2xl px-6 py-4 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                let feedbackIcon = null

                if (isAnswered) {
                  if (isSelected && isCorrect) {
                    optionClasses +=
                      " bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-500 shadow-xl animate-successPulse"
                    // feedbackIcon = <CheckCircle className="w-5 h-5 text-end" />
                  } else if (isSelected && !isCorrect) {
                    optionClasses += " bg-gradient-to-r from-red-500 to-rose-500 text-white border-red-500 shadow-xl"
                    // feedbackIcon = <XCircle className="w-5 h-5 text-end" />
                  } else if (!isSelected && isCorrect) {
                    optionClasses += " bg-emerald-50 border-emerald-300 text-emerald-800 shadow-lg"
                    // feedbackIcon = <CheckCircle className="w-5 h-5 text-emerald-600 text-end" />
                  } else {
                    optionClasses += " bg-slate-50 border-slate-200 text-slate-600"
                  }
                } else {
                  optionClasses +=
                    " bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50"
                }

                return (
                  <div key={option.id} className="animate-slideIn" style={{ animationDelay: `${index * 100}ms` }}>
                    <input
                      type="checkbox"
                      className="hidden"
                      id={`option-${option.id}`}
                      onChange={() => optionChangeHandler(option)}
                      checked={isSelected}
                      disabled={isAnswered || !!savedAnswer}
                      readOnly
                    />
                    <Label className={optionClasses} htmlFor={`option-${option.id}`}>
                      <div className="flex items-center">
                        <span className="font-medium text-base leading-relaxed">{option.label}</span>
                        {/* {feedbackIcon && <div className="animate-scaleIn">{feedbackIcon}</div>} */}
                      </div>
                      <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-2 border-current rounded-full flex items-center justify-center text-xs font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                        {String.fromCharCode(65 + index)}
                      </div>
                    </Label>
                  </div>
                )
              })}
            </div>

            {showExplanation && currentQuiz?.description && (
              <div className="my-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl animate-slideIn">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">💡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Explanation</h4>
                    <p className="text-blue-700 leading-relaxed">{currentQuiz?.description}</p>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex gap-4 justify-between w-full sm:justify-between pt-6 border-t border-slate-200">
              <Button
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={quizIndex === 0}
                onClick={() => quizChangeHandler("prev")}
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </Button>
              <Button
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                onClick={() => quizChangeHandler("next")}
                disabled={!savedAnswer} // <-- block Next if unanswered
              >
                {quizIndex >= lastQuizIndex ? "Finish Quiz" : "Next Question"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default QuizModal