import {inject} from "mobx-react";

const HideOperatorBlock = inject("$reports")((props: any) => {
  return props.$reports.hideFilters.includes('operatorBlock') ? null : props.children;
})

export {HideOperatorBlock}