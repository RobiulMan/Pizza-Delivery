import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const Pizza = ({ pizza }) => {
  const [varient, setVarient] = useState("small");
  const [quentity, setQuentity] = useState(1);
  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div>
            <button style={{ border: "none", padding: 0 }} onClick={handleShow}>
              <img
                src={pizza.image}
                className="img-fluid rounded-start"
                alt={pizza.name}
              />
            </button>
          </div>
          <div className="col-md-12">
            <div className="card-body">
              <h5 className="card-title">{pizza.name}</h5>
              <div className="d-flex  justify-content-between mb-3">
                <div>
                  <p>Varients</p>
                  <select
                    className="form-select form-select-sm"
                    value={varient}
                    onChange={(e) => setVarient(e.target.value)}
                  >
                    {pizza.varients.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p>Quantity</p>
                  <select
                    className="form-control form-select form-select-sm"
                    value={quentity}
                    onChange={(e) => setQuentity(e.target.value)}
                  >
                    {[...Array(10).keys()].map((item) => {
                      return <option value={item + 1}>{item + 1}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="d-flex  justify-content-between">
                <div>
                  <button type="button" class="btn btn-dark">
                    <span className="badge bg-dark">
                      Prices : $ {pizza.prices[0][varient] * quentity}
                    </span>
                  </button>
                </div>
                <div>
                  <button className="btn btn-primary">
                    <i className="bi bi-bag-plus p-2"></i>
                    Add Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{pizza.name}</Modal.Title>
          <button onClick={handleClose} style={{ border: "none" }}>
            <i className="bi bi-x"></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="card mb-3">
            <div className="row g-0">
              <div>
                <img
                  src={pizza.image}
                  className="img-fluid rounded-start"
                  alt={pizza.name}
                />
              </div>
              <div className="col-md-12">
                <div className="card-body">
                  <p>{pizza.description}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} style={{ border: "none" }}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Pizza;
