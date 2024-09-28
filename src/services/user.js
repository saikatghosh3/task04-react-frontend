import { protectedClient } from "../lib/http"

export const  getAllusers = async (page=1, limit=10)=> {
     return await protectedClient.get(`/users?page=${page}&limit=${limit}`);
}

export const updateUsersStatus = async (userIds, status)=> {
     await protectedClient.patch("/users/status", { userIds, status }, {
     headers: {
          "Content-Type": "application/json"
     }
     });
}

export const deleteusers = async (userIds)=> {
     await protectedClient.delete("/users", { headers: {
          "Content-Type": "application/json"
        },
        data: {userIds}});
}

