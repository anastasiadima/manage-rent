import { handleResponse } from "../helpers/handle-response";
import * as config from "../helpers/api-config";
import { authHeader } from "../helpers/auth-header";
import { userService } from "../services/user.service";
export const invitationService = {
  getAll,
  create,
  approveInvitation,
  cancelInvitation,
  delete: _delete
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

function approveInvitation(id){
  const options = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" }
  };

  return fetch(`${config.getApiUrl()}/invitation/approve/${id}`, options).then(
    handleResponse
  );
}
function cancelInvitation(id){
  const options = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" }
    };

  return fetch(`${config.getApiUrl()}/invitation/cancel/${id}`, options).then(
    handleResponse
  );
}

function _delete(id){
  const options = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return fetch(`${config.getApiUrl()}/invitation/${id}`, options).then(
    handleResponse
  );
}
