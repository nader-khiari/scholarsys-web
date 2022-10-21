import React, { useState, useEffect } from "react";
import userService from "../../services/user.service";
// Import Components
import { Row, Col, Card, Form, Button } from "react-bootstrap";

import toast, { Toaster } from "react-hot-toast";
import BootstrapSelect from "react-bootstrap-select-dropdown";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allClasses } from "../../slices/classes";
import { allLevels } from "../../slices/levels";
import ACCOUNT_TYPES from "../../config/accountTypes";
import { allSubjects } from "../../slices/subject";

function AddTeacher() {
  const history = useHistory();
  const classes = useSelector((state) => state.classes.classes);
  const levels = useSelector((state) => state.levels.levels);
  const subjects = useSelector((state) => state.subjects.subjects);

  const [firstNameClassName, setFirstNameClassName] = useState(
    "form-control is-invalid"
  );
  const [lastNameClassName, setLastNameClassName] = useState(
    "form-control is-invalid"
  );
  const [birthDateClassName, setBirthDateClassName] = useState(
    "form-control is-invalid"
  );
  const [emailClassName, setEmailClassName] = useState(
    "form-control is-invalid"
  );
  const [passwordClassName, setPasswordClassName] = useState(
    "form-control is-invalid"
  );
  const [niveauClassName, setNiveauClassName] = useState(
    "form-control is-invalid"
  );
  const [classeClassName, setClasseClassName] = useState(
    "form-control is-invalid"
  );
  const [subjectClassName, setSubjectClassName] = useState(
    "form-control is-invalid"
  );
  const [salaireClassName, setSalaireClassName] = useState(
    "form-control is-invalid"
  );
  const [matiereClassName, setMatiereClassName] = useState(
    "form-control is-invalid"
  );
  const [phoneNumberClass, setPhoneNumberClass] = useState(
    "form-control is-invalid"
  );
  const [imageClass, setImageClass] = useState("form-control is-invalid");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [birthDate, setBirthDate] = useState("");
  const [niveau, setNiveau] = useState("");
  const [classe, setClasse] = useState("");
  const [subject, setSubject] = useState("");
  const [salaire, setSalaire] = useState("");
  const [matiere, setMatiere] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allClasses());
    dispatch(allLevels());
    dispatch(allSubjects());
  }, []);

  useEffect(() => {
    if (
      firstname === "" ||
      firstname === null ||
      firstname === undefined ||
      firstname.length < 3
    ) {
      setFirstNameClassName("form-control is-invalid");
    } else {
      setFirstNameClassName("form-control is-valid");
    }
    console.log(firstname);
  }, [firstname]);

  useEffect(() => {
    if (isValidNumber(phoneNumber)) {
      setPhoneNumberClass("form-control is-valid");
    } else {
      setPhoneNumberClass("form-control is-invalid");
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (
      lastname === "" ||
      lastname === null ||
      lastname === undefined ||
      lastname.length < 3
    ) {
      setLastNameClassName("form-control is-invalid");
    } else {
      setLastNameClassName("form-control is-valid");
    }
    console.log(lastname);
  }, [lastname]);

  useEffect(() => {
    if (image != null) {
      setImageClass("form-control is-valid");
    } else {
      setImageClass("form-control is-invalid");
    }
  }, [image]);

  useEffect(() => {
    if (
      niveau === "" ||
      niveau === null ||
      niveau === undefined ||
      niveau?.length === 0
    ) {
      setNiveauClassName("form-control is-invalid");
    } else {
      setNiveauClassName("form-control is-valid");
    }
    console.log(niveau);
  }, [niveau]);

  useEffect(() => {
    if (
      classe === "" ||
      classe === null ||
      classe === undefined ||
      classe?.length === 0
    ) {
      setClasseClassName("form-control is-invalid");
    } else {
      setClasseClassName("form-control is-valid");
    }
    console.log(classe);
  }, [classe]);

  useEffect(() => {
    if (matiere === "" || matiere === null || matiere === undefined) {
      setMatiereClassName("form-control is-invalid");
    } else {
      setMatiereClassName("form-control is-valid");
    }
    console.log(matiere);
  }, [matiere]);

  useEffect(() => {
    if (salaire === "" || salaire === null || salaire === undefined) {
      setSalaireClassName("form-control is-invalid");
    } else {
      setSalaireClassName("form-control is-valid");
    }
    console.log(salaire);
  }, [salaire]);

  useEffect(() => {
    if (birthDate === "" || birthDate === null || birthDate === undefined) {
      setBirthDateClassName("form-control is-invalid");
    } else {
      setBirthDateClassName("form-control is-valid");
    }
    console.log(birthDate);
  }, [birthDate]);

  useEffect(() => {
    if (!isValidEmail(email)) {
      setEmailClassName("form-control is-invalid");
    } else {
      setEmailClassName("form-control is-valid");
    }
    console.log(email);
  }, [email]);

  useEffect(() => {
    if (!isValidPassword(password)) {
      setPasswordClassName("form-control is-invalid");
    } else {
      setPasswordClassName("form-control is-valid");
    }
    console.log(password);
  }, [password]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlephoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  const handleClasseChange = (e) => {
    setClasse(e.selectedKey);
    // setClasse(e.target.value);
  };
  const handleSubjectChange = (e) => {
    setSubject(e.selectedKey);
    // setClasse(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNiveauChange = (e) => {
    setNiveau(e.selectedKey);
  };

  const handleSalaireChange = (e) => {
    setSalaire(e.target.value);
  };

  const handleMatiereChange = (e) => {
    setMatiere(e.target.value);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPassword(password) {
    return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
      password
    );
  }

  function isValidNumber(number) {
    return /^[0-9]{8}$/.test(number);
  }
  const subjectsSelectList = subjects.map((classe) => {
    return { labelKey: classe.id, value: classe.designation };
  });
  const classesSelectList = classes
    .filter((el) => {
      console.log(niveau);
      console.log(el);
      return niveau.includes(el.niveauId);
    })
    .map((classe) => {
      return { labelKey: classe.id, value: classe.designation };
    });
  const levelsSelectList = levels.map((level) => {
    console.log("level");
    return { labelKey: level.id, value: level.designation };
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstNameClassName === "form-control is-invalid" ||
      emailClassName === "form-control is-invalid" ||
      passwordClassName === "form-control is-invalid" ||
      lastNameClassName === "form-control is-invalid" ||
      birthDateClassName === "form-control is-invalid" ||
      phoneNumberClass === "form-control is-invalid" ||
      imageClass === "form-control is-invalid"
    ) {
      toast.error("There is an error. Please re-enter your information");
      console.log("a");
    } else {
      toast.success("Success. user must confirm his account via e-mail");
      userService.register(
        firstname,
        lastname,
        phoneNumber,
        birthDate,
        image,
        email,
        gender.toUpperCase(),
        password,
        ACCOUNT_TYPES.TEACHER,
        salaire,
        classe
      );
      setTimeout(() => {
        history.push("/teachers");
      }, 4000);
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="page-header">
        <Row>
          <Col sm={12}>
            <h3 className="page-title">Add Teacher</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="">Teachers</a>
              </li>
              <li className="breadcrumb-item active">Edit Teachers</li>
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
                      <span>Teachers Information</span>
                    </h5>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        className={firstNameClassName}
                        defaultValue={firstname}
                        onChange={handleFirstNameChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        className={lastNameClassName}
                        defaultValue={lastname}
                        onChange={handleLastNameChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div className="form-group">
                      <label className="form-group-label">Gender</label>
                      <br />
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          onClick={() => setGender("male")}
                          checked={gender === "male"}
                        />
                        <label class="form-check-label" for="male">
                          Male
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          onClick={() => setGender("female")}
                          checked={gender === "female"}
                        />
                        <label class="form-check-label" for="female">
                          Female
                        </label>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        className={birthDateClassName}
                        defaultValue={birthDate}
                        onChange={handleBirthDateChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        className={emailClassName}
                        defaultValue={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="text"
                        className={passwordClassName}
                        defaultValue={password}
                        onChange={handlePasswordChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Level</Form.Label>

                      <BootstrapSelect
                        isMultiSelect
                        options={levelsSelectList}
                        className={niveauClassName}
                        onChange={handleNiveauChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Classes</Form.Label>
                      {/* <Form.Control
                        type="text"
                        className={classeClassName}
                        defaultValue={classe}
                        onChange={handleClasseChange}
                        required
                      />

                      <Select
                        placeholder="Select a Class ..."
                        options={classesSelectList}
                        onChange={handleClasseChange}
                        theme="danger"
                        isSearchable={true}
                      /> */}

                      <BootstrapSelect
                        isMultiSelect
                        options={classesSelectList}
                        className={classeClassName}
                        onChange={handleClasseChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Subjects</Form.Label>

                      <BootstrapSelect
                        isMultiSelect
                        options={subjectsSelectList}
                        className={subjectClassName}
                        onChange={handleSubjectChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Salaire</Form.Label>
                      <Form.Control
                        type="text"
                        className={salaireClassName}
                        defaultValue={salaire}
                        onChange={handleSalaireChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        className={phoneNumberClass}
                        defaultValue={phoneNumber}
                        onChange={handlephoneNumberChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Label>Admin Image</Form.Label>
                      <Form.File
                        type="file"
                        className={imageClass}
                        onChange={handleImageChange}
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

export default AddTeacher;
