import { getUsers } from "@/app/api/user/user";
import CreateUser from "@/components/CreateUser";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

export default async function Home() {
  let users: User[] | null = null;
  let error: string | null = null;

  try {
    const fetchedUsers = await getUsers();
    console.log(fetchedUsers);

    // Check if the fetch was successful
    if (Array.isArray(fetchedUsers)) {
      users = fetchedUsers;
    } else {
      error = "Error getting users";
    }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }

  return (
    <main className="">
        <ul>
          {users?.map((item: User) => (
            <li key={item.id}>{item.name} ({item.email})</li>
          ))}
        </ul>
      <CreateUser />
    </main>
  );
}