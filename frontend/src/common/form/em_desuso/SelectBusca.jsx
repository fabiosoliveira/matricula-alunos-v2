import React, { useRef, useEffect } from 'react';
import $ from 'jquery'


export default (props) => {

    const [firstName, secondName] = props.names
    const id = eval(`props.${firstName}`)
    const text = eval(`props.${secondName}`)

    function handleChange(input) {
        id.input.onChange(input.id)
        text.input.onChange(input.text)
        props.selected(input)
    }

    const selectEl = useRef(null)
    
    useEffect(() => {
        const newOption = new Option(text.meta.initial, id.meta.initial, false, false);
        $(selectEl.current).append(newOption).trigger('change');

        $(selectEl.current).select2(props.loadOptions)
        // $(selectEl.current).select2({
        //     data: value,
        //     matcher: calback
        // })
        $(selectEl.current).on('select2:select', function (e) {
            const data = e.params.data;
            console.log(data)
            handleChange(data)
        });
        // $(selectEl.current).on("change", function (e) { console.log("change" + e.target); })
    })

    return (
        <div className="form-group">

            <input type='hidden' {...id.input} />
            <input type='hidden' {...text.input} />

            <select ref={selectEl} className="form-control" style={{ width: '100%' }}>
                {/* <option selected="selected">Alabama</option>
                <option>Alaska</option>
                <option>California</option>
                <option>Delaware</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Washington</option> */}
            </select>
        </div>
    )
}