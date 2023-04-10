"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "./types/user";

function DeleteUser(user: User) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleDelete(userId: number) {
    setIsMutating(true);
    await fetch(`http://localhost:5000/users/${userId}`, {
      method: "DELETE",
    });

    setIsMutating(false);
    router.refresh();
    setModal(false);
  }

  return (
    <div>
      <button className="btn btn-sm btn-error" onClick={handleChange}>
        Delete
      </button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete {user.name}?</h3>
          <div className="modal-action">
            <button className="btn" type="button" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button className="btn btn-primary" onClick={() => handleDelete(user.id)} type="submit">
                Delete
              </button>
            ) : (
              <button className="btn loading" type="button">
                Deleting....
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;
