import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [duplicaterooms, setDuplicaterooms] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://tossolback.onrender.com/api/rooms/getallrooms",
        );
        setRooms(response.data);
        setDuplicaterooms(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByDate1 = (event) => {
    setFromdate(moment(event.target.value).format("DD-MM-YYYY"));
  };

  const filterByDate2 = (event) => {
    setTodate(moment(event.target.value).format("DD-MM-YYYY"));
  };

  const filterBySearch = () => {
    const filteredRooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase()),
    );
    return filteredRooms;
  };

  const filterByType = (selectedType) => {
    setType(selectedType);
  };

  const filterAvailableRooms = () => {
    if (!fromdate || !todate) return duplicaterooms;

    const availableRooms = duplicaterooms.filter((room) => {
      const bookings = room.currentbookings;
      if (bookings.length === 0) return true;

      for (const booking of bookings) {
        const bookingStart = moment(booking.fromdate, "DD-MM-YYYY");
        const bookingEnd = moment(booking.todate, "DD-MM-YYYY");
        const startDate = moment(fromdate, "DD-MM-YYYY");
        const endDate = moment(todate, "DD-MM-YYYY");

        if (
          startDate.isBetween(bookingStart, bookingEnd, undefined, "[]") ||
          endDate.isBetween(bookingStart, bookingEnd, undefined, "[]") ||
          bookingStart.isBetween(startDate, endDate, undefined, "[]") ||
          bookingEnd.isBetween(startDate, endDate, undefined, "[]")
        ) {
          return false;
        }
      }
      return true;
    });

    return availableRooms;
  };

  const availableRooms = filterAvailableRooms();

  return (
    <div className="container">
      <div className="row bs">
        <div className="da">
          <input
            type="date"
            className="form-control"
            placeholder="Select Date"
            onChange={filterByDate1}
          />
          <input
            type="date"
            className="form-control"
            placeholder="Select Date"
            onChange={filterByDate2}
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="searchrooms"
            value={searchkey}
            onChange={(e) => {
              setSearchkey(e.target.value);
            }}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="Delux">Delux</option>
            <option value="Executive">Executive</option>
          </select>
        </div>
      </div>
      <div className="row justify-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          availableRooms
            .filter((room) =>
              room.name.toLowerCase().includes(searchkey.toLowerCase()),
            )
            .filter((room) => type === "all" || room.type === type)
            .map((room) => (
              <div key={room._id} className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Homescreen;
