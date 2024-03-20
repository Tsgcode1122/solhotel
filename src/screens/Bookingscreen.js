import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

const Bookingscreen = () => {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(false);
  const [isModal, setIsModal] = useState(true);

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
            "https://toshotelback.onrender.com/api/rooms/getroombyid",
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
        "https://toshotelback.onrender.com/api/bookings/bookroom",
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
  const closemodal = () => {
    setIsModal(!isModal);
  };
  return (
    <div className="custom-row justify-center ">
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="custom-container bs">
          <div className="custom-column">
            <div className="clname">
              <h3>{room.name}</h3>
            </div>
            <img src={room.imageurls[0]} className="bigimg" alt="" />
          </div>
          <div className="custom-columns">
            <h3 style={{ textAlign: "left" }}>Booking Details</h3>
            <div className="booking-info" style={{ textAlign: "left" }}>
              <b>
                <hr />
                <p>
                  <span>Name: </span>{" "}
                  {JSON.parse(localStorage.getItem("currentUser")).name}{" "}
                </p>
                <p>
                  {" "}
                  <span>From Date: </span>
                  {fromdate}{" "}
                </p>
                <p>
                  <span>To Date: </span> {todate}{" "}
                </p>
                <p>
                  <span>Max Count: </span> {room.maxcount}{" "}
                </p>
              </b>
            </div>
            <div className="amount-info" style={{ textAlign: "left" }}>
              <b>
                <h3>Amount</h3>
                <hr />
                <p>
                  {" "}
                  <span>Total days:</span> {totaldays}
                </p>
                <p>
                  <span> Rent per day:</span> {room.retnperday}{" "}
                </p>
                <p>
                  <span> Total Amount:</span>
                  {totalamount}
                </p>
              </b>
            </div>
            <div className="payment-button" style={{ textAlign: "right" }}>
              <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency="USD"
                stripeKey="pk_test_51OuEOcP5VD7BOW3SqV5IuUrwEjGl5KoH8uzQrxHEbGjDqUk8Pf6CuKCR0W5gYIeZI392vqhQI6KTJflhl0rTcxPr00BWkzDpIb"
                name="Pay Now"
                label="Pay Now"
                className="custom-button"
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
