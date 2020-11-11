import { ChangeEvent } from 'react';
import { CheckboxGroupProps } from './CheckboxGroup';

export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';
export type CheckboxType = 'button' | 'cell';
export type CheckboxShape = 'rect' | 'radius' | 'round';
export type CheckboxValue = number | string;
export type CheckboxSize = ButtonSize;


export interface BaseCheckboxProps {
    type?: CheckboxType;
    shape?: CheckboxShape;
    disabled?: boolean;
    value?: CheckboxValue;
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    id?: string;
    onChange?: (event?: ChangeEvent<HTMLInputElement>) => void;
};

export interface BaseCheckboxGroupProps {
    type?: CheckboxType;
    size?: CheckboxSize;
    shape?: CheckboxShape;
    disabled?: boolean;
    block?: boolean;
    compact?: boolean;
    ghost?: boolean;
    value?: CheckboxValue[];
    defaultValue?: CheckboxValue[];
    onChange?: (value: CheckboxValue[]) => void;
};

export {
    CheckboxGroupProps
};


