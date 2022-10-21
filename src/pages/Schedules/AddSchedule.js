import React, { useEffect, useState } from "react";
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { allClasses } from "../../slices/classes";
import toast, { Toaster } from "react-hot-toast";
import scheduleService from "../../services/schedule.service";
import { useHistory } from "react-router-dom";

function AddSchedule() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classesList = useSelector((state) => state.classes.classes);
  const { user: currentUser } = useSelector((state) => state.auth);

  const [scheduleName, setScheduleName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [scheduleClass, setscheduleClass] = useState(null);

  useEffect(() => {
    dispatch(allClasses());
  }, []);

  useEffect(() => {
    setScheduleName(
      `EMP-${
        classesList.find((v) => scheduleClass === v.id.toString())
          ?.designation || ""
      }`
    );
  }, [scheduleClass, classesList]);

  const handleClassChange = (e) => {
    setscheduleClass(e.target.value);
  };

  const handleNameChange = (e) => {
    setScheduleName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (scheduleName === null) {
      toast.error("There is an error. Please re-enter your information");
    } else {
      scheduleService.addSchedule(
        scheduleName,
        currentUser.id,
        scheduleClass,
        startDate,
        endDate
      );
      toast.success("Schedule Added Succesfully");
      history.push("/schedules-list");
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="page-header">
        <Row>
          <Col sm={12}>
            <h3 className="page-title">Add Schedule</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/departments">Schedule</a>
              </li>
              <li className="breadcrumb-item active">Add Schedule</li>
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
                      <span>Schedule Details</span>
                    </h5>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="EMP-1"
                        value={scheduleName}
                        onChange={handleNameChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Classe</Form.Label>
                      <select
                        onChange={handleClassChange}
                        className="form-control"
                      >
                        {classesList.map((subject) => {
                          return (
                            <option value={subject.id}>
                              {subject.designation}
                            </option>
                          );
                        })}
                      </select>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="EMP-1"
                        value={startDate}
                        onChange={(event) => {
                          setStartDate(event.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="EMP-1"
                        value={endDate}
                        onChange={(event) => {
                          setEndDate(event.target.value);
                        }}
                      />
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

export default AddSchedule;
