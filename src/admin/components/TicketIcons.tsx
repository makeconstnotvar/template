import React from 'react';

const TicketIcons = (props) => {
  const {task} = props;

  return (
    <div className="flex-row flex-vcenter">
      {
        task.ticket.appealCount &&
        <i title="Повторное обращение" className="fas fa-fire-alt ml-6 table_icon accelerated-icon"/>
      }
      {
        task.blacklisted &&
        <i title="Черный список" className="fas fa-mask ml-6 table_icon"/>
      }
      {
        task.ticket.isSpyClub &&
        <i title="Шпионский клуб" className="fas fa-user-secret ml-6 table_icon secret-icon"/>
      }
      {
        task.ticket.isNps &&
        <span className="badge ticket-nps ml-6">NPS</span>
      }
      {
        !!task.externalSystemCode &&
        <span className="badge ticket-ext ml-6">EXT</span>
      }
    </div>
  );
};

export {TicketIcons};
