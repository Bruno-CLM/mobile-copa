//Tipagem global para rotas da aplicação

export declare global {
  namespace ReactNavigation{
    interface RootParamList{
      new: undefined;
      poll: undefined;
      find: undefined;
      details: {
        id: string;
      }
    }
  }
}