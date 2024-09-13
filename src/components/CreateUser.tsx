"use client"
// CreateUser.tsx
import { useState } from 'react';
import axios from 'axios';
import  { createUser } from "@/app/api/user/user";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/user', { name, email });
      console.log(response.data);
      setName("");
      setEmail("");
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium ">Your name </label>
          <input
            type="text"
            name="email"
            id="name"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            placeholder="emter your name " required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 mt-2 text-sm font-medium ">Your email</label>
          <input
            type="email"
            name="email"
            id="email"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            placeholder="name@company.com" required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <button type="submit" className={"px-4 py-2 bg-amber-200 rounded-2xl mt-3 mb-4"}>Create User</button>
        {error && <p style={{color: "red"}}>{error}</p>}
      </form>
    </main>
  );
}

export default CreateUser;
