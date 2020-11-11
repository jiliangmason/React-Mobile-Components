import React, { cloneElement, ReactNode, isValidElement, HTMLAttributes, useState, useEffect } from 'react';
import classnames from 'classnames';
import { BaseCheckboxGroupProps, CheckboxValue } from './PropsType';
import './style/index.scss';

export interface CheckboxGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange'>, BaseCheckboxGroupProps {
    prefixCls?: string;
};

const getChildChecked = (children: ReactNode) => {
    const checkedValues: Array<number | string> = [];

    React.Children.map(children, (element: ReactNode) => {
        if (React.isValidElement(element) && element.props && element.props.checked) {
            checkedValues.push(element.props.value);
        }
    });

    return checkedValues;
};

const getValue = (props: CheckboxGroupProps, defaultValue: BaseCheckboxGroupProps['defaultValue'] = []) => {
    if (typeof props.value !== 'undefined') {
        return props.value;
    }
    if (typeof props.defaultValue !== 'undefined') {
        return props.defaultValue;
    }
    if (getChildChecked(props.children).length > 0) {
        return getChildChecked(props.children);
    }

    return defaultValue;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = props => {
    const { 
        prefixCls, 
        className, 
        size,
        shape, 
        type, 
        block, 
        disabled,
        compact,
        ghost,
        children, 
        onChange, 
        defaultValue, 
        value, 
        ...rest
    } = props;
    const [state, setState] = useState<CheckboxValue[]>(() => getValue(props, []));

    const onChildChange = (val: string | number) => {
        const { onChange } = props;
        const values = state.slice();
        const index = values.indexOf(val);

        if (index < 0) { // 没有在选中数组中证明当前checked=false, onchange时边true
            values.push(val);
        }
        else {
            values.splice(index, 1); // 已经存在的就删除它
        }

        setState(values);
        typeof onChange === 'function' && onChange(values); // props.onChange为改变整个group
    };

    const items = React.Children.map(children, (element: ReactNode, index) => {
        if (isValidElement(element)) {
            return cloneElement(element, {
                key: index,
                type,
                shape,
                disabled: disabled || element.props.disabled,
                checked: state.indexOf(element.props.value) > -1,
                onChange: (checked: boolean) => {
                    typeof element.props.onChange === 'function' && element.props.onChange(checked); // element.props.onChage为改变一个
                    onChildChange(element.props.value);
                }   
            })
        }

        return null;
    });

    useEffect(() => {
        if ('value' in props) {
            setState(getValue(props, []));
        }
    }, [props?.value]);

    const cls = classnames(prefixCls, className, {
        [`${prefixCls}--${type}`]: !!type,
        [`${prefixCls}--${size}`]: !!size,
        [`${prefixCls}--${shape}`]: !!shape,
        [`${prefixCls}--block`]: block,
        [`${prefixCls}--disabled`]: disabled,
        [`${prefixCls}--compact`]: compact,
        [`${prefixCls}--ghost`]: ghost,
      });

    return (
        <div className={cls} {...rest}><div className={`${prefixCls}__inner`}>{items}</div></div>
    );
};

CheckboxGroup.defaultProps = {
    prefixCls: 'zyx-checkbox-group',
    shape: 'radius',
    block: false,
    disabled: false,
    compact: false,
    ghost: false,
    size: 'xs',
    defaultValue: [],
};

export default CheckboxGroup;