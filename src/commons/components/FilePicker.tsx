import React, {Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {Progress} from 'commons/components/Progress';

interface IFilePicker {
  isMultiple: boolean
  onChange?: (value: any[]) => void
  children?: React.ReactNode,
  files?: any[],
  $attachments?: any
}

const getFileExtension = fileName => {
  const parts = fileName.split('.');
  if (parts.length > 1) {
    return parts.pop();
  }

  return 'unknown';
};

const FilePicker = inject('$attachments')(observer((props: IFilePicker) => {
  const {isMultiple, children, $attachments} = props;
  const attachments = $attachments.items;

  const handleChange = ({target}) => {
    [...target.files].forEach(file => {
      $attachments.saveItem(file);
    });
  };

  const removeFile = index => {
    $attachments.removeItem(index);
  };

  return (
    <Fragment>
      {attachments.map((item, index) =>
        <div key={item.file.name} className="flex-row mb-10">
          <div className="flex-row flex-middle">
            <span className="badge badge_xs badge_black mr-10">{getFileExtension(item.file.name)}</span>
            <a className="link">{item.file.name}</a>
            {item.saveDone
              ? <i className="fas fa-check attachments-icon-success ml-10"/>
              : <Progress className="ml-10 attachments-progress" isProgress/>}
            <i onClick={() => removeFile(index)} className="fas fa-times pointer ml-10"/>
          </div>
        </div>
      )}
      <label htmlFor="file">
        {children ||
          <span className="btn btn-light">
            <i className="fas fa-plus-square mr-5"/>
            Добавить
          </span>
        }
        <input style={{display: 'none'}}
               onChange={handleChange}
               id="file"
               type="file"
               name="file"
               multiple={isMultiple}
        />
      </label>
    </Fragment>
  );
}));

export {FilePicker};
