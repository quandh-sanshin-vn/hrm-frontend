export class Leave {
  constructor(
    public id?: string,
    public employee_name?: string,
    public description?: string,
    public salary?: string,
    public created_at?: string,
    public status?: string,
    public day_leaves?: string,
    public approver_name?: string,
    public shift?: string,
    public other_info?: string,
    public image?: string,
    public phone?: string,
    public user_id?: string,
    public time_off_hours?: string,
    public can_request?: string,
    public updated_at?: string
  ) {}
}
