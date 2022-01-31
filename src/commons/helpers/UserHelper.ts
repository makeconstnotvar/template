import {TUser, ENonStaticUiElementType} from './model';

export default {
  isAvailableUiElementForGroup(
    user: TUser,
    element: ENonStaticUiElementType,
    isSecondLine: boolean,
    executorGroupId: string
  ): boolean {
    const group = user.ttsUserGroup.find(g => g.id === executorGroupId);
    if (!group) false;
    return isSecondLine
      ? group.nonStaticUiElementsFor2ndLine?.includes(element) || false
      : group.nonStaticUiElements?.includes(element) || false;
  }
};
