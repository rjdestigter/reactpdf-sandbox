declare module "@react-pdf/core" {
  export const Link: any;
  export const Text: any;
  export const View: any;
  export const StyleSheet: any;
  export const Document: any;
  export const Font: any;
  export const Page: any;
  export const Image: any;
}

declare module '@react-pdf/node' {
  const _default: {
    render: (component: JSX.Element, location: string) => void
  }
  export default _default
}

declare module 'Value' {
  const v: Function
  export default v
}