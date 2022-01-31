import React from "react";

const GenericList = (props: any) => {
  let {headers = {}, items = []} = props;
  let item = items && items.length > 0 ? items[0] : []
  return (
    <div className="base-table-box">
      <table className="base-table">
        <tbody>
        {
          Object.keys(headers).map(key => (
            <tr key={key}>
              <td>{headers[key]}</td>
              <td align="right">{item[key]}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}

export {GenericList}