import "./Table.css";
import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";

export default function Table({ headers, rows }) {
  console.log("HEADERS:::");
  console.log(headers);
  console.log("ROWS:::");
  console.log(rows);
  return (
    <table className="users-table">
      <TableHeader headers={headers} />
      <TableBody headers={headers} rows={rows} />
    </table>
  );
}
