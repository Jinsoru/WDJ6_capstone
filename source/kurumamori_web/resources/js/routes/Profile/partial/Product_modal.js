import React, {useState} from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";

export default ({ 
    // history,
    product, 
    setProduct_key_input,
    error_text,
    onSubmit,
}) => {
    const { handleSubmit, register, errors, watch } = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal fade show" id="productModal" tabIndex="-1" role="dialog" aria-labelledby="productModal" style={{backgroundColor: "#000000cc"}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="productModal">제품 등록</h5>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="text-center">'-'를 포함해서 입력해주세요.</p>
                            <p className="text-center">ex) A1B2-C3D4-E5F6-G7H8</p>
                            {/* {{-- 입력 폼 --}} */}
                            {/* <div className="form-group {{ $errors->has('product_key') ? 'has-error' : '' }}">
                                <input id="product_key" type="text" name="product_key" className="form-control"
                                    placeholder="제품 키 입력" value="{{ old('product_key') }}" />
                                {!! $errors->first('product_key', '<span className="form-error">:message</span>') !!}
                            </div> */}
                                <input 
                                    id="product_key"
                                    name="product_key"
                                    style={{width:"100%"}}
                                    onChange={ e => {
                                        const {
                                            target : {value}
                                        } = e;
                                        setProduct_key_input(value);
                                    }}
                                    ref={register({
                                        required: "Required",
                                        pattern: {
                                            value: /^[0-9A-Za-z]{4}-[0-9A-Za-z]{4}-[0-9A-Za-z]{4}-[0-9A-Za-z]{4}/,
                                            message: "올바른 키 입력이 아닙니다."
                                        }
                                    })}
                                />
                            <div className="text-danger">
                                <p>{errors.product_key && errors.product_key.message}</p>
                                <p>{error_text ? error_text : null}</p>
                            </div>

                            {product ? (
                                <p className="text-danger">이전에 등록한 key는 다시 사용할 수 있습니다.</p>
                            ) : null}
                            <p className="text-danger" id="ex_text"></p>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">닫기</button>
                                {product ? (
                                    <button type="submit" className="btn btn-primary btn__update__product">재등록</button>
                                ) : (
                                    <button type="submit" className="btn btn-primary btn__post__product">등록</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}