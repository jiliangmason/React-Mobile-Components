import React, { useEffect } from 'react';
import classnames from 'classnames';
import BScroll from '@better-scroll/core';
import { BaseWheelProps } from './PropsType';
import { isArray } from '../../utils/validate';

const getValue = (props: BaseWheelProps, defaultValue?: any) => {
    if ('value' in props) {
        return props.value;
    }
    if ('defaultValue' in props) {
        return props.defaultValue;
    }
    if (isArray(props.dataSource) && props.dataSource[0]) {
        return props.dataSource[0][props.valueMember!]
    }

    return defaultValue;
};

export interface WheelProps extends BaseWheelProps {
    prefixCls?: string;
    className?: string;
}

const Wheel: React.FC<WheelProps> = (props) => {
    const { prefixCls, dataSource, disabled, onTransition, valueMember } = props;

    const getSelectedIndex = (value: WheelProps['value'], dataSource: WheelProps['dataSource']) => {
        const { valueMember } = props;
        let index;
        dataSource.some((item, i) => {
            if (item[valueMember!] === value) {
                index = i;
                return true;
            }
            return false;
        });

        return index;
    };

    const fireValueChange = (value: WheelProps['value']) => {
        const currentValue = getValue(props);
        if (value === currentValue) {
            return;
        }

        const { onChange } = props;
        if (typeof onChange === 'function') {
            onChange(value);         
            
        }
    };

    useEffect(() => {
        const { prefixCls, dataSource, disabled, onTransition, valueMember } = props;
        const value = getValue(props);
    }, []);

    const rollerCls = classnames(prefixCls, classnames);

    return (
        <div
            className={rollerCls}
        >
            <div className={`${prefixCls}__content`}></div>
        </div>
    );
};

Wheel.defaultProps = {
    prefixCls: 'za-wheel',
    dataSource: [],
    valueMember: 'value',
    itemRender: (item) => item!.label,
};

export default Wheel;

