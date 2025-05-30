export const isValidEmail = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
};

export const isValidPassword = (input) => {
    const regex = /.{6,}/;
    return regex.test(input);
};
