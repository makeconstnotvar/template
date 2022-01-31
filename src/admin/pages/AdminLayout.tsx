import React from "react";
import {Sidebar} from "admin/components/Sidebar";
import {Header} from "commons/components/Header";
import {Modal} from "commons/components/Modal";
import {inject, observer} from "mobx-react";

const AdminLayout = inject("$user")(observer(props => {
  const {$user} = props;

  return (
    <div className="with-header">
      <Header title="Админка" homeUrl="/admin" external/>
      {
        $user.fetchDone &&
        <div className="flex-row">
          <Sidebar className="flex-unshrink"/>
            <div className="content-view">
              {props.children}
            </div>
        </div>
        }
        <Modal/>
      </div>
    )
  }
))
export {AdminLayout}
