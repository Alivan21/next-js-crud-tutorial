import { User } from "./types/user";
import AddUser from "./addUser";
import UpdateUser from "./updateUser";
import DeleteUser from "./deleteUser";

async function getUsers() {
  const response = await fetch("http://localhost:5000/users", {
    // next: { revalidate: 10 }, <- incremental static regeneration
    cache: "no-store", // <- get server side props
  });
  const data = await response.json();
  return data;
}

async function UserList() {
  const users: User[] = await getUsers();
  return (
    <div className="p-10">
      <div className="py-2">
        <AddUser />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td className="flex justify-center gap-2">
                <UpdateUser {...user} />
                <DeleteUser {...user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
