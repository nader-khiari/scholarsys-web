import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import { history } from "../../src/_components/_helpers";
import { AgentLayoutRoute, LoginLayoutRoute } from "./routerLayout";

import {
  // Authentication Modules
  Login,
  Register,
  ForgotPassword,
  Error,

  // Dashboard Module
  Dashboard,
  StudentDashboard,
  TeacherDashboard,

  // Students Module
  StudentsList,
  AddStudent,
  EditStudent,
  StudentDetails,

  // Teachers Module
  TeachersList,
  AddTeacher,
  EditTeacher,
  TeacherDetails,

  // Formation Module
  AddFormation,
  EditFormation,
  FormationsList,

  //Levels Module
  AddLevel,
  EditLevel,
  LevelsList,

  //Classes Module
  AddClass,
  EditClass,
  ClassesList,

  // Subject Module
  AddSubject,
  EditSubject,
  SubjectsList,

  // Grade Module
  AddGrade,
  EditGrade,
  GradesList,

  // Charge Module
  AddCharge,
  EditCharge,
  ChargesList,

  // Accounts Module
  FeesCollections,
  Expenses,
  Salary,
  AddFeesCollections,
  AddExpenses,
  AddSalary,

  // Holiday Module
  Holiday,
  AddHoliday,

  // Fees Module
  Fees,
  AddFees,
  EditFees,

  // Exam Module
  Exam,
  AddExam,
  EditExam,

  // Time Table Module
  TimeTable,
  AddTimeTable,
  EditTimeTable,

  // Library Module
  Library,
  AddBook,
  EditBook,

  //Blank Page Module
  BlankPage,

  // Sports Module
  SportsList,
  AddSport,
  EditSport,

  // Hostel Module
  HostelList,
  AddRoom,
  EditRoom,

  // Transport Module
  TransportsList,
  AddTransport,
  EditTransport,

  // Components Module
  Components,

  // Forms Module
  FormBasicInput,
  FormHorizontal,
  FormInputGroups,
  FormMask,
  FormValidation,
  FormVertical,

  // Tables Module
  TablesBasic,
  DataTables,

  // Events Module
  Event,
  AddEvent,

  // Profile Module
  Profile,

  // Inbox Module
  Inbox,
  Compose,
} from "../pages";
import { Sidebar, Header, Footer } from "../_components";

import config from "config";
// CSS Files

