import React, { useState, useEffect } from "react";
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function AddLevel() {
  let history = useHistory();

  const [formations, setFormations] = useState([]);

  const items = formations.map((formation) => {
    return (
      <option key={formation.id} data-key={formation.id}>
        {formation.nom}
      </option>
    );
  });

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/formations")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setFormations(res);
      });
  }, []);

  const [desgniation, setdesgniation] = useState();
  const [desgniationIsValid, setdesgniationIsValid] = useState(
    "form-control is-invalid"
  );

  const [acronyme, setAcronyme] = useState("");
  const [acronymeIsValid, setAcronymeIsValid] = useState(
    "form-control is-invalid"
  );

  const [formation, setFormation] = useState("");
  const [formationIsValid, setFormationIsValid] = useState(
    "form-control is-invalid"
  );

  const handleDesgniation = (desgniation) => {
    if (desgniation.target.value !== undefined) {
      if (desgniation.target.value.length == "") {
        setdesgniationIsValid("form-control is-invalid");
      } else if (desgniation.target.value.length < 3) {
        setdesgniationIsValid("form-control is-invalid");
      } else if (desgniation.target.value.length > 20) {
        setdesgniationIsValid("form-control is-invalid");
      } else {
        setdesgniation(desgniation.target.value);
        setdesgniationIsValid("form-control is-valid");
      }
    } else {
      setdesgniationIsValid("form-control is-invalid");
    }
  };

  const handleAcronyme = (acronyme) => {
    if (acronyme.target.value !== undefined) {
      if (acronyme.target.value == "") {
        setAcronymeIsValid("form-control is-invalid");
      } else if (acronyme.target.value.length > 8) {
        setAcronymeIsValid("form-control is-invalid");
      } else if (acronyme.target.value.length < 2) {
        setAcronymeIsValid("form-control is-invalid");
      } else {
        setAcronyme(acronyme.target.value);
        setAcronymeIsValid("form-control is-valid");
      }
    } else {
      setAcronymeIsValid("form-control is-invalid");
    }
  };

  const handleFormation = (formation) => {
    if (formation.target.value !== undefined) {
      const selectedIndex = formation.target.options.selectedIndex;
      const id =
        formation.target.options[selectedIndex].getAttribute("data-key");
      formations.map((formation) => {
        if (formation.id == id) {
          setFormation(formation);
          setFormationIsValid("form-control is-valid");
        }
      });
    } else {
      setFormationIsValid("form-control is-valid");
    }
  };

  const handleSubmit = async (level) => {
    level.preventDefault();
    if (
      desgniationIsValid === "form-control is-invalid" ||
      acronymeIsValid === "form-control is-invalid" ||
      formationIsValid === "form-control is-invalid"
    ) {
      toast.error("Form contain errors");
    } else {
      toast.success("Form has been submitted");
      level.preventDefault();
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/createNiveau",
        {
          method: "POST",
          body: JSON.stringify({
            designation: desgniation,
            acronyme: acronyme,
            formationId: formation.id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      history.push("/levels");
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="page-header">
        <Row>
          <Col sm={12}>
            <h3 className="page-title">Add Levels</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/levels">Levels</a>
              </li>
              <li className="breadcrumb-item active">Add Level</li>
            </ul>
          </Col>
        </Row>
      </div>

      <Row>
        <Col sm={12}>
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <Col sm={12}>
                    <h5 className="form-title">
                      <span>Level Details</span>
                    </h5>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Level desgniation</Form.Label>
                      <Form.Control
                        className={desgniationIsValid}
                        type="text"
                        onChange={handleDesgniation}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Level Acronyme</Form.Label>
                      <Form.Control
                        className={acronymeIsValid}
                        type="text"
                        onChange={handleAcronyme}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12}>
                    <Form.Group>
                      <Form.Label>Formation</Form.Label>
                      <Form.Control
                        className={formationIsValid}
                        as="select"
                        onChange={handleFormation}
                      >
                        <option disabled selected value>
                          Choisir une formation
                        </option>
                        {items}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export { AddLevel };
