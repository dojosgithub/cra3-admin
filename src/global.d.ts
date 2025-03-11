// global.d.ts
declare module 'mdast' {
    // Add basic types for mdast
    export interface Node {
      type: string;
      [key: string]: any;
    }
  }
  
  declare module 'parse-json' {
    // Add basic types for parse-json
    export default function parseJson(input: string): any;
  }
  
  declare module 'parse5' {
    // Add basic types for parse5
    export function parse(html: string): any;
  }
  
  declare module 'scheduler' {
    // Add basic types for scheduler
    export function unstable_scheduleCallback(callback: () => void): void;
  }