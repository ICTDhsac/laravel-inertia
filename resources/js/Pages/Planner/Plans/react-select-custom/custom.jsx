import { forwardRef } from 'react';

// Custom Option Component
export const customOption = forwardRef(({ isFocused, label, innerProps }, ref) => {
    return (
        <h1
            style={{
                backgroundColor: isFocused ? "#e2e8f0" : "inherit",
                padding: "5px",
                fontSize: "13px",
            }}
            {...innerProps}
            ref={ref}
        >
            {label}
        </h1>
    );
});

// Custom Styles Object
export const customStyle = {
    placeholder: (provided) => ({
        ...provided,
        color: 'gray',
        fontSize: '14px',
        opacity: 0.8,
    }),
    control: (base, state) => ({
        ...base,
        maxHeight: '120px',
        overflowY: 'auto',
        borderColor: state.isFocused ? '#2684FF' : base.borderColor,
    }),
    menu: (base) => ({
        ...base,
        maxHeight: '200px',
        overflowY: 'auto',
    }),
    multiValueContainer: (base) => ({
        ...base,
        maxWidth: '100%',
    }),
};
