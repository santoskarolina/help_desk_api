export function generateCode(): string{
    const chars ='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ';
    const codeLength = 6;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      code += chars.substring(randomNumber, randomNumber + 1);
    }
    return code;
}
