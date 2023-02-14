function path(root: string, sublink: string) {
   return `${root}${sublink}`;
}

const ROOTS_APP = '/';

export const PATH_AUTH = {
   root: ROOTS_APP,
   login: path(ROOTS_APP, 'login'),
   register: path(ROOTS_APP, 'register'),
};

export const PATH_APP = {
   root: ROOTS_APP,
};
