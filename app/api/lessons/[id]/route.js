import { Lesson } from "@/model/lesson.model";
import { dbConnection } from "@/service/dbConnection";


export async function GET(req, { params }) {
  await dbConnection();
  try {
    const {id} = await params
    console.log("params", id);
    const lesson = await Lesson.findById(id).lean();
    return Response.json(lesson);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
