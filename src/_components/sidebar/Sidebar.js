import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import $ from "jquery";
import { history } from "../_helpers";
import { Link } from "react-router-dom";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    if ($("body").hasClass("mini-sidebar") && $("#toggle_btn").is(":visible")) {
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

  let pathnames = window.location.pathname.split("/");
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
                <li className={pathnames.includes("dashboard") ? "active" : ""}>
                  <Link to="/dashboard">
                    <FontAwesomeIcon icon={faThLarge} /> <span>Dashboard</span>
                  </Link>
                </li>
                <li
                  className={`submenu ${
                    pathnames.includes("students")
                      ? "active"
                      : pathnames.includes("student-details")
                      ? "active"
                      : pathnames.includes("add-student")
                      ? "active"
                      : pathnames.includes("edit-student")
                      ? "active"
                      : ""
                  }`}
                >
                  <a href="#">
                    <FontAwesomeIcon icon={faUserGraduate} />{" "}
                    <span> Students</span> <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li
                      className={pathnames.includes("students") ? "active" : ""}
                    >
                      <Link to="/students">Student List</Link>
                    </li>
                    {/* <li className={pathnames.includes('/student-details') ? 'active' : ''}>
										<Link to="/student-details">Student View</Link>
									</li> */}
                    <li
                      className={
                        pathnames.includes("add-student") ? "active" : ""
                      }
                    >
                      <Link to="/add-student">Student Add</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`submenu ${
                    pathnames.includes("teachers")
                      ? "active"
                      : pathnames.includes("teacher-details")
                      ? "active"
                      : pathnames.includes("add-teacher")
                      ? "active"
                      : pathnames.includes("edit-teacher")
                      ? "active"
                      : ""
                  }`}
                >
                  <a href="#">
                    <FontAwesomeIcon icon={faChalkboardTeacher} />{" "}
                    <span> Teachers</span> <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li
                      className={pathnames.includes("teachers") ? "active" : ""}
                    >
                      <Link to="/teachers">Teacher List</Link>
                    </li>

                    <li
                      className={
                        pathnames.includes("add-teacher") ? "active" : ""
                      }
                    >
                      <Link to="/add-teacher">Teacher Add</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`submenu ${
                    pathnames.includes("admins")
                      ? "active"
                      : pathnames.includes("admin-details")
                      ? "active"
                      : pathnames.includes("add-admin")
                      ? "active"
                      : pathnames.includes("edit-admin")
                      ? "active"
                      : ""
                  }`}
                >
                  <a href="#">
                    <FontAwesomeIcon icon={faChalkboardTeacher} />{" "}
                    <span>Staff</span> <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li
                      className={pathnames.includes("admins") ? "active" : ""}
                    >
                      <Link to="/admins">Staff List</Link>
                    </li>
                    <li
                      className={
                        pathnames.includes("add-admins") ? "active" : ""
                      }
                    >
                      <Link to="/add-admin">Staff Add</Link>
                    </li>
                  </ul>
                </li>

                <li
                  className={`submenu ${
                    pathnames.includes("schedules-list")
                      ? "active"
                      : pathnames.includes("admin-schedule")
                      ? "active"
                      : ""
                  }`}
                >
                  <a href="#">
                    <FontAwesomeIcon icon={faSchool} /> <span> Schedules</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li
                      className={
                        pathnames.includes("schedules-list") ? "active" : ""
                      }
                    >
                      <Link to="/schedules-list">Schedules List</Link>
                    </li>
                    <li
                      className={
                        pathnames.includes("add-schedule") ? "active" : ""
                      }
                    >
                      <Link to="/add-schedule">Schedule Add</Link>
                    </li>
                  </ul>
                </li>

                <li
                  className={`submenu ${
                    pathnames.includes("formations")
                      ? "active"
                      : pathnames.includes("add-formation")
                      ? "active"
                      : pathnames.includes("edit-formation")
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
                        pathnames.includes("formations") ? "active" : ""
                      }
                    >
                      <Link to="/formations">Formation List</Link>
                    </li>
                    <li
                      className={
                        pathnames.includes("add-formation") ? "active" : ""
                      }
                    >
                      <Link to="/add-formation">Formation Add</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`submenu ${
                    pathnames.includes("levels")
                      ? "active"
                      : pathnames.includes("add-level")
                      ? "active"
                      : pathnames.includes("edit-level")
                      ? "active"
                      : ""
                  }`}
                >
                  <a href="#">
                    <FontAwesomeIcon icon={faLevelUpAlt} />{" "}
                    <span> Levels </span> <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li
                      className={pathnames.includes("levels") ? "active" : ""}
                    >
                      <Link to="/levels">Levels List</Link>
                    </li>
                    <li
                      className={
                        pathnames.includes("add-level") ? "active" : ""
                      }
                    >
                      <Link to="/add-level">Add Level</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`submenu ${
                    pathnames.includes("classes")
                      ? "active"
                      : pathnames.includes("add-class")
                      ? "active"
                      : pathnames.includes("edit-class")
                      ? "active"
                      : ""
                  }`}
                >
                  <a href="#">
                    <FontAwesomeIcon icon={faUser} /> <span> Classes</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li
                      className={pathnames.includes("classes") ? "active" : ""}
                    >
                      <Link to="/classes">Class List</Link>
                    </li>
                    <li
                      className={
                        pathnames.includes("add-class") ? "active" : ""
                      }
                    >
                      <Link to="/add-class">Add Class</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`submenu ${
                    pathnames.includes("subjects")
                      ? "active"
                      : pathnames.includes("add-subject")
                      ? "active"
                      : pathnames.includes("edit-subject")
                      ? "active"
                      : ""
                  }`}
                >
                  <a href="#">
                    <FontAwesomeIcon icon={faBook} /> <span> Subjects</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li
                      className={pathnames.includes("subjects") ? "active" : ""}
                    >
                      <Link to="/subjects">Subject List</Link>
                    </li>
                    <li
                      className={
                        pathnames.includes("add-subject") ? "active" : ""
                      }
                    >
                      <Link to="/add-subject">Subject Add</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`submenu ${
                    pathnames.includes("grades")
                      ? "active"
                      : pathnames.includes("add-grade")
                      ? "active"
                      : pathnames.includes("edit-grade")
                      ? "active"
                      : ""
                  }`}
                >
                  <a href="#">
                    <FontAwesomeIcon icon={faGraduationCap} />{" "}
                    <span> Grades </span> <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li
                      className={pathnames.includes("grades") ? "active" : ""}
                    >
                      <Link to="/grades">Grades List</Link>
                    </li>
                    <li
                      className={
                        pathnames.includes("add-grade") ? "active" : ""
                      }
                    >
                      <Link to="/add-grade">Add Grade</Link>
                    </li>
                  </ul>
                </li>

                <li
                  className={`submenu ${
                    pathnames.includes("charges")
                      ? "active"
                      : pathnames.includes("add-charge")
                      ? "active"
                      : pathnames.includes("edit-charge")
                      ? "active"
                      : ""
                  }`}
                >
                  <a href="#">
                    <FontAwesomeIcon icon={faMoneyBill} />{" "}
                    <span> Charges </span> <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li
                      className={pathnames.includes("charges") ? "active" : ""}
                    >
                      <Link to="/charges">Charges List</Link>
                    </li>
                    <li
                      className={
                        pathnames.includes("add-charge") ? "active" : ""
                      }
                    >
                      <Link to="/add-charge">Add Charge</Link>
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
                    pathnames.includes("student-dashboard") ||
                    pathnames.includes("dashboard")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/dashboard">
                    <FontAwesomeIcon icon={faThLarge} /> <span>Dashboard</span>
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
                    pathnames.includes("teacher-dashboard") ||
                    pathnames.includes("dashboard")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/teacher-dashboard">
                    <FontAwesomeIcon icon={faThLarge} /> <span>Dashboard</span>
                  </Link>
                </li>

                <li
                  className={
                    pathnames.includes("view-schedule-teacher") ? "active" : ""
                  }
                >
                  <Link to={"/view-schedule-teacher/" + currentUser.id}>
                    <FontAwesomeIcon icon={faFile} /> <span> Schedule</span>
                  </Link>
                </li>

                <li className={pathnames.includes("grades") ? "active" : ""}>
                  <Link to="/grades">
                    <FontAwesomeIcon icon={faHockeyPuck} /> <span>Note</span>
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
                    pathnames.includes("teacher-dashboard") ||
                    pathnames.includes("dashboard")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/dashboard">
                    <FontAwesomeIcon icon={faThLarge} /> <span>Dashboard</span>
                  </Link>
                </li>

                <li
                  className={
                    pathnames.includes("iew-schedule-teacher") ? "active" : ""
                  }
                >
                  <Link to={"/view-schedule-teacher/" + currentUser.id}>
                    <FontAwesomeIcon icon={faFile} /> <span> Schedule</span>
                  </Link>
                </li>

                <li className={pathnames.includes("holiday") ? "active" : ""}>
                  <Link to="/grades">
                    <FontAwesomeIcon icon={faHockeyPuck} /> <span>Note</span>
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
