import { getAllQuizSets } from "@/queries/quizzes";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { toPlainObject } from "@/lib/convert-data";

const QuizSets = async () => {
  const quizSets = await getAllQuizSets();
  // console.log("quizSets --- ", quizSets);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={quizSets} />
    </div>
  );
};

export default QuizSets;
