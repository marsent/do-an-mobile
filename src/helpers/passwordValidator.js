export function passwordValidator(password) {
    if (!password) return "Vui lòng nhập mật khẩu";
    if (password.length < 5) return 'Tài khoản hoặc mật khẩu sai';
    return '';
}