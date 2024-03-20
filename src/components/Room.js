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
    <div className="details">
      <div className="">
        <img
          src={room.imageurls[0]}
          className="smallimg"
          alt={`${room.name} img`}
        />
      </div>
      <div className="det ">
        <h3> {room.name} </h3>
        <p style={{ fontSize: "18px", lineHeight: "1.5" }}>
          {" "}
          <span>Max Count : </span>
          {room.maxcount}{" "}
        </p>

        <p style={{ fontSize: "18px", lineHeight: "1.5" }}>
          <span>Type :</span> {room.type}{" "}
        </p>
        <p className="rdet" onClick={handleShow}>
          <span></span> Room details &#x2192;
        </p>
        <div className=" btnss">
          {fromdate && todate && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <p className="booknow">Book now </p>
            </Link>
          )}
        </div>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title style={{ fontSize: "24px", fontWeight: "bold" }}>
              {room.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel prevLabel="" nextLabel="">
              {room.imageurls.map((url, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt={`Slide ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <p style={{ fontSize: "18px", lineHeight: "1.5" }}>
              {room.description}
            </p>
            <p style={{ fontSize: "18px", lineHeight: "1.5" }}>
              {" "}
              <span>Call to Reserve:</span> {room.phonenumber}{" "}
            </p>
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
