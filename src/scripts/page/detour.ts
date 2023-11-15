export function detourFunc(func: Function, origFunc: Function): Function {
    return function (this: any, ...args: any[]) {
        args.push(origFunc);
        return func.apply(this, args);
    }
}
