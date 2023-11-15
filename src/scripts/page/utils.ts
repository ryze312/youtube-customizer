export function getInner(obj: Object): any {
    return Object.values(obj)[0];
}

export function getInnerName(obj: Object): string | undefined {
    return Object.keys(obj)[0];
}
