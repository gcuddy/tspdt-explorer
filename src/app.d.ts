/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./core/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    username: string;
  };
  type DatabaseSessionAttributes = {};
}
