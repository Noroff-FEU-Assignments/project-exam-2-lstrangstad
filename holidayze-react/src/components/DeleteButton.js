import { useState } from "react";
import useAxios from "../utils/useAxios";
import { BASE_URL } from "../utils/constants";

const DeleteButton = ({ id, param }) => {
  const [error, setError] = useState(null);

  const http = useAxios();

  const url = `${BASE_URL}/${param}/${id}`;

  async function handleDelete() {
    try {
      await http.delete(url);
      window.location.reload(false);
    } catch (err) {
      setError(err);
    }
  }

  return (
    <button className="delete" onClick={handleDelete}>
      {error ? "Error" : "Delete"}
    </button>
  );
};

export default DeleteButton;
