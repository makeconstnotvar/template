import {inject, observer} from "mobx-react";
import React, {Fragment, useEffect} from "react";
import {Progress} from "commons/components/Progress";
import {useForm} from "react-hook-form";
import cn from 'classnames';

const SettingsPage = inject("$settings")(observer(props => {
  const {$settings} = props;

  const {register, handleSubmit, errors} = useForm();

  useEffect(() => {
    $settings.fetchItems();
  }, [])

  const changeHandler = (param, value) => {
    param.value = value;
  }
  const test = (e) => {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/, '');
  }

  const saveHandler = async () => {
    props.$settings.saveItem();
  }

  return (
    <Fragment>
      <div className="filter-box">
        <div className="filter-title">Параметры</div>
      </div>
      {
        !$settings.noItems &&
        <form className={cn('base-table-box w-100 p-20', {hidden: $settings.fetchProgress})}
              onSubmit={handleSubmit(saveHandler)}>
          {
            $settings.items.map((group, i) => {
              return (
                <div className="mb-20" key={i}>
                  <div className="filter-title-mini mb-10">{group.groupName}</div>
                  {
                    group.items.map(param => {
                      return (
                        <div className=" mb-10 flex-row flex-vcenter" key={param.id}>
                          <label className="w300p mr-20">{param.name}</label>
                          <div className="input-group w200p">
                            <input className={cn('form-control', {'is-invalid': errors[param.code]})}
                                   defaultValue={param.value}
                                   ref={register({
                                     required: true,
                                     maxLength: 19
                                   })}
                                   onInput={test}
                                   onChange={e => changeHandler(param, e.currentTarget.value)}
                                   name={param.code}
                                   type="text" autoComplete="off"/>
                            <div className="input-group-append">
                              <div className="input-group-text w60p">{param.unit}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
          <div className="flex-row">
            <button type="submit" className="btn btn-success mr-10">Сохранить</button>
            {
              $settings.saveProgress &&
              <div className="flex-row flex-vcenter ml-10">
                <Progress isProgress={$settings.saveProgress}/>
              </div>
            }
            {
              $settings.fetchError &&
              <div className="alert alert-danger">Ошибка при получении параметров</div>
            }
            {
              $settings.saveError &&
              <div className="alert alert-danger">Ошибка при сохранении параметров</div>
            }
            {
              $settings.saveDone &&
              <div className="alert alert-success">Параметры сохранены</div>
            }
            {
              $settings.fetchDone && $settings.noItems &&
              <div className="alert alert-warning">По заданным критериям результатов не найдено</div>
            }
          </div>
        </form>
      }
    </Fragment>
  )
}))

export {SettingsPage}