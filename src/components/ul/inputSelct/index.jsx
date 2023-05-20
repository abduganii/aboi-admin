import React from 'react';
import { Select, Space } from 'antd';



const SelectInput = ({ categories = [], onChange, id }) => {

    const newErray = []


    categories?.forEach(e => {
        newErray.push({ value: e._id, label: e.name });
    })

    return (
        <>
            <Space wrap>
                <Select

                    defaultValue="Выберите категории"
                    style={{ width: 238 }}

                    onChange={(id) => {

                        onChange(id)

                    }}

                    {...{ [id && 'value']: id }}

                    options={newErray}
                />


            </Space>
        </>
    )
};

export default SelectInput;