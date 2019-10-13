import React, { useEffect, useRef } from 'react'
import Label from './Label'
//import AsyncSelect from 'react-select/lib/Async'
import If from '../../common/operator/If'
import $ from 'jquery'

//import './LabelAndSelectBuscaIcon.css'

export default (props) => {

    const [firstName, secondName] = props.names
    const id = eval(`props.${firstName}`)
    const text = eval(`props.${secondName}`)


    function handleChange(input) {
        id.input.onChange(input.id)
        text.input.onChange(input.text)
        { props.selected && props.selected(input) }
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
            //console.log(data)
            handleChange(data)
        });
        // $(selectEl.current).on("change", function (e) { console.log("change" + e.target); })
    })

    return (
        <Label cols={props.cols} name={props.name} label={props.label}>
            <div className="input-group">
                <If test={props.icon} >
                    <span className="input-group-addon">
                        <i className={`fa fa-${props.icon}`}></i>
                    </span>
                </If>

                <input type='hidden' {...id.input} />
                <input type='hidden' {...text.input} />

                <select ref={selectEl} className="form-control" style={{ width: '100%' }}>
                </select>
            </div>
        </Label>

    )
}













// import React from 'react'
// import Label from './Label'
// import AsyncSelect from 'react-select/lib/Async'
// import If from '../../common/operator/If'
// import Grid from '../layout/Grid';

// //import './LabelAndSelectBuscaIcon.css'

// export default (props) => {

//     const [firstName, secondName] = props.names
//     const value = eval(`props.${firstName}`)
//     const label = eval(`props.${secondName}`)

//     function handleChangeEndereco(input) {
//         value.input.onChange(input.value)
//         label.input.onChange(input.label)
//     }

//     return (
//         <Label cols={props.cols} name={props.name} label={props.label}>
//             <div className="input-group">
//                 <If test={props.icon} >
//                     <span className="input-group-addon">
//                         <i className={`fa fa-${props.icon}`}></i>
//                     </span>
//                 </If>

//                 <input type='hidden' {...value.input} />
//                 <input type='hidden' {...label.input} />

//                 <AsyncSelect
//                     defaultInputValue={label.meta.initial}
//                     // defaultValue={{ label: 'Default Option', value: 'default-value' }}
//                     cacheOptions
//                     loadOptions={props.loadOptions}
//                     onChange={handleChangeEndereco}
//                     isClearable={true}
//                     isDisabled={props.readOnly}
//                     defaultOptions
//                 />
//             </div>
//         </Label>

//     )
// }
