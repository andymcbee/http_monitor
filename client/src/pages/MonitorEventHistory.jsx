import "./HomePage.css";
import Table from "../components/Table/Table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMonitorEvents } from "../service/fetchMonitorEvents";

export default function MonitorEventHistory() {
  const [monitorEvents, setMonitorEvents] = useState([]);

  const { monitorId } = useParams();

  console.log(monitorId);

  useEffect(() => {
    (async function () {
      const allMonitorEvents = await fetchMonitorEvents(monitorId);
      console.log("MONITOR EVENTS");
      console.log(allMonitorEvents);
      const monitorEvents = allMonitorEvents.map((item) => {
        return {
          ...item,
          id: item.monitor_event_id,
        };
      });

      console.log(monitorEvents);

      setMonitorEvents(monitorEvents);
    })();
  }, []);

  const headers = [
    { columnTitle: "Status Code", columnDataMap: "httpstatus" },
    { columnTitle: "Status", columnDataMap: "httpstatustext" },
    { columnTitle: "response Time", columnDataMap: "responsetimems" },
    { columnTitle: "Created At", columnDataMap: "created_at" },
  ];

  return (
    <>
      <div className="homePageContainer">
        <div className="pageTitle">Title</div>
        <div className="homePageContentContainer">
          <Table headers={headers} rows={monitorEvents} />
        </div>
      </div>
    </>
  );
}
