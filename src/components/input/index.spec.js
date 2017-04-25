import Input from './index.js';
import { Component } from 'preact';

describe("<Input>", () => {
  describe("#render", () => {
    let value, label, className, onInvalid, onInput, validators, props, initial;

    beforeEach(() =>{
      value = undefined;
      label = undefined;
      className = undefined;
      initial = undefined;
      onInput = undefined;
      validators = undefined;
      props = {};
    });

    let renderEl = (() => {
      return renderHTML(
        <Input 
          label={label} 
          value={value} 
          className={className}
          onInvalid={onInvalid}
          onInput={onInput}
          validators={validators}
          {...props} 
          />
      );
    });

    describe("initial value", () => {
      let obj = (() => { return new Input({ initial: initial }) });
      
      describe("not set", () => {
        it("initial is set to empty string", () => {
          expect(obj().state.initial).to.eq("")
        });
      });

      describe("set", () => {
        beforeEach(() => { initial = "foo" });

        it("initial is set to the prop value", () => {
          expect(obj().state.initial).to.eq("foo")
        });
      });
    });

    describe("changed", () => {
      let obj = (() => { return new Input({ value: value, initial: initial }) });
      
      describe("value same as initial", () => {
        beforeEach(() => { initial = "foo"; value = "foo"; });
        it("changed is false", () => {
          expect(obj().state.changed).to.eq(false)
        });
      });

      describe("value different to initial", () => {
        beforeEach(() => { initial = "foo"; value = "bar"; });

        it("changed is true", () => {
          expect(obj().state.changed).to.eq(true)
        });
      });
    });

    describe("context", () => {
      let register = null;
      let unregister = null;
      let delegate = null;

      class Mock extends Component {
        constructor(props) {
          super(props);
          this.state = {
            show: false
          }
          this.props.delegate(this);
        }

        getChildContext() {
          return {
            validation: {
              register: this.props.register,
              unregister: this.props.unregister
            }
          }
        }
       
        toggle(cb) {
          this.setState({ show: !this.state.show }, cb);
        }

        render() {
          if(this.state.show) {
            return <div>{this.props.children}</div>
          } else {
            return null;
          }
        }
      }

      beforeEach(() => { 
        delegate = null;
        register = sinon.spy();
        unregister = sinon.spy();  
      
        let df = function(d) {
          delegate = d;
        }        
        renderHTML(<Mock delegate={df} register={register} unregister={unregister}><Input /></Mock>);
      });
        
      describe("mounting", () => {
        it("registers itself as a validator", () => {
          delegate.toggle(() => {
            delegate.toggle(() => {
              expect(register).to.have.been.calledOnce;
            });
          });
        });
      });

      describe("unmounting", () => {
        it("unregisters itself as a validator", () => {
          delegate.toggle(() => {
            delegate.toggle(() => {
              expect(unregister).to.have.been.calledOnce;
            });
          });
        });
      });
    });

    describe("div", () => {
      describe("className", () => {
        describe("default", () => {
          it("className is container", () => {
            expect(renderEl().querySelector("div").className).to.eq("container");
          });
        });

        describe("supplied", () => {
          beforeEach(() => { className = "supplied" });
          
          it("className is appended", () => {
            expect(renderEl().querySelector("div").className.split(" ")).to.include("supplied");
          });

          it("container is still in the className", () => {
            expect(renderEl().querySelector("div").className.split(" ")).to.include("container");
          });
        });
      });
    });

    describe("label", () => {
      describe("is set", () => {
        beforeEach(() => { label = "Test" });

        it("is rendered", () => {
          expect(renderEl().querySelector("label")).to.not.eq(null);
        });

        it("for is equal to id", () => {
          expect(renderEl().querySelector("label").getAttribute('for')).to.eq(renderEl().querySelector("input").getAttribute('id'));
        });

        it("className is label", () => {
          expect(renderEl().querySelector("label").className).to.eq("label");
        });
      });

      describe("is not set", () => {
        it("is not rendered", () => {
          expect(renderEl().querySelector("label")).to.eq(null);
        });
      });
    });

    describe("validations", () => {
      let valid, error, validators;
      let input = null;

      let inputObj = (() => {
        if(input == null) {
          input = new Input({ label: label, validators: validators });
          input.setState({ valid: valid, error: error });
        }
        return input;
      });
      
      let el = (() => {
        return renderHTML(inputObj().render());
      });
      
      beforeEach(() => { 
        input = null, 
        validators = [], 
        valid = true, 
        error = "" 
      });

      describe("validator", () => {
        describe("with supplied validators", () => {
          beforeEach(() => { validators = [ sinon.spy() ] });

          it("is initialized with validators", () => {
            expect(inputObj().validator.validators).to.eq(validators);
          });
        });

        describe("with out supplied validators", () => {
          it("is initialized with an empty array", () => {
            // Bad test. It's very touchy feely
            expect(inputObj().validator.validators.length).to.eq(0);
          });
        });
      });

      describe("error", () => {
        describe("label is set", () => {
          beforeEach(() => { label = "test" });

          describe("valid is true", () => {
            beforeEach(() => { valid = true; });

            it("is not rendered", () => {
              expect(el().querySelector("span.error")).to.eq(null);
            });
          });

          describe("valid is false", () => {
            beforeEach(() => { valid = false; error = "Message" });

            it("is rendered", () => {
              expect(el().querySelector("span.error")).to.not.eq(null);
            });

            it("renders the message", () => {
              expect(el().querySelector("span.error").textContent).to.eq("Message");
            });
          });
        });

        describe("label is not set", () => {
          it("is not rendered", () => {
            expect(el().querySelector("span.error")).to.eq(null);
          });
        });
      });

      describe("valid()", () => {
        describe("state.value is true", () => {
          beforeEach(() => { valid = true; });
          it("return true", () => {
            expect(inputObj().valid()).to.eq(true);
          });
        });

        describe("state.value is false", () => {
          beforeEach(() => { valid = false; });
          it("return true", () => {
            expect(inputObj().valid()).to.eq(false);
          });
        });
      });
    });

    describe("update()", () => {
      let input = null, validateSpy = null;

      let inputObj = (() => {
        if(input == null) {
          input = new Input({ onInput: onInput });
          validateSpy = sinon.spy(input, 'validate');
        }
        return input;
      });
      afterEach(() => { if(validateSpy) validateSpy.restore() });
      
      let el = (() => {
        return renderHTML(inputObj().render());
      });
      
      beforeEach(() => { 
        input = null
      });
      
      beforeEach(() => { onInput = sinon.spy(); });

      describe("onInput event fired", () => {
        let evt;

        beforeEach(() => {
          inputObj().setState({ changed: false, value: '' });
          
          evt = document.createEvent("HTMLEvents");
          evt.initEvent("input", false, true);
          
          el().querySelector('input').value = 'abc';
          el().querySelector("input").dispatchEvent(evt);
        });

        it("should set changed state to true", () => {
          expect(inputObj().state.changed).to.eq(true)
        });

        it("should set value state to the value", () => {
          expect(inputObj().state.value).to.eq('abc')
        });

        describe("onInput", () => {
          it("triggers the supplied onInput function", () => {
            expect(onInput).to.have.been.calledOnce;
          });

          it("passes through the event object to the onInput function", () => {
            expect(onInput).to.have.been.calledWith(evt);
          });
        });
        
        it("should run the validator", () => {
          expect(validateSpy).to.have.been.calledOnce; 
        });
      });
    });

    describe("validate()", () => {
      let _obj;

      beforeEach(() => { _obj = null });

      let object = (() => {
        if(_obj == null) {
          _obj = new Input({});
        }
        return _obj;
      });

      it("calls the validation object validate method", () => {
        let spy = sinon.spy(object().validator, 'validate');
        object().validate();
        expect(spy).to.have.been.calledWith(object().state);
      });
    });
  });
});
