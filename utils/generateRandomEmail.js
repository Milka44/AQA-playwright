export default function generateRandomEmail() {
    const emailPrefix = 'aqa-neotest';
    const emailName = Math.floor(Math.random() * 1e6);
    const emailDomain = '@gm.com';

    return `${emailPrefix}${emailName}${emailDomain}`;
}