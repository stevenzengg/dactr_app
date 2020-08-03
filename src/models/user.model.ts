//Creates a model for current user
export class User {
    private static email: string;
    private static password: string;
    private static firstName: string;
    private static lastName: string;

    static setEmail(email)
    {
        this.email  = email;
    }

    static setFirstName(firstName)
    {
        this.firstName = firstName;
    }

    static setPassword(password)
    {
        this.password = password;
    }

    static setLastName(lastName)
    {
        this.lastName = lastName;
    }

    static getEmail()
    {
        return this.email;
    }

    static getFirstName()
    {
        return this.firstName;
    }

    static getLastName()
    {
        return this.lastName;
    }

    static getPassword()
    {
        return this.password;
    }

}