import "../components/styles.css";
import { handleSubmit } from "../../actions/create_program";
export default async function CreateProgramPage() {
  return (
    <div>
      <h1 className="text-xl">สร้างโครงการใหม่</h1>
      <form action={handleSubmit}>
        <div>
          <label htmlFor="name">ชื่อโครงการ:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="hospitalName">ชื่อโรงพยาบาล:</label>
          <input type="text" id="hospitalName" name="hospitalName" required />
        </div>
        <div>
          <label htmlFor="code">Code:</label>
          <input type="text" id="code" name="code" required />
        </div>
        <button type="submit">สร้างโครงการ</button>
      </form>
    </div>
  );
}
