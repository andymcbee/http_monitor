import "./HomePage.css";
import Table from "../components/Table/Table";
import React, { useEffect, useState } from "react";
import { fetchMonitors } from "../service/fetchMonitors";
import BasicButton from "../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";

export default function HomePage({ user }) {
  const navigate = useNavigate();

  const { accountId } = user;

  const [monitors, setMonitors] = useState([]);

  useEffect(() => {
    (async function () {
      const myMonitors = await fetchMonitors(accountId);

      console.log(myMonitors);

      const myMap = myMonitors.map((item) => {
        return (item = {
          ...item,
          tableActionButton: (
            <BasicButton
              buttonText="View History"
              handleClick={() => handleViewHistoryClick(item.id)}
            />
          ),
        });
      });

      console.log(myMap);

      setMonitors(myMap);

      console.log(myMap);
    })();
  }, []);

  const handleViewHistoryClick = (monitorId) => {
    console.log(monitorId);
    navigate(`/monitor-history/${monitorId}`);
  };

  const headers = [
    { columnTitle: "Website", columnDataMap: "domain_name" },
    { columnTitle: "Status Code", columnDataMap: "httpstatus" },
    { columnTitle: "Status", columnDataMap: "httpstatustext" },
    { columnTitle: "Response Time", columnDataMap: "responsetimems" },
    { columnTitle: "Action", columnDataMap: "tableActionButton" },
  ];

  return (
    <>
      <div className="homePageContainer">
        <div className="pageTitle">Title</div>
        <div className="homePageContentContainer">
          <Table headers={headers} rows={monitors} />
        </div>
      </div>
    </>
  );
}
