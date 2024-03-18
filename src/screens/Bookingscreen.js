import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
const Bookingscreen = ({ match }) => {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(false);

  const firstdate = moment(fromdate, "DD-MM-YYY");
  const lastdate = moment(todate, "DD-MM-YYY");
  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;
  const [totalamount, setTotalamount] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.post(
            "https://tossolback.onrender.com/api/rooms/getroombyid",
            {
              roomid: roomid,
            },
          )
        ).data;
        console.log("Rent per day:", data.rentperday);

        setTotalamount(data.retnperday * totaldays);

        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [roomid]);
  console.log("Total amount:", totalamount);

  const onToken = async (token) => {
    console.log("Received token:", token);
    if (!token || !token.email || !token.id) {
      console.error("Invalid token object");
      return;
    }

    const bookingDetails = {
      room,
      user: JSON.parse(localStorage.getItem("currentUser"))._id,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };

    try {
      setLoading(true);
      const result = await axios.post(
        "https://tossolback.onrender.com/api/bookings/bookroom",
        { ...bookingDetails, token },
        Swal.fire(
          "Congratulations",
          "Your room is Booked Successfully",
          "success",
        ).then((result) => {
          window.location.href = "/profile";
        }),
      );
      console.log("Booking result:", result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire("Oops", "Something went wrong", "error");
      console.error("Booking failed:", error.response.data.error);
    }
  };

  return (
    <div className="row justify-center m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="">
          <div className="row bs justify-content-center mr-5">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" alt="" />
            </div>
            <div className="col-md-6">
              <h1 style={{ textAlign: "right" }}>Booking Details</h1>
              <div style={{ textAlign: "right" }}>
                <b>
                  <hr />
                  <p>
                    Name: {JSON.parse(localStorage.getItem("currentUser")).name}{" "}
                  </p>
                  <p>From Date: {fromdate} </p>
                  <p>To Date: {todate} </p>
                  <p>Max Count: {room.maxcount} </p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days :{totaldays}</p>
                  <p>Rent per day : {room.retnperday} </p>
                  <p>Total Amount:{totalamount}</p>
                </b>
              </div>
            </div>
            <div style={{ float: "right" }}>
              <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency="USD"
                stripeKey="pk_test_51OuEOcP5VD7BOW3SqV5IuUrwEjGl5KoH8uzQrxHEbGjDqUk8Pf6CuKCR0W5gYIeZI392vqhQI6KTJflhl0rTcxPr00BWkzDpIb"
                name="Pay Now"
                label="Pay Now"
                className="btn btn-primary"
              />
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default Bookingscreen;
