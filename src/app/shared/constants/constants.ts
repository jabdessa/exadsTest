export class Constants {
    // STATUS
    public static STATUS_ACTIVE: string = "Active";
    public static STATUS_INACTIVE: string = "Disabled";

    // regex VALIDATORS
    public static PATTERN_EMAIL: RegExp = /^\S+@\S+\.\S+$/;
    public static PATTERN_USERNAME: RegExp = /^[^\{\}\.\!\"\'\[\]]*$/;
}