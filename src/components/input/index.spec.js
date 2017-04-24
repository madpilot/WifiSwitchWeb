import Input from './index.js';

describe("<Input>", () => {
  describe("#render", () => {
    let value, label, className, onInvalid, onInput, validators, props;

    beforeEach(() =>{
      value = undefined;
      label = undefined;
      className = undefined;
      onInvalid = undefined;
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


  });
});
