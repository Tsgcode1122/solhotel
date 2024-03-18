import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Carousel from "react-bootstrap/esm/Carousel";
import { Link } from "react-router-dom";

const Room = ({ room, fromdate, todate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col md-4">
        <img src={room.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-7 text-left">
        <h1> {room.name} </h1>
        <p> Max Count : {room.maxcount} </p>
        <p> Phone Number : {room.phonenumber} </p>
        <p> type : {room.type} </p>
        <div style={{ float: "right" }} className="m-2">
          {fromdate && todate && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-primary">Book now </button>
            </Link>
          )}

          <button className="btn btn-primary" onClick={handleShow}>
            View details
          </button>
        </div>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{room.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel prevLabel="" nextLabel="">
              {room.imageurls.map((url) => {
                return (
                  <Carousel.Item>
                    <img className="d-block w-100 bigimg" src={url} />
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <p>{room.description}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Room;
