import React, {useState} from 'react'

export const Modal = () => {

    const [foto, setFoto] = useState()

    function onChangeCustom(e) {
        const upload = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.onloadend = function() {
            console.log(fileReader.result)
            setFoto(fileReader.result)
        }
        fileReader.readAsDataURL(upload)
    }

    return (
        <div className="modal fade" id="modal-default">
            <div className="modal-dialog">
                <form action="">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Carregar Foto</h4>
                        </div>
                        <div className="modal-body">
                            <div class="form-group">
                                <label for="upload">File input</label>
                                <input type="file" id="upload" onChange={onChangeCustom} />
                                <p class="help-block">Escolha uma foto de perfil para o aluno.</p>
                                {foto && <img alt='...' src={foto} id='foto' className='img-thumbnail center-block' />}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal

