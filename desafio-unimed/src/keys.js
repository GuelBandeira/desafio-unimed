import md5 from "js-md5";
export const chave_secreta = "5c37d51e391373dc15abd4695a0d43dd22d28c90";
export const chave_publica = "3ce250dda0399d72a84f6f5a687bacbb";
export const ts = Number(new Date());

//Criptografando os elementos
export const hash = md5(ts + chave_secreta + chave_publica);
