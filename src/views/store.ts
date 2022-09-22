import {ref} from "@vue/runtime-core";
import {onBeforeUnmount} from "vue";

const personCustomProperties = {
    age: ref<string>('32')
}

@mixins(personCustomProperties)
class Person {
    name = ref<string>('serendipity')

    @serverMethod
    click(): void {
        alert(`目前姓名为:${this.name}`)
    }
}

export class PersonStore {
    static person: Person | undefined | null

    static InitDeferDestroy = () => {
        this.person ||= new Person()
        onBeforeUnmount(() => {
            this.person = null
        })
        return this.person
    }
}

export function serverMethod(target: any, name: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args) {
        if (personCustomProperties.age.value === '44') {
            alert(`当前用户年龄为${personCustomProperties.age.value},修饰方法被阻止接下来的运行`)
            return;
        }
        method.apply(this, args);
    };
}

export function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list)
    }
}