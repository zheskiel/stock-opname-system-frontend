import React, { Component } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

// Containers
import LayoutContainer from "../Layout";

// Components
import Link from "../../components/Link";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../assets/scss/calendar.scss";

const now = new Date();
const CustomEvent = ({ event }) => <>{event.custom}</>;
const myEventsList = [
  {
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    custom: "testing 14",
  },
  {
    title: "Testing 24",
    start: new Date(2023, 9, 28, 0, 0, 0),
    end: new Date(2023, 9, 28, 4, 30, 0),
    custom: <Link href={`templates`}>Templates</Link>,
  },
  {
    title: "testing 25",
    start: new Date(2023, 9, 6, 0, 0, 0),
    end: new Date(2023, 9, 6, 4, 30, 0),
    custom: <Link href={`forms`}>Forms</Link>,
  },
  {
    title: "Form 1-1 Details",
    custom: <Link href={`form/1/1/details`}>Form 1-1 Details</Link>,
    start: new Date(2023, 9, 6, 0, 0, 0),
    end: new Date(2023, 9, 6, 4, 30, 0),
    allDay: true,
  },
  {
    title: "Form 1-2 Details",
    custom: <Link href={`form/1/2/details`}>Form 1-2 Details</Link>,
    start: new Date(2023, 9, 6, 0, 0, 0),
    end: new Date(2023, 9, 6, 4, 30, 0),
    allDay: true,
  },
  {
    title: "Form 1-3 Details",
    custom: <Link href={`form/1/3/details`}>Form 1-3 Details</Link>,
    start: new Date(2023, 9, 6, 0, 0, 0),
    end: new Date(2023, 9, 6, 4, 30, 0),
    allDay: true,
  },
];

class DashboardContainer extends Component {
  render() {
    const localizer = momentLocalizer(moment);

    return (
      <LayoutContainer>
        <div className="main-content col-md-9 ms-sm-auto col-lg-10 px-md-4 pb-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">Dashboard Section</h2>
          </div>

          <div className="calendar-container">
            <Calendar
              components={{
                event: CustomEvent,
              }}
              localizer={localizer}
              events={myEventsList}
              showMultiDayTimes
              startAccessor="start"
              endAccessor="end"
              step={60}
            />
          </div>
        </div>
      </LayoutContainer>
    );
  }
}

export default DashboardContainer;
