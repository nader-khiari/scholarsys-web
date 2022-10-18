import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux/es/exports";
import ROLES from "../../config/roles";

function Home() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        switch (currentUser.role) {
            case ROLES.STUDENT:
                setUserRole("Student");
                break;
            case ROLES.TEACHER:
                setUserRole("Teacher");
                break;
            case ROLES.ADMIN:
                setUserRole("Admin");
                break;
            case ROLES.AGENT:
                setUserRole("Agent");
                break;
            default:
                break;
        }
    }, []);

    return (
        <div className="main-wrapper login-body">
            <div className="page-header">
                <Row>
                    <Col sm={12}>
                        <h3 className="page-title">Preskol Home Page !</h3>
                        <ul className="breadcrumb"></ul>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col sm={12} className="mb-5">
                    Welcome {currentUser.firstname} to our school management
                    website.
                    <br />
                    <br />
                    Your are logged in as a {userRole}.
                </Col>
            </Row>
        </div>
    );
}

export default Home;