class RouterComponent extends React.Component {
  render() {
    return (
      <Router basename={`${config.publicPath}`}>
        <Switch>
          {/* Login Layout */}
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/error" component={Error} />
        </Switch>

        <div className="main-wrapper">
          {/* <Sidebar/> */}
          <Route render={(props) => <Sidebar {...props} />} />
          <div>
            <Route render={(props) => <Header {...props} />} />

            <div className="page-wrapper">
              <div className="content container-fluid">
                <Switch>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route
                    path="/student-dashboard"
                    component={StudentDashboard}
                  />
                  <Route
                    path="/teacher-dashboard"
                    component={TeacherDashboard}
                  />

                  {/* Student Module */}
                  <Route path="/students" component={StudentsList} />
                  <Route path="/add-student" component={AddStudent} />
                  <Route path="/edit-student" component={EditStudent} />
                  <Route path="/student-details" component={StudentDetails} />

                  {/* Blank Page Module */}
                  <Route path="/blank-page" component={BlankPage} />

                  {/* Teacher Module */}
                  <Route path="/teachers" component={TeachersList} />
                  <Route path="/add-teacher" component={AddTeacher} />
                  <Route path="/edit-teacher" component={EditTeacher} />
                  <Route path="/teacher-details" component={TeacherDetails} />

                  {/* Formation Module */}
                  <Route path="/add-formation" component={AddFormation} />
                  <Route path="/edit-formation/:id" component={EditFormation} />
                  <Route path="/formations" component={FormationsList} />

                  {/* Level Module */}
                  <Route path="/add-level" component={AddLevel} />
                  <Route path="/edit-level/:id" component={EditLevel} />
                  <Route path="/levels" component={LevelsList} />

                  {/* Class Module */}
                  <Route path="/add-class" component={AddClass} />
                  <Route path="/edit-class/:id" component={EditClass} />
                  <Route path="/classes" component={ClassesList} />

                  {/* Subject Module */}
                  <Route path="/add-subject" component={AddSubject} />
                  <Route path="/edit-subject/:id" component={EditSubject} />
                  <Route path="/subjects" component={SubjectsList} />

                  {/* Grade Module */}
                  <Route path="/add-grade" component={AddGrade} />
                  <Route path="/edit-grade/:id" component={EditGrade} />
                  <Route path="/grades" component={GradesList} />

                  {/* Charge Module */}
                  <Route path="/add-charge" component={AddCharge} />
                  <Route path="/edit-charge/:id" component={EditCharge} />
                  <Route path="/charges" component={ChargesList} />

                  {/* Accounts Module */}
                  <Route path="/fees-collections" component={FeesCollections} />
                  <Route path="/expenses" component={Expenses} />
                  <Route path="/salary" component={Salary} />
                  <Route
                    path="/add-fees-collections"
                    component={AddFeesCollections}
                  />
                  <Route path="/add-expenses" component={AddExpenses} />
                  <Route path="/add-salary" component={AddSalary} />

                  {/* Holiday Module */}
                  <Route path="/holiday" component={Holiday} />
                  <Route path="/add-holiday" component={AddHoliday} />

                  {/* Fees Module */}
                  <Route path="/fees" component={Fees} />
                  <Route path="/add-fees" component={AddFees} />
                  <Route path="/edit-fees" component={EditFees} />

                  {/* Exam Module */}
                  <Route path="/exam" component={Exam} />
                  <Route path="/add-exam" component={AddExam} />
                  <Route path="/edit-exam" component={EditExam} />

                  {/* Time Table Module */}
                  <Route path="/time-table" component={TimeTable} />
                  <Route path="/add-time-table" component={AddTimeTable} />
                  <Route path="/edit-time-table" component={EditTimeTable} />

                  {/* Library Module */}
                  <Route path="/library" component={Library} />
                  <Route path="/add-book" component={AddBook} />
                  <Route path="/edit-book" component={EditBook} />

                  {/* Sports Module */}
                  <Route path="/sports" component={SportsList} />
                  <Route path="/add-sport" component={AddSport} />
                  <Route path="/edit-sport" component={EditSport} />

                  {/* Hostel Module */}
                  <Route path="/hostel" component={HostelList} />
                  <Route path="/add-room" component={AddRoom} />
                  <Route path="/edit-room" component={EditRoom} />

                  {/* Transport Module */}
                  <Route path="/transport" component={TransportsList} />
                  <Route path="/add-transport" component={AddTransport} />
                  <Route path="/edit-transport" component={EditTransport} />

                  {/* Components Module */}
                  <Route path="/components" component={Components} />

                  {/* Forms Module */}
                  <Route path="/form-basic-inputs" component={FormBasicInput} />
                  <Route path="/form-horizontal" component={FormHorizontal} />
                  <Route
                    path="/form-input-groups"
                    component={FormInputGroups}
                  />
                  <Route path="/form-mask" component={FormMask} />
                  <Route path="/form-validation" component={FormValidation} />
                  <Route path="/form-vertical" component={FormVertical} />

                  {/* Tables Module */}
                  <Route path="/tables-basic" component={TablesBasic} />
                  <Route path="/data-tables" component={DataTables} />

                  {/* Events Module */}
                  <Route path="/event" component={Event} />
                  <Route path="/add-event" component={AddEvent} />

                  {/* Profile Module */}
                  <Route path="/profile" component={Profile} />

                  {/* Inbox Module */}
                  <Route path="/inbox" component={Inbox} />
                  <Route path="/compose" component={Compose} />
                </Switch>
              </div>
              <Route render={(props) => <Footer {...props} />} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
export { RouterComponent };
