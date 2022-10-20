import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux/es/exports";
import ACCOUNT_TYPES from "../../config/accountTypes";

function Home() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [userAccountType, setUserAccountType] = useState("");

    useEffect(() => {
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
                    Your are logged in as a {userAccountType}.
                </Col>
            </Row>
        </div>
    );
}

export default Home;
