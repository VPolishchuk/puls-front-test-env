import React from "react";
import classes from './Form.module.css'
import CarouselForForm from "../../UI/Carousel/CarouselForForm/CarouselForForm";
import Input from '../../UI/Input/Input';
import Button from "../../UI/Button/Button";
import InputFile from "../../UI/InputFile/InputFile";
import axios from 'axios'
import FormDrawer from "../../components/FormDrawer/FormDrawer";
import Loader from '../Loader/index'

function validateEmail(email) {
    let re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Form extends React.Component {

    state = {
        formControls: {
            name: {
                value: '',
                controlFocus: false,
                type: 'text',
                label: 'Name',
                touched: false,
                touchedLabel: false,
                valid: false,
                validation: {
                    required: true,
                    maxLength: 32
                }
            },
            email: {
                value: '',
                controlFocus: false,
                type: 'email',
                label: 'Email',
                touched: false,
                touchedLabel: false,
                valid: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            phone: {
                value: '',
                controlFocus: false,
                type: 'phone',
                label: 'Phone',
                touched: false,
                touchedLabel: false,
                valid: false,
                validation: {
                    required: true,
                    phone: true,
                    maxLength: 25
                }
            },
            country: {
                value: '',
                controlFocus: false,
                touchedLabel: false,
                type: 'text',
                label: 'Country',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    maxLength: 32
                }
            },
            message: {
                value: '',
                controlFocus: false,
                touchedLabel: false,
                type: 'textarea',
                label: 'Message',
                touched: false,
                valid: false,
                validation: {
                    required: true
                }
            }
        },
        inputFile: null,
        isFormValid: false,
        isFormDrawer: false,
        isLoading: false
    };

    formReset = () => {
        let {formControls} = this.state;
        Object.keys(formControls).map(controlName => {
            let control = this.state.formControls[controlName];
            control.value = '';
            return control.controlFocus = false
        });
        this.setState({
            formControls,
            inputFile: null,
            isFormValid: false
        });
        return this.consultationForm.reset();
    };

    sendEmail = () => {
        let fileContent;
        if (this.state.inputFile !== null) {
            fileContent = this.state.inputFileContent.result.split(';base64,')[1];
        }
        this.setState({
            isLoading: true
        })
        axios({
            method: "POST",
            url:"http://puls-software.com/send",
            data: {
                name: this.state.formControls.name.value,
                email: this.state.formControls.email.value,
                phone: this.state.formControls.phone.value,
                country: this.state.formControls.country.value,
                message: this.state.formControls.message.value,
                fileName: this.state.inputFile ? this.state.inputFile.name : '',
                fileContent: fileContent
            }
        }).then((response)=>{
            if (response.data.msg === 'success'){
                this.setState({
                    isFormDrawer: true,
                    isLoading: false
                });
                this.formReset()
                setTimeout(()=> {
                    this.setState({
                        isFormDrawer: false
                    })
                }, 10000)
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    };

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.maxLength) {
            isValid = value.length <= validation.maxLength && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        return isValid
    }

    handleFocus = (controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.touchedLabel = true;

        if (control.value === '' && control.touchedLabel) {
            control.controlFocus = !control.controlFocus
        } else if (control.value !== '' && control.touchedLabel) {
            control.controlFocus = true
        }

        formControls[controlName] = control;

        this.setState({formControls})
    };

    handleChange = (e, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.touched = true;
        if (control.validation.phone) {
            control.value = e.target.value.replace(/[^0-9+()-]+/g, '');
        } else if (control.validation.email){
            control.value = e.target.value.replace(/([^a-z_0-9.@-])+/g, '')
        } else {
            control.value = e.target.value
        }
        
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls,
            isFormValid
        });
    };

    handleInputFileChange = (e) => {
        const reader = new FileReader();
        const inputFile = e.target.files[0];
        
        if (e.target.files[0]) {
            reader.readAsDataURL(inputFile);

            const documentFormats = [
                'pdf',
                'doc',
                'docx',
                'ppt',
                'pptx',
                'rtf'
            ];

            const inputFileFormat = inputFile.name.split('.')[1];
            
            let isTrueFormat = false;

            documentFormats.map((format, index) => {
                if (inputFileFormat === format ) {
                    isTrueFormat = true;
                    this.setState({
                        inputFile: inputFile,
                        inputFileContent: reader
                    })
                } else if (isTrueFormat === false && documentFormats.length-1 === index){
                    alert('Wrong file format, please use one of allowed.')
                }

                return inputFileFormat;
            });
        }
    };

    handleDeclineFile = (id) => {
        document.getElementById(id.toString()).value = "";
        this.setState({
            inputFile: null
        })
    };

    handleSubmitForm = (e) => {
        e.preventDefault();
        this.sendEmail()
        this.setState({
            isFormValid: false
        })
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {

            const control = this.state.formControls[controlName];

            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    label={control.label}
                    touched={control.touched}
                    controlFocus={control.controlFocus}
                    valid={control.valid}
                    validation={control.validation || ''}
                    shouldValidate={!!control.validation}
                    onFocus={() => this.handleFocus(controlName)}
                    onChange={e => this.handleChange(e, controlName)}
                />
            )
        })
    };

    submitFormDrawer = () => {
        this.setState({
            isFormDrawer: false
        })
        if (this.props.closePopup) {
            return this.props.closePopup()
        }
    };

    render() {
        return (
            <div className={classes.Form}>
            
                <div style={{position: 'relative'}}>
                    {
                        this.state.isFormDrawer
                        ? <FormDrawer
                                submitFormDrawer={this.submitFormDrawer}
                            />
                        : null
                    }
                    <CarouselForForm/>
                    <h1>Let`s discuss <strong>your</strong> ideas</h1>
                    <div
                        className={classes.formContent}
                    >
                    {
                        this.state.isLoading ? <Loader/> : null
                    }
                        <form ref={el => this.consultationForm = el}>
                            <div className={classes.inputFields}>
                                {this.renderInputs()}
                            </div>
                            <InputFile
                                onChange={this.handleInputFileChange}
                                fileName={this.state.inputFile ? this.state.inputFile.name : null}
                                onDeclineFile={this.handleDeclineFile}
                            />
                            <div className={classes.submitButton}>
                                <Button
                                    buttonStyle='light'
                                    onClick={(e) => this.handleSubmitForm(e)}
                                    disabled={!this.state.isFormValid}
                                >Send</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}