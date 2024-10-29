const dashboardUrl = "/dashboard";

export const authRoutes = {
  USERS: `${dashboardUrl}/users`,
};

const authUrl = "/member";

export const routes = {
  LOGIN: `${authUrl}/login`,
  VERIFY: `${authUrl}/login/verify`,
};

export const authorizedApiRoutes = {
  INFO: `${authUrl}/info`,
  MEMBERS: `/members`,
};
