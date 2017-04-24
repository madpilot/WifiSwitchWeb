import Button from './index.js'
import { Component } from 'preact';

describe("\<Button>", () => {
  describe("#render", () => {
    let disabled;
    let className;
    let context;

    beforeEach(() => {
      disabled = undefined;
      className = undefined;
      context = undefined;
    })

    let button = (() => {
      return <Button className={className} disabled={disabled}>Test</Button>;
    });

    it("contains a button", () => {
      expect(button()).to.eql(<div class="container"><button class="button">Test</button></div>);
    })

    describe("disabled", () => {
      describe("set to false", () => {
        beforeEach(() => { disabled = false });

        it("doesn't render disabled", () => {
          expect(button()).to.eql(<div class="container"><button class="button">Test</button></div>);
        });
      });

      describe("set to true", () => {
        beforeEach(() => { disabled = true });

        it("renders disabled", () => {
          expect(button()).to.eql(<div class="container"><button class="button" disabled="disabled">Test</button></div>);
        });
      });

      describe("with context", () => {
        let valid;

        class Mock {
          getChildContext() {
            return {
              validation: {
                valid: () => { return this.props.valid }
              }
            }
          }

          render() {
            return <div>{this.props.children}</div>
          }
        }

        describe("where valid() is true", () => {
          beforeEach(() => { valid = true });

          it("doesn't render disabled", () => {
            expect(<Mock valid={valid}>{button()}</Mock>).to.eql(<div><div class="container"><button class="button">Test</button></div></div>);
          });
        });

        describe("where valid() is false", () => {
          beforeEach(() => { valid = false });

          it("renders disabled", () => {
            expect(<Mock valid={valid}>{button()}</Mock>).to.eql(<div><div class="container"><button class="button" disabled="disabled">Test</button></div></div>);
          });
        });
      });
    });

    describe("supplied className", () => {
      beforeEach(() => { className = 'supplied' });

      it("adds the classname", () => {
        expect(button()).to.eql(<div class="container supplied"><button class="button">Test</button></div>);
      });
    })
  });
});
