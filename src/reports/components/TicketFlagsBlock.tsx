import React, {Component, Fragment} from "react";
import {inject, observer} from "mobx-react";

@inject("$ticketFlags")
@observer
class TicketFlagsBlock extends Component<any, any> {
  async componentDidMount() {
    const {$ticketFlags, hasGoodsCompensation, hasSorryCompensation, hasNps, hasSpyClub, hasBlackList, hasChatBot, hasLoyaltyExecutor} = this.props;
    $ticketFlags.setSelectedValues({hasGoodsCompensation, hasSorryCompensation, hasNps, hasSpyClub, hasChatBot, hasBlackList, hasLoyaltyExecutor});
  }

  onChangeHandler = (item: Record<string, any>) => {
    const {$ticketFlags, onUpdateState} = this.props;
    item.value = !item.value
    onUpdateState($ticketFlags.selectedValues);
  };

  render() {
    const {$ticketFlags} = this.props;

    return (
      <Fragment>
        {
          $ticketFlags.items.map(item => (
            this.props[item.visibleCode] && <label key={item.code} className="nice-checkbox mr-20">
              <input type="checkbox"
                     checked={item.value}
                     onChange={() => this.onChangeHandler(item)}
                     color="primary"/>
              <span className="nice-checkbox-icon"/>
              {item.label}
            </label>
          ))
        }
      </Fragment>
    )
  }
}

export {TicketFlagsBlock};