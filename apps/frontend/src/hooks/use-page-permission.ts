import { Permission, usePermissions } from "@/providers/permissions-provider";
import { useResourceId } from "@/providers/resource-provider";
import { PermissionLevel, ResourceId } from "@/types/resources";

export function usePagePermission(): PermissionLevel {
  const permissions = usePermissions()?.permissions;
  const resourceId = useResourceId()?.resourceId;

  // Helper function to get permission level
  const getPermissionLevel = (
    permissions: Permission[],
    resourceId: ResourceId,
  ): PermissionLevel => {
    const currentPermission = permissions.find(
      (permission) => permission.resourceName === resourceId,
    );
    return currentPermission?.permission ?? "NONE";
  };

  return getPermissionLevel(permissions, resourceId);
}
