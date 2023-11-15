// These types directly correspond to the objects defined by YouTube itself
// Unfortunately a lot of them are defined badly
// We use plain "any" or "Function" when we don't have enough type information
// Or a way to distinguish it from the other types, in an array for example

interface Window {
    yt: {
        config_: {
            [key: string]: any
        }
    }
}
