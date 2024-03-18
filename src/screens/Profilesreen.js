import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Divider, Flex, Tag } from "antd";
const { TabPane } = Tabs;

const Profilesreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name :{user.name}</h1>
          <h1>Email :{user.email}</h1>
          <h1>isAdmin :{user.isAdmin ? "YES" : "NO"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profilesreen;

export const MyBookings = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://tossolback.onrender.com/api/bookings/getbookingsbyuserid/",
          {
            userid: user._id,
          },
        );
        console.log(response.data);
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
        setError(error);
      }
    };
    fetchData();
  }, [user._id]);

  const cancelBooking = async (bookingid, roomid) => {
    try {
      setLoading(true);
      const result = await axios.post(
        "https://tossolback.onrender.com/api/bookings/cancelbooking",
        { bookingid, roomid },
      );
      console.log("result:", result.data);
      setLoading(false);
      Swal.fire("", "Your room booking has been cancelled", "success").then(
        (result) => {
          window.location.reload();
        },
      );
    } catch (error) {
      setLoading(false);
      Swal.fire("Oops", "Something went wrong", "error");
      console.error(" failed:", error.response.data.error);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h1>{booking.room}</h1>
                  <p>
                    <b>BookId:</b> {booking._id}
                  </p>
                  <p>
                    <b>Checkin:</b> {booking.fromdate}
                  </p>
                  <p>
                    <b>Checkout: </b>
                    {booking.todate}
                  </p>
                  <p>
                    <b>Amount: </b>
                    {booking.totalamount}
                  </p>
                  <p>
                    <b> Status: </b>
                    {booking.status == "cancelled" ? (
                      <Tag color="red">Cancelled</Tag>
                    ) : (
                      <Tag color="green">Confirmed</Tag>
                    )}
                  </p>
                  {booking.status !== "cancelled" && (
                    <div className="text-right">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          cancelBooking(booking._id, booking.roomid);
                        }}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
