// In a global.d.ts file (create one if it doesn't exist)
import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            main: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}