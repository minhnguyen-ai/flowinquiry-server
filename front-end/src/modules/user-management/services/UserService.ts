import http from "../../../http-commons";
import IUserData from "../types/IUserData";
import Any = jasmine.Any;

const findAll = () => {
    return http.get<Array<IUserData>>("api/tenants/users");
}

const findByEmail =(email:Any) => {
    return http.get<IUserData>(`api/tenants/users/${email}`);
}

const UserService = {
    findAll,
    findByEmail
}
export default UserService;