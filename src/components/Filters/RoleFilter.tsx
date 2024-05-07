import { useState } from "react";
import { Role, roles } from "../../lib/constants";
import GenericSelect, { GenericOption } from "../shared/GenericSelect";
import { useDispatch } from "react-redux";
import { setSelectedRoles } from "../../redux/slices/filterSlice";
import { UnknownAction } from "@reduxjs/toolkit";

const RoleFilter = (): JSX.Element => {
  const dispatch = useDispatch();
  const [selectedRoles, setSelectedRolesState] = useState<Role[]>([]);

  const handleChange = (value: Role[]) => {
    setSelectedRolesState(value);
    dispatch(setSelectedRoles(value) as unknown as UnknownAction);
  };

  return (
    <GenericSelect
      options={roles}
      placeholder="Select Roles"
      value={selectedRoles}
      onChange={handleChange as (value: GenericOption[]) => void}
    />
  );
};

export default RoleFilter;
