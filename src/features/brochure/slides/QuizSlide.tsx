import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { quizContent as c } from "../data/content";
import { quizQuestions } from "../data/quiz";
import { SLIDES, slideMeta } from "../data/slides";
import { useBrochure } from "../components/BrochureContext";

export function QuizSlide() {
  const { quiz, setQuiz } = useBrochure();
  const finished = quiz.current >= quizQuestions.length;
  const question = quizQuestions[quiz.current];
  const answer = question ? quiz.answers[question.id] : undefined;
  const correct = quizQuestions.filter((item) => quiz.answers[item.id] === item.correctId).length;

  return (
    <div className="relative pb-4 pt-6">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-gold"><span aria-hidden className="h-px w-6 bg-gold" />{slideMeta("quiz").category}</div>
      <h1 className="relative mt-4 text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">{c.titleLead} <span className="text-gold">{c.titleHighlight}</span></h1>
      <p className="mt-5 text-base leading-relaxed text-muted">{c.description}</p>

      <div className="mt-6 rounded-[1.25rem] border border-gold/30 bg-gradient-to-b from-[#1b1811] to-[#0b0a08] p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-bold tracking-[0.15em] text-gold">
          <span>{c.progressLabel}</span><span>{Math.min(quiz.current + 1, quizQuestions.length)} / {quizQuestions.length}</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true"><div className="h-full rounded-full bg-gold transition-[width]" style={{ width: `${(finished ? 1 : (quiz.current + 1) / quizQuestions.length) * 100}%` }} /></div>

        {finished ? (
          <div className="py-6 text-center" aria-live="polite">
            <h2 className="text-xl font-bold text-white">{c.resultTitle}</h2>
            <p className="mt-3 text-3xl font-extrabold text-[#f8d56b]">{correct} / {quizQuestions.length}</p>
            <p className="mt-1 text-sm text-muted">{c.resultLabel}</p>
            <button type="button" onClick={() => setQuiz({ answers: {}, current: 0 })} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/40 px-4 text-sm font-bold text-[#f8d56b]"><RotateCcw className="size-4" aria-hidden />{c.retry}</button>
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-xs font-bold tracking-[0.12em] text-muted">{c.questionLabel} {quiz.current + 1} / {quizQuestions.length}</p>
            <fieldset className="mt-3">
              <legend className="text-lg font-bold leading-snug text-white">{question.question}</legend>
              <div className="mt-4 space-y-2">
                {question.options.map((option) => (
                  <label key={option.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm leading-relaxed ${answer === option.id ? "border-gold/70 bg-gold/10 text-white" : "border-gold/20 bg-black/40 text-muted"}`}>
                    <input type="radio" name={question.id} value={option.id} checked={answer === option.id} onChange={() => setQuiz({ ...quiz, answers: { ...quiz.answers, [question.id]: option.id } })} className="mt-1 accent-[#f0b100]" />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {answer && <div className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-3 text-sm leading-relaxed" aria-live="polite"><p className="font-bold text-[#f8d56b]">{answer === question.correctId ? c.correct : c.incorrect}</p><p className="mt-1 text-muted">{question.explanation}</p></div>}
            <div className="mt-4 flex items-center justify-between gap-3">
              <button type="button" disabled={quiz.current === 0} onClick={() => setQuiz({ ...quiz, current: quiz.current - 1 })} className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-[#f8d56b] disabled:opacity-40"><ArrowLeft className="size-4" aria-hidden />{c.previous}</button>
              <button type="button" disabled={!answer} onClick={() => setQuiz({ ...quiz, current: quiz.current + 1 })} className="inline-flex min-h-11 items-center gap-1 text-right text-sm font-bold text-[#f8d56b] disabled:opacity-40">{quiz.current === quizQuestions.length - 1 ? c.showResult : c.next}<ArrowRight className="size-4 shrink-0" aria-hidden /></button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 flex gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-xs leading-relaxed text-muted"><span aria-hidden className="font-bold text-gold">i</span><p>{c.disclaimer}</p></div>
    </div>
  );
}
