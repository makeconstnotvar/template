import React from "react";
import isNumber from 'lodash/isNumber';

const GenericTable = (props: any) => {
  const {headers = {}, items = [], cellTransform, className = "", generalInfo, generalInfoHeaders} = props;
  return (
    <>
    {
      generalInfo && generalInfoHeaders &&
        <div className="general-info">
          <div>
            {
              Object.keys(generalInfoHeaders).map(key =>
                <div key={key} className="general-info-name">{generalInfoHeaders[key]}</div>)
             }
          </div>
          <div>
            {
              Object.keys(generalInfo).map(key =>
                <div key={key} className="general-info-value">{generalInfo[key]}</div>)
            }
          </div>
        </div>
    }
    <div className={`base-table-box ${className}`}>
      <table className="base-table">
        <thead>
        <tr>
          {
            Object.keys(headers).map(key => <th key={key}>{headers[key]}</th>)
          }
        </tr>
        </thead>
        <tbody>
        {
          items.map((item, i) => (
            <tr key={i}>
              {
                Object.keys(headers).map(key => {
                  let val = item[key];
                  return <td key={key} className={isNumber(val) ? "right" : ""} dangerouslySetInnerHTML={{__html: cellTransform(val, key)}}/>;
                })
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  )
}

export {GenericTable}