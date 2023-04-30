export enum roles {
  admin = "ADMIN",
  user = "USER",
  owner = "OWNER",
  viewer = "VIEWER",
}

enum resources {
  posts = "POSTS",
  // comments = "COMMENTS",
  // todos = "TODOS",
}

enum permissions {
  create = "CREATE",
  read = "READ",
  update = "UPDATE",
  delete = "DELETE",
}

const adminPermissionsStructs = {
  resources: [resources.posts],
  permissions: [permissions.read, permissions.delete],
};

export let adminPermissions: string[] = [];
for (const r of adminPermissionsStructs.resources) {
  for (const p of adminPermissionsStructs.permissions) {
    adminPermissions.push(`${r}:${p}`);
  }
}
