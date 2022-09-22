export function serverMethod(target: any, name: string, descriptor: PropertyDescriptor) {

    const method = descriptor.value; // references the method being decorated
    debugger
    descriptor.value = function (...args) {
        debugger
        if (false) {
            return; // exit the function
        }

        // This part will run when Meteor.isClient == false
        method.apply(this, args);
    };
}