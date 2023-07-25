import {instance, APIResponseType, ResultCodeForCapcthaEnum, ResultCodesEnum} from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    async me() {
        const res = await instance.get<APIResponseType<MeResponseDataType>>(`auth/me`);
        return res.data;
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        const res = await instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCapcthaEnum>>(`auth/login`, { email, password, rememberMe, captcha });
        return res.data;
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}
