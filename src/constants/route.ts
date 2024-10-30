const dashboardUrl = "/dashboard";

export const authRoutes = {
  MEMBERS: `${dashboardUrl}/members`,
};

const authUrl = "/member";

export const routes = {
  LOGIN: `${authUrl}/login`,
  VERIFY: `${authUrl}/login/verify`,
};

export const authorizedApiRoutes = {
  MEMBERS: `/member`,
};
