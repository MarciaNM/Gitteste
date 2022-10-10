import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

(async () => {
  const password = '123456';
  const passwordHash = await bcrypt.hash(password, 12);

  //const userLogginPassword = '123457'; //desabilitado para teste aula 58

  const passwordIsValid = await bcrypt.compare(
    //userLogginPassword, // desabilitado para teste aula 58
    passwordHash,
  );

  // console.log(passwordIsValid);
})();

(async () => {
  const JWT_SECRET = 'O_MEU_SECRET';

  let token = jwt.sign({ userId: '123' }, JWT_SECRET, {
    expiresIn: '7d',
  });

  const delay = () => new Promise((r) => setTimeout(r, 1000));
  await delay();

  const tokenData = jwt.verify(token, JWT_SECRET);

  console.log(tokenData);
})();
