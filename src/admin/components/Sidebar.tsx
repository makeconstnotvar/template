import React, {Component} from "react";
import {inject} from "mobx-react";
import {SidebarStore} from "../stores/SidebarStore";
import {ActiveLink} from "commons/components/ActiveLink";

interface ISidebar {
  className?: string,
  $sidebar?: SidebarStore,
}

@inject("$sidebar")
class Sidebar extends Component<ISidebar, any> {
  render() {
    const {$sidebar, className} = this.props;
    return (
      <aside className={`sidebar ${className}`}>
        {
          $sidebar.items.map((x, i) => {
            return (
              <div key={i}>
                <div className="sidebar-block-name"><i className="fas fa-circle mr-10"/>{x.group}</div>
                {
                  x.children.map((link, i) => link.isReact
                    ? <ActiveLink key={i} className="sidebar-item undecorate" to={link.link}>{link.name}</ActiveLink>
                    : <a key={i} className="sidebar-item undecorate" href={link.link}>{link.name}</a>)
                }
              </div>
            )
          })
        }
      </aside>
    )
  }
}

//@ts-ignore
Sidebar.defaultProps = {
  className: ""
}

export {Sidebar}