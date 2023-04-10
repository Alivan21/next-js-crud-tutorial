"use client";

import { useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        age: age,
      }),
    });

    setIsMutating(false);
    setName("");
    setEmail("");
    setAge("");
    router.refresh();
    setModal(false);
  }

  return (
    <div>
      <button className="btn btn-secondary" onClick={handleChange}>
        Add New
      </button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New User</h3>
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="modal-action">
              <button className="btn" type="button" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              ) : (
                <button className="btn loading" type="button">
                  Submiting....
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
