// aula 37 criado arquivo dataloaders e retirado do resolvers.post o userDataloarder e colocado neste arquivo
import DataLoader from 'dataloader';

export const makeUserDataLoader = (getUsers) => { // aula 37 inserido a função
  return new DataLoader(async (ids) => { // // aula 36 userDataloader
    const urlQuery = ids.join('&id='); //criando url com os id na ordem
    const response = await getUsers('?id=' + urlQuery);
    const users = await response.json();
    return ids.map((id) => users.find((user) => user.id == id));
  });
};

