import "./TableHeader.css";

export default function TableHeader({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header.columnTitle} className="users-table-cell">
            {header.columnTitle}
          </th>
        ))}
      </tr>
    </thead>
  );
}
