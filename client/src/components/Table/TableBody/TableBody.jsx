import "./TableBody.css";

export default function TableBody({ headers, rows }) {
  return (
    <tbody>
      {rows.map((item) => {
        return (
          <tr key={item.id}>
            {headers.map((header) => {
              return (
                <td key={header.columnDataMap} className="users-table-cell">
                  {item[header.columnDataMap]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
