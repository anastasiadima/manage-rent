import { handleResponse } from "../helpers/handle-response";
import * as config from "../helpers/api-config";
import { authHeader } from "../helpers/auth-header";
import { userService } from "../services/user.service";
export const invitationService = {
  getAll,
  create,
  changeStatus
};

function getAll() {
  const options = {
    method: "GET",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json"
    }
  };
  return fetch(`${config.getApiUrl()}/invitation`, options).then(
    handleResponse
  );
}

function create(invitation) {
  let userModel = userService.getAuthenticatedUser();
  let user = JSON.parse(userModel);
  invitation.senderId = user.id;
  invitation.senderEmail = user.email;

  const options = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(invitation)
  };

  return fetch(`${config.getApiUrl()}/invitation/create`, options).then(
    handleResponse
  );
}

function changeStatus(invitation){
  const options = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(invitation)
  };

  return fetch(`${config.getApiUrl()}/invitation/changeStatus`, options).then(
    handleResponse
  );
}
