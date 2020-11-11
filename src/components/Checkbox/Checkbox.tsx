import React, { ChangeEvent, InputHTMLAttributes, HTMLAttributes, ButtonHTMLAttributes, useState, useEffect } from 'react';
import classnames from 'classnames';
import { BaseCheckboxProps, CheckboxGroupProps } from './PropsType';
import CheckboxGroup from './CheckboxGroup';
import './style/index.scss';

type CheckboxSpanProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'>;
type CheckboxCellProps = Omit<HTMLAttributes<HTMLDivElement>, 'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'>;
type CheckboxButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'>;

export type CheckboxProps = Partial<CheckboxSpanProps & CheckboxCellProps & CheckboxButtonProps> & BaseCheckboxProps & {
  prefixCls?: string;
};

const getChecked = (props: CheckboxProps, defaultChecked: boolean) => {
    if (typeof props.checked !== 'undefined') {
        return props.checked;
    }
    if (typeof props.defaultChecked !== 'undefined') {
        return props.defaultChecked;
    }
    return defaultChecked;
};

const Checkbox: React.FC<CheckboxProps> & {Group: React.FC<CheckboxGroupProps>} = (props) => {
    const { 
        prefixCls, className, 
        type, shape, value, checked, defaultChecked,
        disabled, id, indeterminate, children, onChange,
        ...rest
    } = props;
    const [checkedState, setCheckedState] = useState<boolean>(() => getChecked(props, false));
    
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (disabled) {
            return;
        }
        const newChecked = !checkedState;
        if (!('checked' in props)) {
            setCheckedState(newChecked);
        }

        typeof onChange === 'function' && onChange(e)
    };

    useEffect(() => {
        if ('checked' in props && checkedState !== props.checked) {
            setCheckedState(props.checked!);
        }
    }, [props.checked]);

    const cls = classnames(prefixCls, className, {
        [`${prefixCls}--checked`]: checkedState,
        [`${prefixCls}--disabled`]: disabled,
        [`${prefixCls}--indeterminate`]: indeterminate,
        [`${prefixCls}--untext`]: !children,
    });

    const inputRender = (
        <input 
            id={id}
            type="checkbox"
            className={`${prefixCls}__input`}
            value={value}
            disabled={disabled}
            checked={checkedState}
            onChange={onValueChange}
        />
    );

    const checkboxRender = (
        <span className={cls} {...rest as CheckboxSpanProps}>
          <span className={`${prefixCls}__widget`}>
            <span className={`${prefixCls}__inner`} />
          </span>
          {children && <span className={`${prefixCls}__text`}>{children}</span>}
          {inputRender}
        </span>
    );
  

    return (
        <>{checkboxRender}</>
    );
};

Checkbox.Group = (props: CheckboxGroupProps) => {
    return <>
        <CheckboxGroup {...props} />
    </>
};
Checkbox.displayName = 'Checkbox';
Checkbox.defaultProps = {
    prefixCls: 'zyx-checkbox',
    disabled: false,
    indeterminate: false,
};

export default Checkbox;

