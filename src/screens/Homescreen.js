import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import Swal from "sweetalert2";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avail, setAvail] = useState(false);
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
          "https://toshotelback.onrender.com/api/rooms/getallrooms",
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
  const handleDateChange = (dates) => {
    setFromdate(moment(dates[0]).format("DD-MM-YYYY"));

    setTodate(moment(dates[1]).format("DD-MM-YYYY"));
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
  if (availableRooms.length === 0) {
    console.log("no room available");
  }
  return (
    <div className="">
      <div className="containers">
        <div className="container2">
          <p className="headingt">
            Find your ideal room! Search by date for availability.
          </p>
          <div className="bigsp">
            <div className=" da  ">
              <div className="ad">
                <span>Check in Date </span>
                <input
                  type="date"
                  className="form-control"
                  onChange={filterByDate1}
                />
              </div>

              <div className="ad">
                <span>Check out Date </span>

                <input
                  type="date"
                  className="form-control"
                  onChange={filterByDate2}
                />
              </div>
            </div>

            <div className="fi2 ">
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="search by name"
                  value={searchkey}
                  onChange={(e) => {
                    setSearchkey(e.target.value);
                  }}
                />
              </div>
              <div className="">
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
          </div>
        </div>
      </div>
      <div className="roomlist">
        {loading ? (
          <Loader />
        ) : availableRooms.length > 0 ? (
          availableRooms
            .filter((room) =>
              room.name.toLowerCase().includes(searchkey.toLowerCase()),
            )
            .filter((room) => type === "all" || room.type === type)
            .map((room) => (
              <div key={room._id} className="mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            ))
        ) : (
          <div className="norooms">
            <p className="noroom">
              No available rooms in your picked dates, check other dates for
              availability.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homescreen;
