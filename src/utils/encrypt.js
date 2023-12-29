import CryptoJS from "crypto-js";

export const encrypt_pw = (val) => CryptoJS.MD5(val).toString()