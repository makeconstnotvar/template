import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Modal} from "commons/components/Modal";
import {Header} from "commons/components/Header";
import {Progress} from "commons/components/Progress";

const Layout = inject("$reports")(observer(props => {
  const {$reports} = props;

  useEffect(() => {
    $reports.fetchItems();
  }, []);

  return (
    <div className="with-header">
      <Header title="Отчёты" homeUrl="/reports"/>
      {
        $reports.fetchDone && !$reports.noItems
          ? props.children
          : <div className="layout-reports">
            <div className="reports-sidebar"/>
            <div className="content-view">
              <Progress text="Отчеты загружаются..." isProgress={$reports.fetchProgress}/>
              {
                $reports.fetchError &&
                <div className="alert alert-danger">
                  Ошибка при получении списка отчетов
                </div>
              }
              {
                $reports.fetchDone && $reports.noItems &&
                <div className="alert alert-warning">
                  Вам не доступно ни одного отчета
                </div>
              }
            </div>
          </div>
      }
      <Modal/>
    </div>
  )
}))
export {Layout}