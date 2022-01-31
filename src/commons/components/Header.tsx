import * as React from 'react';
import {Component} from 'react';
import {Link} from '@reach/router';
import {inject, observer} from 'mobx-react';
import {UserStore} from 'commons/stores/UserStore';
import {makeFrom} from '../../utils/url';

interface IHeaderProps {
  title: string;
  homeUrl: string;
  external?: boolean;
  $user?: UserStore;
}

@inject('$user')
@observer
class Header extends Component<IHeaderProps> {

  componentDidMount() {
    const {$user} = this.props;
    $user.fetchItem()
  }

  render() {
    const {$user, title, homeUrl, external} = this.props;
    return (
      <div className="header flex-row flex-middle">
        <div className="header-bort"/>
        <div className="header-title">{title}</div>
        <div className="header-bort"/>
        <div className="header-version">{process.env.APP_VERSION}</div>
        <div className="flex-row flex-right flex-vcenter">
          {
            $user.shortName &&
            <div className="header-circle mr-10">{$user.shortName}</div>
          }
          <div className="header-fullname">{$user.fullName}</div>
          <div className="header-bort"/>
          <Link className="header-exit" to={`/logout?from=${makeFrom()}`}>Выход</Link>
        </div>
      </div>
    );
  }
}

export {Header};
