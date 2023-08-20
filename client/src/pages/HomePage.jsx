import "./HomePage.css";
import Table from "../components/Table/Table";

export default function HomePage() {
  const monitors = [
    {
      website: "Google",
      url: "https://google.com/",
      statusCode: "200",
      responseTime: "210ms",
      statusText: "OK",
      id: "1",
    },
    {
      website: "Google",
      url: "https://google.com/",
      statusCode: "200",
      responseTime: "220ms",
      statusText: "OK",
      id: "2",
    },
    {
      website: "Google",
      url: "https://google.com/",
      statusCode: "200",
      responseTime: "230ms",
      statusText: "OK",
      id: "3",
    },
    {
      website: "Google",
      url: "https://google.com/",
      statusCode: "200",
      responseTime: "250ms",
      statusText: "OK",
      id: "4",
    },
  ];

  /* const headers = [
    { title: "Website", dataMap: "website" },
    { title: "Uptime", dataMap: "website" },
    { title: "Status Code", dataMap: "website" },
    { title: "Status", dataMap: "website" },
    { title: "Uptime", dataMap: "website" },
  ]; */

  const headers = [
    { columnTitle: "Website", columnDataMap: "url" },
    { columnTitle: "Status Code", columnDataMap: "statusCode" },
    { columnTitle: "Status", columnDataMap: "statusText" },
    { columnTitle: "response Time", columnDataMap: "responseTime" },
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
