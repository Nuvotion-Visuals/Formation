export const isTouchCapable = () => typeof document !== 'undefined' ? 'ontouchstart' in document?.documentElement : false
