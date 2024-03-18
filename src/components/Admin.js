import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import Swal from "sweetalert2";
const Admin = () => {
  const [name, setName] = useState("");
  const [retnperday, setRetnperday] = useState("");
  const [maxcount, setMaxcount] = useState("");
  const [description, setDescription] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [type, setType] = useState("");
  const [imageurl1, setImageurl1] = useState("");
  const [imageurl2, setImageurl2] = useState("");
  const [imageurl3, setImageurl3] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const addRoom = async () => {
    const newroom = {
      name,
      retnperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "https://tossolback.onrender.com/api/rooms/addrooms/",
        newroom,
      );
      console.log(response.data);
      setLoading(false);
      Swal.fire("Congrats", "Your New Room Added Successfully", "success").then(
        (result) => {
          window.location.href = "/home";
        },
      );
    } catch (error) {
      console.error("Error adding room:", error);
      setLoading(false);
      setError(true);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  };

  return (
    <div className="row">
      {loading && <Loader />}
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Rent per Day"
          value={retnperday}
          onChange={(e) => setRetnperday(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Max Count"
          value={maxcount}
          onChange={(e) => setMaxcount(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 1"
          value={imageurl1}
          onChange={(e) => setImageurl1(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 2"
          value={imageurl2}
          onChange={(e) => setImageurl2(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 3"
          value={imageurl3}
          onChange={(e) => setImageurl3(e.target.value)}
        />
        <div className="text-right mt-2">
          <button className="btn btn-primary" onClick={addRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
