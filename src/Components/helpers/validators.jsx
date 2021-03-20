export function isRequired(value) {
    return !!value ? undefined : "This field is required";
}

export function minLength(length) {
    return function(value) {
        return value.length >= length ? undefined : `This field must be at least ${length} characters`;
    }
}

export function maxLength(length) {
    return function(value) {
        return value.length <= length ? undefined : `The field must be less than ${length} characters`;
    }
}

export function emailValidation(email) {
    if ( email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ) {
        return undefined;
    }

    return 'Please enter a valid email';
}

export function formValid(formData) {
    for (let key in formData) {
        if (typeof formData[key] === "object" && !formData[key].valid)
            return false;
    }
    return true;

}