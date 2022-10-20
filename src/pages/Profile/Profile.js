import React, { useState, useEffect } from "react";
// Import Components
import { Row, Col, Card, Tabs, Tab, Button } from "react-bootstrap";
// Import Image
import proPic from "../../assets/img/profiles/avatar-02.jpg";
// Import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faEdit,
    faMapMarkerAlt,
    faStreetView,
} from "@fortawesome/fontawesome-free-solid";

import { useSelector } from "react-redux/es/exports";

import authService from "../../services/auth.service";

import toast, { Toaster } from "react-hot-toast";

import userService from "../../services/user.service";
import { useHistory, Redirect } from "react-router-dom";

import { useDispatch } from "react-redux";
import { allSchedules } from "../../slices/schedules";
import { update } from "../../slices/auth";

import scheduleService from "../../services/schedule.service";
import ACCOUNT_TYPES from "../../config/accountTypes";

function Profile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const schedules = useSelector((state) => state.schedules.schedules);

    const { user: currentUser } = useSelector((state) => state.auth);
    const [userAccountType, setUserAccountType] = useState("");

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
    const [phoneNumberClass, setPhoneNumberClass] = useState(
        "form-control is-invalid"
    );

    const [phoneNumber, setPhoneNumber] = useState(0);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState(Date());
    const [classId, setclassId] = useState(null);
    const [schedule, setschedule] = useState({});

    useEffect(() => {
        console.log(classId);
        async function fetchData() {
            setschedule(await scheduleService.getScheduleByClassId(classId));
        }
        fetchData();
        console.log("aaa");
    }, [classId]);

    useEffect(() => {
        console.log(schedule);
    }, [schedule]);

    useEffect(() => {
        dispatch(allSchedules());
        let { classeId: id } =
            JSON.parse(JSON.parse(currentUser.specificData)) || {};
        setclassId(id);

        switch (currentUser.accountType) {
            case ACCOUNT_TYPES.STUDENT:
                setUserAccountType("Student");
                break;
            case ACCOUNT_TYPES.TEACHER:
                setUserAccountType("Teacher");
                break;
            case ACCOUNT_TYPES.ADMIN:
                setUserAccountType("Admin");
                break;
            case ACCOUNT_TYPES.AGENT:
                setUserAccountType("Agent");
                break;
            default:
                break;
        }
        setFirstName(currentUser.firstname);
        setLastName(currentUser.lastname);
        setEmail(currentUser.email);
        setBirthDate(currentUser.birthDate);
        setPhoneNumber(currentUser.phoneNumber);
    }, []);

    const handleResetPassword = (e) => {
        e.preventDefault();
        authService.forgotPassword(currentUser.email);
        toast.success(
            "Success. Please Check your e-mail to rest your password."
        );
        authService.logout();
        history.push("/login");
        window.location.reload();
    };

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
    }, [lastname]);

    useEffect(() => {
        if (birthDate === "" || birthDate === null || birthDate === undefined) {
            setBirthDateClassName("form-control is-invalid");
        } else {
            setBirthDateClassName("form-control is-valid");
        }
    }, [birthDate]);

    useEffect(() => {
        if (!isValidEmail(email)) {
            setEmailClassName("form-control is-invalid");
        } else {
            setEmailClassName("form-control is-valid");
        }
    }, [email]);

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value);
    };

    const handlephoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function isValidNumber(number) {
        return /^[0-9]{8}$/.test(number);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(currentUser.password);
        let data = {
            id: currentUser.id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: currentUser.password,
            birthDate: birthDate,
            phoneNumber: phoneNumber,
            salary: 0,
        };
        dispatch(update(data));
        //userService.editUser(currentUser.id, firstname, lastname, email, currentUser.password, birthDate, phoneNumber, currentUser.salaire)

        toast.success("Success. Your profile is Updated.");
    };

    const handleViewScheduleForTeacher = () => {
        history.push("view-schedule-teacher/" + currentUser.id);
    };

    const handleViewScheduleForStudent = () => {
        console.log(schedule);
        if (schedule[0].id !== undefined) {
            history.push("view-schedule/" + schedule[0].id);
        }
    };

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="page-header">
                <Row>
                    <Col sm={12}>
                        <h3 className="page-title">Profile</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                {currentUser.email}
                            </li>
                            <li className="breadcrumb-item active">Profile</li>
                        </ul>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col sm={12}>
                    <div className="profile-header">
                        <div className="row align-items-center">
                            <div className="col-auto profile-image">
                                <a href="#">
                                    <img
                                        className="rounded-circle"
                                        alt="User Image"
                                        src={
                                            process.env.REACT_APP_API_URL +
                                            "/static/users_images/" +
                                            currentUser.image
                                        }
                                    />
                                </a>
                            </div>
                            <div className="col ml-md-n2 profile-user-info">
                                <h4 className="user-name mb-0">
                                    {currentUser.firstname}{" "}
                                    {currentUser.lastname}
                                </h4>
                                <h6 className="text-muted">{userAccountType}</h6>
                            </div>
                        </div>
                    </div>

                    <Tabs
                        defaultActiveKey="about"
                        id="uncontrolled-tab-example"
                        className="profile-menu"
                    >
                        {/* Personal Detail Tab */}
                        <Tab eventKey="about" title="About">
                            <Row>
                                <Col lg={9}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title className="d-flex justify-content-between">
                                                <span>Personal Details</span>
                                                <a
                                                    className="edit-link"
                                                    data-toggle="modal"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="mr-1"
                                                    />
                                                    Edit
                                                </a>
                                            </Card.Title>

                                            <div className="row">
                                                <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                                    First Name
                                                </p>
                                                <p className="col-sm-9">
                                                    <div className="col-md-10">
                                                        <input
                                                            type="text"
                                                            value={firstname}
                                                            className="form-control form-control-sm"
                                                            onChange={
                                                                handleFirstNameChange
                                                            }
                                                        />
                                                    </div>
                                                </p>
                                            </div>
                                            <div className="row">
                                                <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                                    Last Name
                                                </p>
                                                <p className="col-sm-9">
                                                    <div className="col-md-10">
                                                        <input
                                                            type="text"
                                                            value={lastname}
                                                            className="form-control form-control-sm"
                                                            onChange={
                                                                handleLastNameChange
                                                            }
                                                        />
                                                    </div>
                                                </p>
                                            </div>
                                            <div className="row">
                                                <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                                    Date of Birth
                                                </p>
                                                <p className="col-sm-9">
                                                    <div className="col-md-10">
                                                        <input
                                                            type="date"
                                                            value={birthDate}
                                                            className="form-control form-control-sm"
                                                            onChange={
                                                                handleBirthDateChange
                                                            }
                                                        />
                                                    </div>
                                                </p>
                                            </div>
                                            <div className="row">
                                                <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                                    Email ID
                                                </p>
                                                <p className="col-sm-9">
                                                    <div className="col-md-10">
                                                        <input
                                                            type="text"
                                                            value={email}
                                                            className="form-control form-control-sm"
                                                            onChange={
                                                                handleEmailChange
                                                            }
                                                        />
                                                    </div>
                                                </p>
                                            </div>
                                            <div className="row">
                                                <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                                    Mobile
                                                </p>
                                                <p className="col-sm-9">
                                                    <div className="col-md-10">
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-sm"
                                                            value={phoneNumber}
                                                            onChange={
                                                                handlephoneNumberChange
                                                            }
                                                        />
                                                    </div>
                                                </p>
                                            </div>
                                            <div className="row">
                                                <p className="col-sm-9">
                                                    <Button
                                                        variant="primary"
                                                        type="submit"
                                                        onClick={handleSubmit}
                                                    >
                                                        Update
                                                    </Button>
                                                </p>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg={3}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title className="d-flex justify-content-between">
                                                <span>Account Status</span>
                                            </Card.Title>
                                            <div className="btn btn-success">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="mr-1"
                                                />
                                                Active
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    {userAccountType === "Student" && (
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className="d-flex justify-content-between">
                                                    <span>Schedule</span>
                                                </Card.Title>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={
                                                        handleViewScheduleForStudent
                                                    }
                                                >
                                                    View{" "}
                                                </button>
                                            </Card.Body>
                                        </Card>
                                    )}

                                    {userAccountType === "Teacher" && (
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className="d-flex justify-content-between">
                                                    <span>Schedule</span>
                                                </Card.Title>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={
                                                        handleViewScheduleForTeacher
                                                    }
                                                >
                                                    View{" "}
                                                </button>
                                            </Card.Body>
                                        </Card>
                                    )}
                                </Col>
                            </Row>
                        </Tab>

                        <Tab eventKey="password" title="Password">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Change Password
                                        <br />
                                        <br />
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleResetPassword}
                                        >
                                            Send reset password email
                                        </button>
                                    </Card.Title>
                                    <Row></Row>
                                </Card.Body>
                            </Card>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
