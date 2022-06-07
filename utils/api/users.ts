import {
  CreateUserDto,
  LoginDto,
  PostItem,
  ResponseUser,
  ResponseUserUpdate,
} from "./types";
import { AxiosInstance } from "axios";

type updateUserDto = {
  fullName: string;
  email: string;
};
export const UserApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<ResponseUser[]>("/users");
    return data;
  },
  async register(dto: CreateUserDto) {
    const { data } = await instance.post<CreateUserDto, { data: ResponseUser }>(
      "/auth/register",
      dto
    );
    return data;
  },
  async login(dto: LoginDto) {
    const { data } = await instance.post<LoginDto, { data: ResponseUser }>(
      "/auth/login",
      dto
    );
    return data;
  },
  async getMe() {
    const { data } = await instance.get<ResponseUser>("/users/me");
    return data;
  },
  async update(dto: updateUserDto) {
    const { data } = await instance.patch<
      updateUserDto,
      { data: ResponseUserUpdate }
    >(`/users/me`, dto);
    return data;
  },
});
