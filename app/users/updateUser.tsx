"use client";

import { useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";
import { User } from "./types/user";

function UpdateUser(user: User) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        age: age,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Update
      </button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {user.name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input
                className="input w-full input-bordered"
                type="text"
                placeholder="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Email</label>
              <input
                className="input w-full input-bordered"
                type="email"
                placeholder="User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Age</label>
              <input
                className="input w-full input-bordered"
                type="text"
                placeholder="User Age"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </div>
            <div className="modal-action">
              <button className="btn" type="button" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
              ) : (
                <button className="btn loading" type="button">
                  Updating....
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
