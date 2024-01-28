import Users from "@/component/Users";
import Todo from "@/component/Todo";
export default function todolistPage() {
  return (
    <>
      <div className="container">
        <h1>To Do list</h1>
        <Users />
        <br />
        <Todo />
      </div>
    </>
  );
}
