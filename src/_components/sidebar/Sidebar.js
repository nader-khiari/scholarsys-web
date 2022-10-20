import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import $ from "jquery";
import { history } from "../_helpers";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThLarge,
    faUserGraduate,
    faChalkboardTeacher,
    faBuilding,
    faBook,
    faFile,
    faHockeyPuck,
    faDollarSign,
    faClipboard,
    faCalendar,
    faTable,
    faShieldAlt,
    faBaseballBall,
    faBus,
    faColumns,
    faCode,
    faLevelUpAlt,
    faUser,
    faGraduationCap,
    faMoneyBill,
    faSchool,
} from "@fortawesome/fontawesome-free-solid";

import { faSquarespace } from "@fortawesome/free-brands-svg-icons";

import { useSelector } from "react-redux";
import ACCOUNT_TYPES from "../../config/accountTypes";

function Sidebar() {
    const [pathname, setPathname] = useState(
        history.location.pathname.split("/")[1]
    );

    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        if (currentUser.accountType === null) {
            <Link to="/login" />;
        }
    }, [currentUser]);

    function init() {
        var Sidemenu = function () {
            this.$menuItem = $("#sidebar-menu a");
        };
        var $this = Sidemenu;
        $("#sidebar-menu a").on("click", function (e) {
            if ($(this).parent().hasClass("submenu")) {
                e.preventDefault();
            }
            if (!$(this).hasClass("subdrop")) {
                $("ul", $(this).parents("ul:first")).slideUp(350);
                $("a", $(this).parents("ul:first")).removeClass("subdrop");
                $(this).next("ul").slideDown(350);
                $(this).addClass("subdrop");
            } else if ($(this).hasClass("subdrop")) {
                $(this).removeClass("subdrop");
                $(this).next("ul").slideUp(350);
            }
        });
        $("#sidebar-menu ul li.submenu a.active")
            .parents("li:last")
            .children("a:first")
            .addClass("active")
            .trigger("click");
    }

    $(document).on("mouseover", function (e) {
        e.stopPropagation();
        if (
            $("body").hasClass("mini-sidebar") &&
            $("#toggle_btn").is(":visible")
        ) {
            var targ = $(e.target).closest(".sidebar").length;
            if (targ) {
                $("body").addClass("expand-menu");
                $(".subdrop + ul").slideDown();
            } else {
                $("body").removeClass("expand-menu");
                $(".subdrop + ul").slideUp();
            }
            return false;
        }
    });

    useEffect(() => {
        init();
    }, []);

    let pathnames = window.location.pathname;
    const exclusionArray = ["/", "/register", "/forgot-password", "/error"];
    /* if (exclusionArray.indexOf(location.pathname) >= 0) {
		return '';
	} */

    console.log(currentUser);
    if (currentUser.accountType === ACCOUNT_TYPES.ADMIN) {
        return (
            <div className="sidebar" id="sidebar">
                <Scrollbars style={{ height: "100vh" }}>
                    <div className="sidebar-inner">
                        <div id="sidebar-menu" className="sidebar-menu">
                            <ul>
                                <li className="menu-title">
                                    <span>Main Menu</span>
                                </li>
                                <li
                                    className={
                                        pathnames.includes(
                                            "/react/dashboard"
                                        ) ||
                                        pathnames.includes(
                                            "/react/teacher-dashboard"
                                        ) ||
                                        pathnames.includes(
                                            "/react/student-dashboard"
                                        )
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <a href="#">
                                        <FontAwesomeIcon icon={faThLarge} />{" "}
                                        <span>Dashboard</span>{" "}
                                        <span className="menu-arrow"></span>
                                    </a>

                                    <ul>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/dashboard"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/dashboard">
                                                Agent Dashboard
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/teacher-dashboard"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/teacher-dashboard">
                                                Teacher Dashboard
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/student-dashboard"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/student-dashboard">
                                                Student Dashboard
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li
                                    className={`submenu ${
                                        pathnames.includes("/react/students")
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/student-details"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/add-student"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/edit-student"
                                              )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <a href="#">
                                        <FontAwesomeIcon
                                            icon={faUserGraduate}
                                        />{" "}
                                        <span> Students</span>{" "}
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <ul>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/students"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/students">
                                                Student List
                                            </Link>
                                        </li>
                                        {/* <li className={pathnames.includes('/react/student-details') ? 'active' : ''}>
										<Link to="/student-details">Student View</Link>
									</li> */}
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/add-student"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/add-student">
                                                Student Add
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    className={`submenu ${
                                        pathnames.includes("/react/teachers")
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/teacher-details"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/add-teacher"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/edit-teacher"
                                              )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <a href="#">
                                        <FontAwesomeIcon
                                            icon={faChalkboardTeacher}
                                        />{" "}
                                        <span> Teachers</span>{" "}
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <ul>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/teachers"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/teachers">
                                                Teacher List
                                            </Link>
                                        </li>

                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/add-teacher"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/add-teacher">
                                                Teacher Add
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    className={`submenu ${
                                        pathnames.includes("/react/admins")
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/admin-details"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/add-admin"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/edit-admin"
                                              )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <a href="#">
                                        <FontAwesomeIcon
                                            icon={faChalkboardTeacher}
                                        />{" "}
                                        <span> Admins</span>{" "}
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <ul>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/teacher-details"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/admins">
                                                Admins List
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/add-teacher"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/add-admin">
                                                Admin Add
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li
                                    className={`submenu ${
                                        pathnames.includes("/schedules-list")
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/admin-details"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/add-admin"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/edit-admin"
                                              )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <a href="#">
                                        <FontAwesomeIcon icon={faSchool} />{" "}
                                        <span> Schedules</span>{" "}
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <ul>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/teacher-details"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/schedules-list">
                                                Schedules List
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/add-teacher"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/add-schedule">
                                                Admin Add
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li
                                    className={`submenu ${
                                        pathnames.includes("/react/formations")
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/add-formation"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/edit-formation"
                                              )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <a href="#">
                                        <FontAwesomeIcon icon={faBuilding} />{" "}
                                        <span> Formations</span>{" "}
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <ul>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/formations"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/formations">
                                                Formation List
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/add-formation"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/add-formation">
                                                Formation Add
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    className={`submenu ${
                                        pathnames.includes("/react/levels")
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/add-level"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/edit-level"
                                              )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <a href="#">
                                        <FontAwesomeIcon icon={faLevelUpAlt} />{" "}
                                        <span> Levels </span>{" "}
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <ul>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/levels"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/levels">
                                                Levels List
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/add-level"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/add-level">
                                                Add Level
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    className={`submenu ${
                                        pathnames.includes("/react/classes")
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/add-class"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/edit-class"
                                              )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <a href="#">
                                        <FontAwesomeIcon icon={faUser} />{" "}
                                        <span> Classes</span>{" "}
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <ul>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/classes"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/classes">
                                                Class List
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/add-class"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/add-class">
                                                Add Class
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    className={`submenu ${
                                        pathnames.includes("/react/subjects")
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/add-subject"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/edit-subject"
                                              )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <a href="#">
                                        <FontAwesomeIcon icon={faBook} />{" "}
                                        <span> Subjects</span>{" "}
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <ul>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/subjects"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/subjects">
                                                Subject List
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/add-subject"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/add-subject">
                                                Subject Add
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    className={`submenu ${
                                        pathnames.includes("/react/grades")
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/add-grade"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/edit-grade"
                                              )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <a href="#">
                                        <FontAwesomeIcon
                                            icon={faGraduationCap}
                                        />{" "}
                                        <span> Grades </span>{" "}
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <ul>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/grades"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/grades">
                                                Grades List
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/add-grade"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/add-grade">
                                                Add Grade
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li
                                    className={`submenu ${
                                        pathnames.includes("/react/charges")
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/add-charge"
                                              )
                                            ? "active"
                                            : pathnames.includes(
                                                  "/react/edit-charge"
                                              )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <a href="#">
                                        <FontAwesomeIcon icon={faMoneyBill} />{" "}
                                        <span> Charges </span>{" "}
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <ul>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/charges"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/charges">
                                                Charges List
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                pathnames.includes(
                                                    "/react/add-charge"
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link to="/add-charge">
                                                Add Charge
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        );
    } else if (currentUser.accountType === ACCOUNT_TYPES.STUDENT) {
        return (
            <div className="sidebar" id="sidebar">
                <Scrollbars style={{ height: "100vh" }}>
                    <div className="sidebar-inner">
                        <div id="sidebar-menu" className="sidebar-menu">
                            <ul>
                                <li
                                    className={
                                        pathnames.includes(
                                            "/react/student-dashboard"
                                        )
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <Link to="/student-dashboard">
                                        <FontAwesomeIcon icon={faThLarge} />{" "}
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        );
    } else if (currentUser.accountType === ACCOUNT_TYPES.TEACHER) {
        return (
            <div className="sidebar" id="sidebar">
                <Scrollbars style={{ height: "100vh" }}>
                    <div className="sidebar-inner">
                        <div id="sidebar-menu" className="sidebar-menu">
                            <ul>
                                <li className="menu-title">
                                    <span>Management</span>
                                </li>

                                <li
                                    className={
                                        pathnames.includes(
                                            "/react/teacher-dashboard"
                                        )
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <Link to="/teacher-dashboard">
                                        <FontAwesomeIcon icon={faThLarge} />{" "}
                                        <span>Dashboard</span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        pathnames.includes(
                                            "/react/teacher-dashboard"
                                        )
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <Link
                                        to={
                                            "/view-schedule-teacher/" +
                                            currentUser.id
                                        }
                                    >
                                        <FontAwesomeIcon icon={faFile} />{" "}
                                        <span> Schedule</span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        pathnames.includes("/react/holiday")
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <Link to="/grades">
                                        <FontAwesomeIcon icon={faHockeyPuck} />{" "}
                                        <span>Note</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        );
    } else if (currentUser.accountType === ACCOUNT_TYPES.AGENT) {
        return (
            <div className="sidebar" id="sidebar">
                <Scrollbars style={{ height: "100vh" }}>
                    <div className="sidebar-inner">
                        <div id="sidebar-menu" className="sidebar-menu">
                            <ul>
                                <li className="menu-title">
                                    <span>Management</span>
                                </li>

                                <li
                                    className={
                                        pathnames.includes(
                                            "/react/teacher-dashboard"
                                        )
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <Link to="/teacher-dashboard">
                                        <FontAwesomeIcon icon={faThLarge} />{" "}
                                        <span>Dashboard</span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        pathnames.includes(
                                            "/react/teacher-dashboard"
                                        )
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <Link
                                        to={
                                            "/view-schedule-teacher/" +
                                            currentUser.id
                                        }
                                    >
                                        <FontAwesomeIcon icon={faFile} />{" "}
                                        <span> Schedule</span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        pathnames.includes("/react/holiday")
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <Link to="/grades">
                                        <FontAwesomeIcon icon={faHockeyPuck} />{" "}
                                        <span>Note</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

export default Sidebar;
