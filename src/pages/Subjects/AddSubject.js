import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

function AddSubject() {
  let history = useHistory();

  const [niveaux, setNiveaux] = useState([]);
  const [formations, setFormations] = useState([]);

  const levelItems = niveaux.map((niveau) => {
    return (
      <option key={niveau.id} data-key={niveau.id}>
        {niveau.designation}
      </option>
    );
  });

  const formationItems = formations.map((formation) => {
    return (
      <option key={"formation" + formation.id} data-key={formation.id}>
        {formation.nom}
      </option>
    );
  });

  const [name, setName] = useState();
  const [nameIsValid, setNameIsValid] = useState("form-control is-invalid");

  const [formation, setFormation] = useState("");
  const [formationIsValid, setFormationIsValid] = useState(
    "form-control is-invalid"
  );

  const [level, setLevel] = useState();
  const [levelIsValid, setlLevelIsValid] = useState("form-control is-invalid");

  const [coef, setCoef] = useState();
  const [coefIsValid, setCoefIsValid] = useState("form-control is-invalid");

  const [nbHeure, setNbHeure] = useState();
  const [nbHeureIsValid, setNbHeureIsValid] = useState(
    "form-control is-invalid"
  );

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/formations")
      .then((response) => {
        return response.json();
      })
      .then((formation) => {
        setFormations(formation);
      });
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/niveaus")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        var tableau = [];
        for (var i = 0; i < res.length; i++) {
          if (res[i].formationId == formation.id) {
            tableau.push(res[i]);
          }
        }
        setNiveaux(tableau);
      });
  }, [formation]);

  const blockInvalidChar = (e) =>
    ["+", "-"].includes(e.key) && e.preventDefault();

  const handleName = (name) => {
    if (name.target.value !== undefined) {
      if (name.target.value == "") {
        setNameIsValid("form-control is-invalid");
      } else if (name.target.value.length < 3) {
        setNameIsValid("form-control is-invalid");
      } else if (name.target.value.length > 20) {
        setNameIsValid("form-control is-invalid");
      } else {
        setNameIsValid("form-control is-valid");
        setName(name.target.value);
      }
    } else {
      setNameIsValid("form-control is-invalid");
    }
  };

  const handleFormation = (formation) => {
    if (formation.target.value !== undefined) {
      setFormationIsValid(true);
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
      setFormationIsValid("form-control is-invalid");
    }
  };

  const handleLevel = (level) => {
    if (level.target.value !== undefined) {
      setlLevelIsValid(true);
      const selectedIndex = level.target.options.selectedIndex;
      const id = level.target.options[selectedIndex].getAttribute("data-key");
      niveaux.map((niveau) => {
        if (niveau.id == id) {
          setLevel(niveau);
          setlLevelIsValid("form-control is-valid");
        }
      });
    } else {
      setlLevelIsValid("form-control is-invalid");
    }
  };

  const handleCoef = (coef) => {
    if (coef.target.value !== undefined || coef.target.value !== "") {
      if (coef.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
        if (coef.target.value == 0) {
          setCoefIsValid("form-control is-invalid");
        } else {
          setCoef(coef.target.value);
          setCoefIsValid("form-control is-valid");
        }
      } else {
        setCoefIsValid("form-control is-invalid");
      }
    } else {
      setCoefIsValid("form-control is-invalid");
    }
  };

  const handleNbHeure = (nbHeure) => {
    if (nbHeure.target.value !== undefined || nbHeure.target.value !== "") {
      if (nbHeure.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
        if (nbHeure.target.value == 0) {
          setNbHeureIsValid("form-control is-invalid");
        } else {
          setNbHeure(nbHeure.target.value);
          setNbHeureIsValid("form-control is-valid");
        }
      } else {
        setNbHeureIsValid("form-control is-invalid");
      }
    } else {
      setNbHeureIsValid("form-control is-invalid");
    }
  };

  const handleSubmit = async (subject) => {
    subject.preventDefault();
    if (
      nameIsValid === "form-control is-invalid" ||
      levelIsValid === "form-control is-invalid" ||
      coefIsValid === "form-control is-invalid" ||
      nbHeureIsValid === "form-control is-invalid"
    ) {
      toast.error("Form contains errors");
    } else {
      subject.preventDefault();
      console.log(name + " " + level + " " + coef + " " + nbHeure);
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/createMatiere",
        {
          method: "POST",
          body: JSON.stringify({
            designation: name,
            niveauId: level.id,
            coef: coef,
            nbr_heure: nbHeure,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      toast.success("Form has been submitted");
      history.push("/subjects");
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="page-header">
        <Row>
          <Col sm={12}>
            <h3 className="page-title">Add Subject</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/subjects">Subject</a>
              </li>
              <li className="breadcrumb-item active">Add Subject</li>
            </ul>
          </Col>
        </Row>
      </div>

      <Row>
        <Col sm={12}>
          <Card>
            <Card.Body>
              <Form>
                <Row className="add-subject">
                  <Col sm={12}>
                    <h5 className="form-title">
                      <span>Subject Information</span>
                    </h5>
                  </Col>

                  <Col xs={12} sm={12}>
                    <Form.Group>
                      <Form.Label>Subject Name</Form.Label>
                      <Form.Control
                        className={nameIsValid}
                        type="text"
                        onChange={handleName}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Formation</Form.Label>
                      <Form.Control
                        className={formationIsValid}
                        as="select"
                        onChange={handleFormation}
                      >
                        <option disabled selected value>
                          Choose a formation
                        </option>
                        {formations && formationItems}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Niveau</Form.Label>
                      <Form.Control
                        className={levelIsValid}
                        as="select"
                        onChange={handleLevel}
                      >
                        <option disabled selected value>
                          Choose a level
                        </option>
                        {niveaux && levelItems}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Coefficient</Form.Label>
                      <Form.Control
                        className={coefIsValid}
                        type="text"
                        min="0"
                        onKeyDown={blockInvalidChar}
                        onChange={handleCoef}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Nombre d'heure</Form.Label>
                      <Form.Control
                        className={nbHeureIsValid}
                        type="text"
                        min="0"
                        onKeyDown={blockInvalidChar}
                        onChange={handleNbHeure}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Button type="submit" onClick={handleSubmit}>
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

export { AddSubject };
