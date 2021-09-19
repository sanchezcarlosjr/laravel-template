import state from "../../../store/store";

export const userIdInjector = async (model: any) => {model['id'] = state.user.id};
