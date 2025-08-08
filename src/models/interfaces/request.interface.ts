import { FilterOperatorsEnum } from 'models/enums';

export interface IFilterValues {
  acu_customer_id?: string;
  crm_id?: string;
  acu_name?: string;
  acu_user_id?: string;
  CustomerID?: string;
  AttributeID?: string;
  ins_owner_id?: string | number;
  acu_employee_id?: string | number;
  ins_salesperson_id?: string | number;
}

export interface ITableFilter {
  field: string;
  operator: FilterOperatorsEnum;
  value: string;
}
