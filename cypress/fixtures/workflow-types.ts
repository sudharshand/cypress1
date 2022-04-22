export class Role {
    constructor(name : string, steps: Step[]) {
        this.Name = name
        this.Steps = steps
    }
    public Name: string
    public Steps: Step[]
} 

export class Step {
    constructor(name : string, access: Access) {
        this.Name = name
        this.Access = access
    }
    public Name: string
    public Access: Access
} 

export enum Access {
    Read,
    Write,
    None
}