import { Role, Step, Access } from "./workflow-types"

export class HandbagData {
    public static Roles : Role[]=[]

    static Data(): Role[] {
        this.Roles.push(new Role("Action Approver", [new Step("SUBMITTED", Access.Read), new Step("ASSIGNED", Access.Write), new Step("CLOSED", Access.Read), new Step("CANCELLED", Access.Write), new Step("FINALREVIEW", Access.Read)] ))
        this.Roles.push(new Role("Event Actionee", [new Step("SUBMITTED", Access.None), new Step("ASSIGNED", Access.Read), new Step("CLOSED", Access.None), new Step("CANCELLED", Access.Read), new Step("FINALREVIEW", Access.None)] ))
        this.Roles.push(new Role("Event Approver", [new Step("SUBMITTED", Access.Write), new Step("ASSIGNED", Access.None), new Step("CLOSED", Access.Write), new Step("CANCELLED", Access.None), new Step("FINALREVIEW", Access.Write)] ))
        this.Roles.push(new Role("Event Reader", [new Step("SUBMITTED", Access.Read), new Step("ASSIGNED", Access.None), new Step("CLOSED", Access.None), new Step("CANCELLED", Access.Read), new Step("FINALREVIEW", Access.Read)] ))
        this.Roles.push(new Role("Event Report Manager", [new Step("SUBMITTED", Access.None), new Step("ASSIGNED", Access.Write), new Step("CLOSED", Access.None), new Step("CANCELLED", Access.Write), new Step("FINALREVIEW", Access.Read)] ))
        this.Roles.push(new Role("Injury Manager", [new Step("SUBMITTED", Access.Write), new Step("ASSIGNED", Access.None), new Step("CLOSED", Access.Write), new Step("CANCELLED", Access.None), new Step("FINALREVIEW", Access.Write)] ))
        this.Roles.push(new Role("Investigation Manager", [new Step("SUBMITTED", Access.Read), new Step("ASSIGNED", Access.Write), new Step("CLOSED", Access.Read), new Step("CANCELLED", Access.Write), new Step("FINALREVIEW", Access.Read)] ))
        this.Roles.push(new Role("Moderator", [new Step("SUBMITTED", Access.Write), new Step("ASSIGNED", Access.Read), new Step("CLOSED", Access.Write), new Step("CANCELLED", Access.Read), new Step("FINALREVIEW", Access.None)] ))
        this.Roles.push(new Role("Submitter", [new Step("SUBMITTED", Access.Write), new Step("ASSIGNED", Access.None), new Step("CLOSED", Access.Write), new Step("CANCELLED", Access.None), new Step("FINALREVIEW", Access.Write)] ))

        return this.Roles
    }
}